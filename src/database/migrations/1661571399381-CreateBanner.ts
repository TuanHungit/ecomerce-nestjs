import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBanner1661571399381 implements MigrationInterface {
  name = 'CreateBanner1661571399381';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "banner" ADD "photoId" uuid`);
    await queryRunner.query(`ALTER TABLE "banner" ADD "statusId" integer`);
    await queryRunner.query(
      `ALTER TABLE "banner" ALTER COLUMN "link" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "banner" ADD CONSTRAINT "FK_069dddfdc9b2255d633a27e3b17" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "banner" ADD CONSTRAINT "FK_b8cbc3e8c3efd6dca51ab58ee40" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "banner" DROP CONSTRAINT "FK_b8cbc3e8c3efd6dca51ab58ee40"`,
    );
    await queryRunner.query(
      `ALTER TABLE "banner" DROP CONSTRAINT "FK_069dddfdc9b2255d633a27e3b17"`,
    );
    await queryRunner.query(
      `ALTER TABLE "banner" ALTER COLUMN "link" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "banner" DROP COLUMN "statusId"`);
    await queryRunner.query(`ALTER TABLE "banner" DROP COLUMN "photoId"`);
  }
}
