import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateProductTable31665330057711 implements MigrationInterface {
  name = 'updateProductTable31665330057711';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_207eadbaa38ce8cf46256425195"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "model" DROP CONSTRAINT "FK_effac29b5ff21f939d5a2b58bff"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5198460192ebbd084ffbb5aebd"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_207eadbaa38ce8cf4625642519"`,
    );
    await queryRunner.query(
      `ALTER TABLE "model" RENAME COLUMN "tierModelId" TO "productId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_f5c32732fdadb7b5bef29d28166"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "REL_f5c32732fdadb7b5bef29d2816"`,
    );
    await queryRunner.query(`ALTER TABLE "model" DROP COLUMN "productId"`);
    await queryRunner.query(`ALTER TABLE "model" ADD "productId" integer`);
    await queryRunner.query(
      `CREATE INDEX "IDX_5198460192ebbd084ffbb5aebd" ON "brands_categories" ("brandId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_207eadbaa38ce8cf4625642519" ON "brands_categories" ("categoriesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_f5c32732fdadb7b5bef29d28166" FOREIGN KEY ("tierModelId") REFERENCES "tier_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "model" ADD CONSTRAINT "FK_4ae03a5dbb5a4be16e752543237" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "model" DROP CONSTRAINT "FK_4ae03a5dbb5a4be16e752543237"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_f5c32732fdadb7b5bef29d28166"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_207eadbaa38ce8cf4625642519"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5198460192ebbd084ffbb5aebd"`,
    );
    await queryRunner.query(`ALTER TABLE "model" DROP COLUMN "productId"`);
    await queryRunner.query(`ALTER TABLE "model" ADD "productId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "REL_f5c32732fdadb7b5bef29d2816" UNIQUE ("tierModelId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_f5c32732fdadb7b5bef29d28166" FOREIGN KEY ("tierModelId") REFERENCES "tier_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "model" RENAME COLUMN "productId" TO "tierModelId"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_207eadbaa38ce8cf4625642519" ON "brands_categories" ("categoriesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5198460192ebbd084ffbb5aebd" ON "brands_categories" ("brandId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "model" ADD CONSTRAINT "FK_effac29b5ff21f939d5a2b58bff" FOREIGN KEY ("tierModelId") REFERENCES "tier_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_207eadbaa38ce8cf46256425195" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
