import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/services/base.service';
import { Repository } from 'typeorm';
import { Address } from './entity/address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService extends BaseService<Address, Repository<Address>> {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {
    super(addressRepository, 'Address');
  }

  async createAddress(createAddressDto: CreateAddressDto): Promise<Address> {
    const { userId, isDefault } = createAddressDto;
    const existedAddress = await this.findDefaultAddress(userId);
    if (existedAddress && isDefault) {
      throw new BadRequestException('Không thể chọn 2 địa chỉ mặc định');
    }
    return await super.create(createAddressDto);
  }

  async updateAddress(
    id: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    const { userId, isDefault } = updateAddressDto;
    const existedAddress = await this.findDefaultAddress(userId);
    if (isDefault && existedAddress && id !== existedAddress.id) {
      throw new BadRequestException('Không thể chọn 2 địa chỉ mặc định');
    }
    return await super.update(id, updateAddressDto);
  }

  async getAllAddress(
    paginationOptions: IPaginationOptions,
    where: Record<string, unknown>,
  ) {
    return await super.findManyWithPagination(paginationOptions, null, where);
  }

  async findDefaultAddress(userId: number): Promise<Address> {
    return await this.addressRepository.findOne({
      where: {
        userId,
        isDefault: true,
      },
    });
  }
}
