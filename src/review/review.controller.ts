import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';

@ApiTags('Review')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  create(@Request() request, @Body() createReviewDto: CreateReviewDto) {
    createReviewDto.userId = request.user.id;
    return this.reviewService.create(createReviewDto);
  }
}
