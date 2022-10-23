import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNameTable1665588801305 implements MigrationInterface {
    name = 'CreateNameTable1665588801305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_eae532e4ae79b4fc1ff7d1197ad"`);
        await queryRunner.query(`ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_207eadbaa38ce8cf46256425195"`);
        await queryRunner.query(`ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7"`);
        await queryRunner.query(`ALTER TABLE "model" DROP CONSTRAINT "FK_effac29b5ff21f939d5a2b58bff"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5198460192ebbd084ffbb5aebd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_207eadbaa38ce8cf4625642519"`);
        await queryRunner.query(`CREATE TABLE "product_images_file" ("productId" integer NOT NULL, "fileId" uuid NOT NULL, CONSTRAINT "PK_d878e77f31198d8add91dfdbb78" PRIMARY KEY ("productId", "fileId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3841db663ef502a0a33e6b7cdf" ON "product_images_file" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_697f1706bb9245dee6f7694f12" ON "product_images_file" ("fileId") `);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "model" DROP COLUMN "tierModelId"`);
        await queryRunner.query(`ALTER TABLE "file" ADD "type" character varying`);
        await queryRunner.query(`ALTER TABLE "file" ADD "duration" integer`);
        await queryRunner.query(`ALTER TABLE "product" ADD "brandId" integer`);
        await queryRunner.query(`ALTER TABLE "model" ADD "productId" integer`);
        await queryRunner.query(`ALTER TABLE "model" ADD "statusId" integer`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_b1b332c0f436897f21a960f26c7"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_f5c32732fdadb7b5bef29d28166"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "keywords"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "keywords" jsonb`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "slug" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "UQ_b1b332c0f436897f21a960f26c7"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "REL_f5c32732fdadb7b5bef29d2816"`);
        await queryRunner.query(`ALTER TABLE "model" ALTER COLUMN "sold" SET DEFAULT '0'`);
        await queryRunner.query(`CREATE INDEX "IDX_5198460192ebbd084ffbb5aebd" ON "brands_categories" ("brandId") `);
        await queryRunner.query(`CREATE INDEX "IDX_207eadbaa38ce8cf4625642519" ON "brands_categories" ("categoriesId") `);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_b1b332c0f436897f21a960f26c7" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_f5c32732fdadb7b5bef29d28166" FOREIGN KEY ("tierModelId") REFERENCES "tier_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "model" ADD CONSTRAINT "FK_4ae03a5dbb5a4be16e752543237" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "model" ADD CONSTRAINT "FK_cac03b34b156594338414182c71" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_207eadbaa38ce8cf46256425195" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_images_file" ADD CONSTRAINT "FK_3841db663ef502a0a33e6b7cdf5" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_images_file" ADD CONSTRAINT "FK_697f1706bb9245dee6f7694f12c" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_images_file" DROP CONSTRAINT "FK_697f1706bb9245dee6f7694f12c"`);
        await queryRunner.query(`ALTER TABLE "product_images_file" DROP CONSTRAINT "FK_3841db663ef502a0a33e6b7cdf5"`);
        await queryRunner.query(`ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_207eadbaa38ce8cf46256425195"`);
        await queryRunner.query(`ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7"`);
        await queryRunner.query(`ALTER TABLE "model" DROP CONSTRAINT "FK_cac03b34b156594338414182c71"`);
        await queryRunner.query(`ALTER TABLE "model" DROP CONSTRAINT "FK_4ae03a5dbb5a4be16e752543237"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_f5c32732fdadb7b5bef29d28166"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_b1b332c0f436897f21a960f26c7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_207eadbaa38ce8cf4625642519"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5198460192ebbd084ffbb5aebd"`);
        await queryRunner.query(`ALTER TABLE "model" ALTER COLUMN "sold" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "REL_f5c32732fdadb7b5bef29d2816" UNIQUE ("tierModelId")`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "UQ_b1b332c0f436897f21a960f26c7" UNIQUE ("imageId")`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "slug" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "keywords"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "keywords" text array`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_f5c32732fdadb7b5bef29d28166" FOREIGN KEY ("tierModelId") REFERENCES "tier_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_b1b332c0f436897f21a960f26c7" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "model" DROP COLUMN "statusId"`);
        await queryRunner.query(`ALTER TABLE "model" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "brandId"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "duration"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "model" ADD "tierModelId" uuid`);
        await queryRunner.query(`ALTER TABLE "file" ADD "productId" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_697f1706bb9245dee6f7694f12"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3841db663ef502a0a33e6b7cdf"`);
        await queryRunner.query(`DROP TABLE "product_images_file"`);
        await queryRunner.query(`CREATE INDEX "IDX_207eadbaa38ce8cf4625642519" ON "brands_categories" ("categoriesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5198460192ebbd084ffbb5aebd" ON "brands_categories" ("brandId") `);
        await queryRunner.query(`ALTER TABLE "model" ADD CONSTRAINT "FK_effac29b5ff21f939d5a2b58bff" FOREIGN KEY ("tierModelId") REFERENCES "tier_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_207eadbaa38ce8cf46256425195" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_eae532e4ae79b4fc1ff7d1197ad" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
