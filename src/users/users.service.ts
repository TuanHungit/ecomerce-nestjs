import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/shared/services/base.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService extends BaseService<User, Repository<User>> {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super(usersRepository);
  }

  // create(createProfileDto: CreateUserDto) {
  //   return this.usersRepository.save(
  //     this.usersRepository.create(createProfileDto),
  //   );
  // }

  // findManyWithPagination(
  //   paginationOptions: IPaginationOptions,
  //   selects?: (keyof User)[],
  //   wheres?: EntityCondition<User>,
  //   orders?: FindOptionsOrder<User>,
  //   likes?: (keyof User)[]
  // ) {
  //   if (likes) {
  //     likes.forEach((el: string) => {
  //       if (wheres[el]) {
  //         wheres[el] = Like(`%${wheres[el]}%`);
  //       }
  //     });
  //   }
  //   return this.usersRepository.find({
  //     skip: (paginationOptions.page - 1) * paginationOptions.limit,
  //     take: paginationOptions.limit,
  //     select: selects,
  //     where: wheres,
  //     order: orders,
  //     cache: true,
  //   });
  // }

  // findOne(fields: EntityCondition<User>) {
  //   return this.usersRepository.findOne({
  //     where: fields,
  //   });
  // }

  // update(id: number, updateProfileDto: UpdateUserDto) {
  //   return this.usersRepository.save(
  //     this.usersRepository.create({
  //       id,
  //       ...updateProfileDto,
  //     }),
  //   );
  // }

  async softDelete(id: number): Promise<void> {
    await this.usersRepository.softDelete(id);
  }
}
