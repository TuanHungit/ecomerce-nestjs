import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateBrand51662820683182 implements MigrationInterface {
  name = 'updateBrand51662820683182';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "FK_062524ac7f03786e461134ea624"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "UQ_062524ac7f03786e461134ea624" UNIQUE ("imageId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "FK_062524ac7f03786e461134ea624" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "FK_062524ac7f03786e461134ea624"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "UQ_062524ac7f03786e461134ea624"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "FK_062524ac7f03786e461134ea624" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
