import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateProductTable21665328920364 implements MigrationInterface {
  name = 'updateProductTable21665328920364';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "file" DROP CONSTRAINT "FK_eae532e4ae79b4fc1ff7d1197ad"`,
    );
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
      `CREATE TABLE "product_images_file" ("productId" integer NOT NULL, "fileId" uuid NOT NULL, CONSTRAINT "PK_d878e77f31198d8add91dfdbb78" PRIMARY KEY ("productId", "fileId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3841db663ef502a0a33e6b7cdf" ON "product_images_file" ("productId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_697f1706bb9245dee6f7694f12" ON "product_images_file" ("fileId") `,
    );
    await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "productId"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_5198460192ebbd084ffbb5aebd" ON "brands_categories" ("brandId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_207eadbaa38ce8cf4625642519" ON "brands_categories" ("categoriesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_207eadbaa38ce8cf46256425195" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_images_file" ADD CONSTRAINT "FK_3841db663ef502a0a33e6b7cdf5" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_images_file" ADD CONSTRAINT "FK_697f1706bb9245dee6f7694f12c" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_images_file" DROP CONSTRAINT "FK_697f1706bb9245dee6f7694f12c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_images_file" DROP CONSTRAINT "FK_3841db663ef502a0a33e6b7cdf5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_207eadbaa38ce8cf46256425195"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_207eadbaa38ce8cf4625642519"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5198460192ebbd084ffbb5aebd"`,
    );
    await queryRunner.query(`ALTER TABLE "file" ADD "productId" integer`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_697f1706bb9245dee6f7694f12"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3841db663ef502a0a33e6b7cdf"`,
    );
    await queryRunner.query(`DROP TABLE "product_images_file"`);
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
    await queryRunner.query(
      `ALTER TABLE "file" ADD CONSTRAINT "FK_eae532e4ae79b4fc1ff7d1197ad" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
