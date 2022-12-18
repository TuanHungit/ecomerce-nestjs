import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
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
import { SearchingReviewDto } from './dto/searching-review.dto';
import { Review } from './entity/review.entity';
import { ReviewService } from './review.service';

@ApiTags('Review')
@Controller('reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(@Request() request, @Body() createReviewDto: CreateReviewDto) {
    createReviewDto.user = {
      ...pick(request.user, ['id', 'email', 'fullName', 'photo']),
    };
    return this.reviewService.create(createReviewDto);
  }

  @Post('searching')
  @HttpCode(HttpStatus.OK)
  searching(
    @Body() filters: SearchingReviewDto,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort', new DefaultValuePipe(1), ParseIntPipe) sort?: number,
    @Query('column', new DefaultValuePipe('id')) column?: string,
  ) {
    if (limit > 50) {
      limit = 50;
    }

    return this.reviewService.search(
      {
        page,
        limit,
      },
      { ...filters } as EntityCondition<Review>,
      { sort: column, order: sort },
    );
  }

  @Post('paging')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
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
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: number) {
    return this.reviewService.findOne({ id });
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: number) {
    return this.reviewService.changeStatus(id);
  }
}
