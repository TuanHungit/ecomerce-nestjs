import { InjectRepository } from '@nestjs/typeorm';
import { FilesService } from 'src/files/files.service';
import { BaseService } from 'src/shared/services/base.service';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entity/review.entity';

export class ReviewService extends BaseService<Review, Repository<Review>> {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    private fileService: FilesService,
  ) {
    super(reviewRepository, 'review');
  }

  async create(data: CreateReviewDto) {
    // find images
    await Promise.all(
      data.files?.map((id) => {
        return this.fileService.findOne({ id });
      }),
    ).then((res) => {
      data.files = res;
    });
    return super.create(data);
  }

  async statisticsByRatingAndProduct(productId: number) {
    const reviews = await this.reviewRepository
      .createQueryBuilder('review')
      .select('COUNT(review.id)', 'totalReview')
      .addSelect('review.rating')
      .where({
        productId,
        // status: StatusEnum.active,
      })
      .groupBy('review.rating')
      .getRawMany();
    return reviews;
  }
}
