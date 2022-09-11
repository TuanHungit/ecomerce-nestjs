import { MigrationInterface, QueryRunner } from 'typeorm';

export class createBrandsCategories11662901593776
  implements MigrationInterface
{
  name = 'createBrandsCategories11662901593776';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_207eadbaa38ce8cf46256425195"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5198460192ebbd084ffbb5aebd"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_207eadbaa38ce8cf4625642519"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_b31522e7a7f93ef47f311590a79"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" DROP CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b"`,
    );
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "id" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoriesId"`);
    await queryRunner.query(`ALTER TABLE "product" ADD "categoriesId" integer`);
    await queryRunner.query(
      `ALTER TABLE "brands_categories" DROP CONSTRAINT "PK_b48fcd532fd89479dc81cd6e141"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" ADD CONSTRAINT "PK_5198460192ebbd084ffbb5aebd7" PRIMARY KEY ("brandId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" DROP COLUMN "categoriesId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" ADD "categoriesId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" DROP CONSTRAINT "PK_5198460192ebbd084ffbb5aebd7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" ADD CONSTRAINT "PK_b48fcd532fd89479dc81cd6e141" PRIMARY KEY ("brandId", "categoriesId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5198460192ebbd084ffbb5aebd" ON "brands_categories" ("brandId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_207eadbaa38ce8cf4625642519" ON "brands_categories" ("categoriesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_b31522e7a7f93ef47f311590a79" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "product" DROP CONSTRAINT "FK_b31522e7a7f93ef47f311590a79"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_207eadbaa38ce8cf4625642519"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5198460192ebbd084ffbb5aebd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" DROP CONSTRAINT "PK_b48fcd532fd89479dc81cd6e141"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" ADD CONSTRAINT "PK_5198460192ebbd084ffbb5aebd7" PRIMARY KEY ("brandId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" DROP COLUMN "categoriesId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" ADD "categoriesId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" DROP CONSTRAINT "PK_5198460192ebbd084ffbb5aebd7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" ADD CONSTRAINT "PK_b48fcd532fd89479dc81cd6e141" PRIMARY KEY ("brandId", "categoriesId")`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoriesId"`);
    await queryRunner.query(`ALTER TABLE "product" ADD "categoriesId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "categories" DROP CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b"`,
    );
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_b31522e7a7f93ef47f311590a79" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_207eadbaa38ce8cf4625642519" ON "brands_categories" ("categoriesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5198460192ebbd084ffbb5aebd" ON "brands_categories" ("brandId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_207eadbaa38ce8cf46256425195" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
