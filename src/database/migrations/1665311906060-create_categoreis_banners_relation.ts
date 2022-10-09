import { MigrationInterface, QueryRunner } from 'typeorm';

export class createCategoreisBannersRelation1665311906060
  implements MigrationInterface
{
  name = 'createCategoreisBannersRelation1665311906060';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_207eadbaa38ce8cf46256425195"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5198460192ebbd084ffbb5aebd"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_207eadbaa38ce8cf4625642519"`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories_banners" ("categoriesId" integer NOT NULL, "bannerId" integer NOT NULL, CONSTRAINT "PK_c8537c6dc0a54f7a9628c9c86b7" PRIMARY KEY ("categoriesId", "bannerId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a1b6389225cc7d56b57bdb207d" ON "categories_banners" ("categoriesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e50ee303ec1070fd4bc4461d36" ON "categories_banners" ("bannerId") `,
    );
    await queryRunner.query(`ALTER TABLE "model" ADD "statusId" integer`);
    await queryRunner.query(
      `ALTER TABLE "file" DROP CONSTRAINT "FK_eae532e4ae79b4fc1ff7d1197ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "product" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "likedCount" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "stock" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "sold" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "keywords" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "productId"`);
    await queryRunner.query(`ALTER TABLE "file" ADD "productId" integer`);
    await queryRunner.query(
      `CREATE INDEX "IDX_5198460192ebbd084ffbb5aebd" ON "brands_categories" ("brandId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_207eadbaa38ce8cf4625642519" ON "brands_categories" ("categoriesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "model" ADD CONSTRAINT "FK_cac03b34b156594338414182c71" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" ADD CONSTRAINT "FK_eae532e4ae79b4fc1ff7d1197ad" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "file" DROP CONSTRAINT "FK_eae532e4ae79b4fc1ff7d1197ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "model" DROP CONSTRAINT "FK_cac03b34b156594338414182c71"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_207eadbaa38ce8cf4625642519"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5198460192ebbd084ffbb5aebd"`,
    );
    await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "productId"`);
    await queryRunner.query(`ALTER TABLE "file" ADD "productId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "keywords" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "sold" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "stock" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "likedCount" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" ADD CONSTRAINT "FK_eae532e4ae79b4fc1ff7d1197ad" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "model" DROP COLUMN "statusId"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e50ee303ec1070fd4bc4461d36"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a1b6389225cc7d56b57bdb207d"`,
    );
    await queryRunner.query(`DROP TABLE "categories_banners"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_207eadbaa38ce8cf4625642519" ON "brands_categories" ("categoriesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5198460192ebbd084ffbb5aebd" ON "brands_categories" ("brandId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_207eadbaa38ce8cf46256425195" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
