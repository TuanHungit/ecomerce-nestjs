import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNameTable51670682672490 implements MigrationInterface {
  name = 'CreateNameTable51670682672490';

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
      `CREATE TABLE "order-products" ("orderId" SERIAL NOT NULL, "productId" SERIAL NOT NULL, "amount" integer NOT NULL, "amountBeforeDiscount" integer, "quantity" integer NOT NULL, "discount" integer, CONSTRAINT "PK_7c88039e59bca4b081ea0dd2c23" PRIMARY KEY ("orderId", "productId"))`,
    );
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "amount"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "discount"`);
    await queryRunner.query(
      `ALTER TABLE "orders" DROP COLUMN "amountBeforeDiscount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "totalAmount" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "totalAmountBeforeDiscount" integer`,
    );
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
    await queryRunner.query(
      `ALTER TABLE "orders" DROP COLUMN "totalAmountBeforeDiscount"`,
    );
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "totalAmount"`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "amountBeforeDiscount" integer`,
    );
    await queryRunner.query(`ALTER TABLE "orders" ADD "discount" integer`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "amount" integer NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "order-products"`);
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
