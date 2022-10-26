import { Expose } from 'class-transformer';
import { FileEntity } from 'src/files/entities/file.entity';
import { Status } from 'src/statuses/entities/status.entity';

export class ProductResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  image: FileEntity;

  @Expose()
  images: FileEntity[];

  @Expose()
  likedCount?: number;

  @Expose()
  discount?: number;

  @Expose()
  stock?: number;

  @Expose()
  price?: number;

  @Expose()
  priceBeforeDiscount: number | null;

  @Expose()
  sold?: number | null;

  @Expose()
  status?: Status;

  @Expose()
  categories: CategoriesResponse;

  @Expose()
  brand: BrandResponse;

  @Expose()
  tierModel?: TierModelResponse;

  @Expose()
  keywords?: string[];

  @Expose()
  slug?: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  deletedAt: Date;
}

class CategoriesResponse {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  logo: FileEntity;
}

class BrandResponse {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  logo: FileEntity;

  @Expose()
  image: FileEntity;
}

class TierModelResponse {
  @Expose()
  tierModelName: string;

  @Expose()
  models: ModelResponse;
}

class ModelResponse {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  price?: number;

  @Expose()
  priceBeforeDiscount: number;

  @Expose()
  stock: number;

  @Expose()
  sold?: number;

  @Expose()
  image?: string;
}
