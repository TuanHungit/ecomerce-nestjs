/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseEntity,
  DeleteResult,
  Repository,
  FindOptionsOrder,
  FindOptionsWhere,
  Like,
  DeepPartial,
} from 'typeorm';
import { IBaseService } from '../interfaces/i.base.service';
import { EntityId } from 'typeorm/repository/EntityId';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { EntityCondition } from 'src/utils/types/entity-condition.type';

export class BaseService<T extends BaseEntity, R extends Repository<T>>
  implements IBaseService<T>
{
  protected readonly repository: R;

  constructor(repository: R) {
    this.repository = repository;
  }

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
    fields?: string,
    wheres?: FindOptionsWhere<T>,
    orders?: FindOptionsOrder<T>,
    likes?: (keyof T)[],
  ) {
    const selects: (keyof T)[] = [];
    if (fields) {
      fields.split(',').forEach((el) => {
        if (el as keyof T) {
          selects.push(el as keyof T);
        }
      });
    }
    if (likes) {
      likes.forEach((el: any) => {
        if (wheres[el]) {
          wheres[el] = Like(`%${wheres[el]}%`);
        }
      });
    }
    return infinityPagination(
      await this.repository.find({
        skip: (paginationOptions.page - 1) * paginationOptions.limit,
        take: paginationOptions.limit,
        select: selects,
        where: wheres,
        order: orders,
        cache: true,
      }),
      paginationOptions,
    );
  }

  findOne(fields: EntityCondition<T>): Promise<T> {
    return this.repository.findOne({
      where: fields,
    });
  }

  create(data: DeepPartial<T>): Promise<T> {
    return this.repository.save(this.repository.create(data));
  }

  async update(id: EntityId, data: any): Promise<T> {
    await this.repository.update(id, data);
    return this.repository.findOneById(id);
  }

  delete(id: EntityId): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  changeStatus(id: EntityId) {
    return id;
  }
}
