import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateBrand41662799417928 implements MigrationInterface {
  name = 'updateBrand41662799417928';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f"`,
    );
    await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "brand" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f"`,
    );
    await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "brand" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id")`,
    );
  }
}
