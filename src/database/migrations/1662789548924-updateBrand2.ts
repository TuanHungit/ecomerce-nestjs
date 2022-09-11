import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateBrand21662789548924 implements MigrationInterface {
  name = 'updateBrand21662789548924';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "brand" ALTER COLUMN "totalProduct" SET DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "brand" ALTER COLUMN "totalProduct" DROP DEFAULT`,
    );
  }
}
