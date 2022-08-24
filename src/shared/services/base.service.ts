/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseEntity, DeleteResult, Repository, FindOneOptions } from 'typeorm';
import { IBaseService } from '../interfaces/i.base.service';
import { EntityId } from 'typeorm/repository/EntityId';

export class BaseService<T extends BaseEntity, R extends Repository<T>>
  implements IBaseService<T>
{
  protected readonly repository: R;

  constructor(repository: R) {
    this.repository = repository;
  }

  getAll(): Promise<T[]> {
    return this.repository.find();
  }

  findByOptions(conditions: FindOneOptions<T>): Promise<T> {
    return this.repository.findOne(conditions);
  }

  store(data: any): Promise<T> {
    return this.repository.save(data);
  }

  async update(id: EntityId, data: any): Promise<T> {
    await this.repository.update(id, data);
    return this.repository.findOneById(id);
  }

  delete(id: EntityId): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
