import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateBrand71662824946726 implements MigrationInterface {
  name = 'updateBrand71662824946726';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "brand" ALTER COLUMN "slug" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "brand" ALTER COLUMN "slug" SET NOT NULL`,
    );
  }
}
