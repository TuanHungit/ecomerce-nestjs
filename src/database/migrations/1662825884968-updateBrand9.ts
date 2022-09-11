import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateBrand91662825884968 implements MigrationInterface {
  name = 'updateBrand91662825884968';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "brand_categories_categories" ("brandId" integer NOT NULL, "categoriesId" uuid NOT NULL, CONSTRAINT "PK_f3d29bb86ca80501b3903c7d30e" PRIMARY KEY ("brandId", "categoriesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3bed8e3488e456c5c537d6ff6d" ON "brand_categories_categories" ("brandId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_14c1f656f40daef462714b6d22" ON "brand_categories_categories" ("categoriesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "brand_categories_categories" ADD CONSTRAINT "FK_3bed8e3488e456c5c537d6ff6db" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand_categories_categories" ADD CONSTRAINT "FK_14c1f656f40daef462714b6d224" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "brand_categories_categories" DROP CONSTRAINT "FK_14c1f656f40daef462714b6d224"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand_categories_categories" DROP CONSTRAINT "FK_3bed8e3488e456c5c537d6ff6db"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_14c1f656f40daef462714b6d22"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3bed8e3488e456c5c537d6ff6d"`,
    );
    await queryRunner.query(`DROP TABLE "brand_categories_categories"`);
  }
}
