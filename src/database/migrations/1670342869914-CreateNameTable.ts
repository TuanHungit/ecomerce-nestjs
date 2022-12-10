import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNameTable1670342869914 implements MigrationInterface {
  name = 'CreateNameTable1670342869914';

  public async up(queryRunner: QueryRunner): Promise<void> {
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
      `DROP INDEX "public"."IDX_5198460192ebbd084ffbb5aebd"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_207eadbaa38ce8cf4625642519"`,
    );
    await queryRunner.query(
      `CREATE TABLE "tier_model_models_model" ("tierModelId" uuid NOT NULL, "modelId" uuid NOT NULL, CONSTRAINT "PK_f9efc75c428cb14e78bcf132ea4" PRIMARY KEY ("tierModelId", "modelId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_93405c7036c5fcdf5c592c1a5a" ON "tier_model_models_model" ("tierModelId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c6e60fc984f73845bf50c72a78" ON "tier_model_models_model" ("modelId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "product_tier_models_tier_model" ("productId" integer NOT NULL, "tierModelId" uuid NOT NULL, CONSTRAINT "PK_c3c276c8dc2e4ad29b3776e9c74" PRIMARY KEY ("productId", "tierModelId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5ef7a42584b017658d1e4788f1" ON "product_tier_models_tier_model" ("productId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_191cceca051c23e01d95eccbb7" ON "product_tier_models_tier_model" ("tierModelId") `,
    );
    await queryRunner.query(`ALTER TABLE "model" DROP COLUMN "productId"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "tierModelId"`);
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
      `ALTER TABLE "tier_model_models_model" ADD CONSTRAINT "FK_93405c7036c5fcdf5c592c1a5ab" FOREIGN KEY ("tierModelId") REFERENCES "tier_model"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "tier_model_models_model" ADD CONSTRAINT "FK_c6e60fc984f73845bf50c72a781" FOREIGN KEY ("modelId") REFERENCES "model"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tier_models_tier_model" ADD CONSTRAINT "FK_5ef7a42584b017658d1e4788f18" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tier_models_tier_model" ADD CONSTRAINT "FK_191cceca051c23e01d95eccbb75" FOREIGN KEY ("tierModelId") REFERENCES "tier_model"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_tier_models_tier_model" DROP CONSTRAINT "FK_191cceca051c23e01d95eccbb75"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tier_models_tier_model" DROP CONSTRAINT "FK_5ef7a42584b017658d1e4788f18"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tier_model_models_model" DROP CONSTRAINT "FK_c6e60fc984f73845bf50c72a781"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tier_model_models_model" DROP CONSTRAINT "FK_93405c7036c5fcdf5c592c1a5ab"`,
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
    await queryRunner.query(`ALTER TABLE "product" ADD "tierModelId" uuid`);
    await queryRunner.query(`ALTER TABLE "model" ADD "productId" integer`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_191cceca051c23e01d95eccbb7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5ef7a42584b017658d1e4788f1"`,
    );
    await queryRunner.query(`DROP TABLE "product_tier_models_tier_model"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c6e60fc984f73845bf50c72a78"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_93405c7036c5fcdf5c592c1a5a"`,
    );
    await queryRunner.query(`DROP TABLE "tier_model_models_model"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_207eadbaa38ce8cf4625642519" ON "brands_categories" ("categoriesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5198460192ebbd084ffbb5aebd" ON "brands_categories" ("brandId") `,
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
}
