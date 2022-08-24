/* eslint-disable @typescript-eslint/no-explicit-any */
import { EntityId } from 'typeorm/repository/EntityId';
import { DeleteResult, FindOneOptions } from 'typeorm';

export interface IBaseService<T> {
  getAll(): Promise<T[]>;

  findByOptions(id: FindOneOptions<T>): Promise<T>;

  store(data: any): Promise<T>;

  update(id: EntityId, data: any): Promise<T>;

  delete(id: EntityId): Promise<DeleteResult>;
}
