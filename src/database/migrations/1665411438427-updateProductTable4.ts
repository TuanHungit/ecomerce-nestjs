import { MigrationInterface, QueryRunner } from "typeorm";

export class updateProductTable41665411438427 implements MigrationInterface {
    name = 'updateProductTable41665411438427'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_207eadbaa38ce8cf46256425195"`);
        await queryRunner.query(`ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5198460192ebbd084ffbb5aebd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_207eadbaa38ce8cf4625642519"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "brandId" integer`);
        await queryRunner.query(`CREATE INDEX "IDX_5198460192ebbd084ffbb5aebd" ON "brands_categories" ("brandId") `);
        await queryRunner.query(`CREATE INDEX "IDX_207eadbaa38ce8cf4625642519" ON "brands_categories" ("categoriesId") `);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_207eadbaa38ce8cf46256425195" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_207eadbaa38ce8cf46256425195"`);
        await queryRunner.query(`ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_207eadbaa38ce8cf4625642519"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5198460192ebbd084ffbb5aebd"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "brandId"`);
        await queryRunner.query(`CREATE INDEX "IDX_207eadbaa38ce8cf4625642519" ON "brands_categories" ("categoriesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5198460192ebbd084ffbb5aebd" ON "brands_categories" ("brandId") `);
        await queryRunner.query(`ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_207eadbaa38ce8cf46256425195" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
