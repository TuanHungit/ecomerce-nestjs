import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateBrand11662789359195 implements MigrationInterface {
  name = 'updateBrand11662789359195';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "FK_c3992aae3742cdb91294e7ec7fc"`,
    );
    await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "statusId"`);
    await queryRunner.query(`ALTER TABLE "brand" ADD "statusId" integer`);
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "FK_c3992aae3742cdb91294e7ec7fc" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "FK_c3992aae3742cdb91294e7ec7fc"`,
    );
    await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "statusId"`);
    await queryRunner.query(`ALTER TABLE "brand" ADD "statusId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "FK_c3992aae3742cdb91294e7ec7fc" FOREIGN KEY ("statusId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
