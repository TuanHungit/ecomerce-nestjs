import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateBrand31662793074425 implements MigrationInterface {
  name = 'updateBrand31662793074425';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "FK_7558b84d1a659a2a853e09a91bc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "FK_062524ac7f03786e461134ea624"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "REL_7558b84d1a659a2a853e09a91b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "UQ_062524ac7f03786e461134ea624"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "FK_7558b84d1a659a2a853e09a91bc" FOREIGN KEY ("logoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "brand" DROP CONSTRAINT "FK_7558b84d1a659a2a853e09a91bc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "UQ_062524ac7f03786e461134ea624" UNIQUE ("imageId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "REL_7558b84d1a659a2a853e09a91b" UNIQUE ("logoId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "FK_062524ac7f03786e461134ea624" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "FK_7558b84d1a659a2a853e09a91bc" FOREIGN KEY ("logoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
