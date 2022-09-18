import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateBanner1663465285981 implements MigrationInterface {
  name = 'updateBanner1663465285981';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_207eadbaa38ce8cf46256425195"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "banner" DROP CONSTRAINT "FK_375a0a44fdb36a6b0246119c8db"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5198460192ebbd084ffbb5aebd"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_207eadbaa38ce8cf4625642519"`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories_banners" ("categoriesId_1" integer NOT NULL, "categoriesId_2" integer NOT NULL, CONSTRAINT "PK_0584f11a0df929415e1425bbcc6" PRIMARY KEY ("categoriesId_1", "categoriesId_2"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_537209e907fb1cb500cbd5adf6" ON "categories_banners" ("categoriesId_1") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_87fb1d26ce7f4c3076f827c3b1" ON "categories_banners" ("categoriesId_2") `,
    );
    await queryRunner.query(
      `ALTER TABLE "banner" DROP COLUMN "brandsCategoriesBrandId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "banner" DROP COLUMN "brandsCategoriesCategoriesId"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5198460192ebbd084ffbb5aebd" ON "brands_categories" ("brandId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_207eadbaa38ce8cf4625642519" ON "brands_categories" ("categoriesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" ADD CONSTRAINT "FK_537209e907fb1cb500cbd5adf67" FOREIGN KEY ("categoriesId_1") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" ADD CONSTRAINT "FK_87fb1d26ce7f4c3076f827c3b18" FOREIGN KEY ("categoriesId_2") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_207eadbaa38ce8cf46256425195" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_207eadbaa38ce8cf46256425195"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" DROP CONSTRAINT "FK_87fb1d26ce7f4c3076f827c3b18"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" DROP CONSTRAINT "FK_537209e907fb1cb500cbd5adf67"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_207eadbaa38ce8cf4625642519"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5198460192ebbd084ffbb5aebd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "banner" ADD "brandsCategoriesCategoriesId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "banner" ADD "brandsCategoriesBrandId" integer`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_87fb1d26ce7f4c3076f827c3b1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_537209e907fb1cb500cbd5adf6"`,
    );
    await queryRunner.query(`DROP TABLE "categories_banners"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_207eadbaa38ce8cf4625642519" ON "brands_categories" ("categoriesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5198460192ebbd084ffbb5aebd" ON "brands_categories" ("brandId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "banner" ADD CONSTRAINT "FK_375a0a44fdb36a6b0246119c8db" FOREIGN KEY ("brandsCategoriesBrandId", "brandsCategoriesCategoriesId") REFERENCES "brands_categories"("brandId","categoriesId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_207eadbaa38ce8cf46256425195" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
