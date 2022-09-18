import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateBanner11663465460979 implements MigrationInterface {
  name = 'updateBanner11663465460979';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_207eadbaa38ce8cf46256425195"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" DROP CONSTRAINT "FK_537209e907fb1cb500cbd5adf67"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" DROP CONSTRAINT "FK_87fb1d26ce7f4c3076f827c3b18"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5198460192ebbd084ffbb5aebd"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_207eadbaa38ce8cf4625642519"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_537209e907fb1cb500cbd5adf6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_87fb1d26ce7f4c3076f827c3b1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" DROP CONSTRAINT "PK_0584f11a0df929415e1425bbcc6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" ADD CONSTRAINT "PK_87fb1d26ce7f4c3076f827c3b18" PRIMARY KEY ("categoriesId_2")`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" DROP COLUMN "categoriesId_1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" DROP CONSTRAINT "PK_87fb1d26ce7f4c3076f827c3b18"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" DROP COLUMN "categoriesId_2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" ADD "categoriesId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" ADD CONSTRAINT "PK_a1b6389225cc7d56b57bdb207d6" PRIMARY KEY ("categoriesId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" ADD "bannerId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" DROP CONSTRAINT "PK_a1b6389225cc7d56b57bdb207d6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" ADD CONSTRAINT "PK_c8537c6dc0a54f7a9628c9c86b7" PRIMARY KEY ("categoriesId", "bannerId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a1b6389225cc7d56b57bdb207d" ON "categories_banners" ("categoriesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e50ee303ec1070fd4bc4461d36" ON "categories_banners" ("bannerId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5198460192ebbd084ffbb5aebd" ON "brands_categories" ("brandId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_207eadbaa38ce8cf4625642519" ON "brands_categories" ("categoriesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" ADD CONSTRAINT "FK_a1b6389225cc7d56b57bdb207d6" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" ADD CONSTRAINT "FK_e50ee303ec1070fd4bc4461d362" FOREIGN KEY ("bannerId") REFERENCES "banner"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
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
      `ALTER TABLE "categories_banners" DROP CONSTRAINT "FK_e50ee303ec1070fd4bc4461d362"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" DROP CONSTRAINT "FK_a1b6389225cc7d56b57bdb207d6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_207eadbaa38ce8cf4625642519"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5198460192ebbd084ffbb5aebd"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e50ee303ec1070fd4bc4461d36"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a1b6389225cc7d56b57bdb207d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" DROP CONSTRAINT "PK_c8537c6dc0a54f7a9628c9c86b7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" ADD CONSTRAINT "PK_a1b6389225cc7d56b57bdb207d6" PRIMARY KEY ("categoriesId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" DROP COLUMN "bannerId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" DROP CONSTRAINT "PK_a1b6389225cc7d56b57bdb207d6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" DROP COLUMN "categoriesId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" ADD "categoriesId_2" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" ADD CONSTRAINT "PK_87fb1d26ce7f4c3076f827c3b18" PRIMARY KEY ("categoriesId_2")`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" ADD "categoriesId_1" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" DROP CONSTRAINT "PK_87fb1d26ce7f4c3076f827c3b18"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" ADD CONSTRAINT "PK_0584f11a0df929415e1425bbcc6" PRIMARY KEY ("categoriesId_1", "categoriesId_2")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_87fb1d26ce7f4c3076f827c3b1" ON "categories_banners" ("categoriesId_2") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_537209e907fb1cb500cbd5adf6" ON "categories_banners" ("categoriesId_1") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_207eadbaa38ce8cf4625642519" ON "brands_categories" ("categoriesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5198460192ebbd084ffbb5aebd" ON "brands_categories" ("brandId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" ADD CONSTRAINT "FK_87fb1d26ce7f4c3076f827c3b18" FOREIGN KEY ("categoriesId_2") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" ADD CONSTRAINT "FK_537209e907fb1cb500cbd5adf67" FOREIGN KEY ("categoriesId_1") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_207eadbaa38ce8cf46256425195" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
