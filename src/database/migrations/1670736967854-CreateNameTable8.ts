import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNameTable81670736967854 implements MigrationInterface {
    name = 'CreateNameTable81670736967854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_207eadbaa38ce8cf46256425195"`);
        await queryRunner.query(`ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7"`);
        await queryRunner.query(`ALTER TABLE "model" DROP CONSTRAINT "FK_4ae03a5dbb5a4be16e752543237"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_f5c32732fdadb7b5bef29d28166"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5198460192ebbd084ffbb5aebd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_207eadbaa38ce8cf4625642519"`);
        await queryRunner.query(`CREATE TABLE "tierModel_model" ("tierModelId" uuid NOT NULL, "modelId" uuid NOT NULL, CONSTRAINT "PK_c805984eb3dc4559472b0a06f06" PRIMARY KEY ("tierModelId", "modelId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f826b542e381e60f89787ab16a" ON "tierModel_model" ("tierModelId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4a8ec38e2bc9efdd8c551f6850" ON "tierModel_model" ("modelId") `);
        await queryRunner.query(`CREATE TABLE "product_tierModel" ("productId" integer NOT NULL, "tierModelId" uuid NOT NULL, CONSTRAINT "PK_8de70800dfb470509f4a56a6774" PRIMARY KEY ("productId", "tierModelId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5b82a2e77714d67ed2f3fd404f" ON "product_tierModel" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3bfae9d6f312c193f2c715a8da" ON "product_tierModel" ("tierModelId") `);
        await queryRunner.query(`ALTER TABLE "model" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "tierModelId"`);
        await queryRunner.query(`CREATE INDEX "IDX_5198460192ebbd084ffbb5aebd" ON "brands_categories" ("brandId") `);
        await queryRunner.query(`CREATE INDEX "IDX_207eadbaa38ce8cf4625642519" ON "brands_categories" ("categoriesId") `);
        await queryRunner.query(`ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_207eadbaa38ce8cf46256425195" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tierModel_model" ADD CONSTRAINT "FK_f826b542e381e60f89787ab16ab" FOREIGN KEY ("tierModelId") REFERENCES "tier_model"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tierModel_model" ADD CONSTRAINT "FK_4a8ec38e2bc9efdd8c551f68504" FOREIGN KEY ("modelId") REFERENCES "model"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_tierModel" ADD CONSTRAINT "FK_5b82a2e77714d67ed2f3fd404ff" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_tierModel" ADD CONSTRAINT "FK_3bfae9d6f312c193f2c715a8da2" FOREIGN KEY ("tierModelId") REFERENCES "tier_model"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_tierModel" DROP CONSTRAINT "FK_3bfae9d6f312c193f2c715a8da2"`);
        await queryRunner.query(`ALTER TABLE "product_tierModel" DROP CONSTRAINT "FK_5b82a2e77714d67ed2f3fd404ff"`);
        await queryRunner.query(`ALTER TABLE "tierModel_model" DROP CONSTRAINT "FK_4a8ec38e2bc9efdd8c551f68504"`);
        await queryRunner.query(`ALTER TABLE "tierModel_model" DROP CONSTRAINT "FK_f826b542e381e60f89787ab16ab"`);
        await queryRunner.query(`ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_207eadbaa38ce8cf46256425195"`);
        await queryRunner.query(`ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_207eadbaa38ce8cf4625642519"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5198460192ebbd084ffbb5aebd"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "tierModelId" uuid`);
        await queryRunner.query(`ALTER TABLE "model" ADD "productId" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3bfae9d6f312c193f2c715a8da"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5b82a2e77714d67ed2f3fd404f"`);
        await queryRunner.query(`DROP TABLE "product_tierModel"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4a8ec38e2bc9efdd8c551f6850"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f826b542e381e60f89787ab16a"`);
        await queryRunner.query(`DROP TABLE "tierModel_model"`);
        await queryRunner.query(`CREATE INDEX "IDX_207eadbaa38ce8cf4625642519" ON "brands_categories" ("categoriesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5198460192ebbd084ffbb5aebd" ON "brands_categories" ("brandId") `);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_f5c32732fdadb7b5bef29d28166" FOREIGN KEY ("tierModelId") REFERENCES "tier_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "model" ADD CONSTRAINT "FK_4ae03a5dbb5a4be16e752543237" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_207eadbaa38ce8cf46256425195" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
