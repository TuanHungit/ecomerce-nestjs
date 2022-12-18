import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNameTable61671353026945 implements MigrationInterface {
  name = 'CreateNameTable61671353026945';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_products" DROP CONSTRAINT "FK_27ca18f2453639a1cafb7404ece"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" DROP CONSTRAINT "FK_28b66449cf7cd76444378ad4e92"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_207eadbaa38ce8cf46256425195"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_28b66449cf7cd76444378ad4e9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_27ca18f2453639a1cafb7404ec"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5198460192ebbd084ffbb5aebd"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_207eadbaa38ce8cf4625642519"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" DROP COLUMN "amount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" DROP COLUMN "amountBeforeDiscount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" DROP COLUMN "quantity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" DROP COLUMN "discount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "model" ADD "parent" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" ADD "amount" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" ADD "amountBeforeDiscount" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" ADD "quantity" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" ADD "discount" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" ALTER COLUMN "orderId" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "order_products_orderId_seq"`);
    await queryRunner.query(
      `ALTER TABLE "order_products" ALTER COLUMN "productId" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "order_products_productId_seq"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_5198460192ebbd084ffbb5aebd" ON "brands_categories" ("brandId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_207eadbaa38ce8cf4625642519" ON "brands_categories" ("categoriesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_28b66449cf7cd76444378ad4e9" ON "order_products" ("orderId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_27ca18f2453639a1cafb7404ec" ON "order_products" ("productId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_207eadbaa38ce8cf46256425195" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" ADD CONSTRAINT "FK_28b66449cf7cd76444378ad4e92" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" ADD CONSTRAINT "FK_27ca18f2453639a1cafb7404ece" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_products" DROP CONSTRAINT "FK_27ca18f2453639a1cafb7404ece"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" DROP CONSTRAINT "FK_28b66449cf7cd76444378ad4e92"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_207eadbaa38ce8cf46256425195"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_27ca18f2453639a1cafb7404ec"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_28b66449cf7cd76444378ad4e9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_207eadbaa38ce8cf4625642519"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5198460192ebbd084ffbb5aebd"`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "order_products_productId_seq" OWNED BY "order_products"."productId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" ALTER COLUMN "productId" SET DEFAULT nextval('"order_products_productId_seq"')`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "order_products_orderId_seq" OWNED BY "order_products"."orderId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" ALTER COLUMN "orderId" SET DEFAULT nextval('"order_products_orderId_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" DROP COLUMN "discount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" DROP COLUMN "quantity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" DROP COLUMN "amountBeforeDiscount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" DROP COLUMN "amount"`,
    );
    await queryRunner.query(`ALTER TABLE "model" DROP COLUMN "parent"`);
    await queryRunner.query(
      `ALTER TABLE "order_products" ADD "discount" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" ADD "quantity" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" ADD "amountBeforeDiscount" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" ADD "amount" integer NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_207eadbaa38ce8cf4625642519" ON "brands_categories" ("categoriesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5198460192ebbd084ffbb5aebd" ON "brands_categories" ("brandId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_27ca18f2453639a1cafb7404ec" ON "order_products" ("productId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_28b66449cf7cd76444378ad4e9" ON "order_products" ("orderId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_207eadbaa38ce8cf46256425195" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" ADD CONSTRAINT "FK_28b66449cf7cd76444378ad4e92" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" ADD CONSTRAINT "FK_27ca18f2453639a1cafb7404ece" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
