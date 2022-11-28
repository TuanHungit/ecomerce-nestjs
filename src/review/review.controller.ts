import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { pick } from 'lodash';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { CreateReviewDto } from './dto/create-review.dto';
import { FilterReviewDto } from './dto/filter-review.dto';
import { Review } from './entity/review.entity';
import { ReviewService } from './review.service';

@ApiTags('Review')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  create(@Request() request, @Body() createReviewDto: CreateReviewDto) {
    createReviewDto.user = {
      ...pick(request.user, ['id', 'email', 'fullName', 'photo']),
    };
    return this.reviewService.create(createReviewDto);
  }

  @Post('paging')
  @HttpCode(HttpStatus.OK)
  paging(
    @Body() filters: FilterReviewDto,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort', new DefaultValuePipe(1), ParseIntPipe) sort?: number,
    @Query('column', new DefaultValuePipe('id')) column?: string,
  ) {
    if (limit > 50) {
      limit = 50;
    }

    return this.reviewService.paging(
      {
        page,
        limit,
      },
      { ...filters } as EntityCondition<Review>,
      { sort: column, order: sort },
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: number) {
    return this.reviewService.findOne({ id });
  }
}
