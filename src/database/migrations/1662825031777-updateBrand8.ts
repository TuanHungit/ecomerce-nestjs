import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateBrand81662825031777 implements MigrationInterface {
  name = 'updateBrand81662825031777';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories" ALTER COLUMN "slug" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories" ALTER COLUMN "slug" SET NOT NULL`,
    );
  }
}
