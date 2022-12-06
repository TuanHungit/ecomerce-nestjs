import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNameTable11669903615295 implements MigrationInterface {
  name = 'CreateNameTable11669903615295';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "file" DROP CONSTRAINT "FK_eae532e4ae79b4fc1ff7d1197ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "FK_c3992aae3742cdb91294e7ec7fc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "model" DROP CONSTRAINT "FK_effac29b5ff21f939d5a2b58bff"`,
    );
    await queryRunner.query(
      `CREATE TABLE "brands_categories" ("brandId" integer NOT NULL, "categoriesId" integer NOT NULL, CONSTRAINT "PK_b48fcd532fd89479dc81cd6e141" PRIMARY KEY ("brandId", "categoriesId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reviews" ("id" SERIAL NOT NULL, "user" jsonb NOT NULL, "product" jsonb NOT NULL, "rating" integer NOT NULL, "productQuality" character varying, "trueToDescription" character varying, "review" character varying, "statusId" integer, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."orders_status_enum" AS ENUM('unpaid', 'pending', 'aborted', 'successful')`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "discount" integer, "amountBeforeDiscount" integer, "userId" character varying NOT NULL, "productId" character varying NOT NULL, "quantity" integer NOT NULL, "status" "public"."orders_status_enum" NOT NULL DEFAULT 'unpaid', "note" character varying NOT NULL, "address" character varying, "paymentMethod" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
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
    await queryRunner.query(
      `CREATE TABLE "product_images_file" ("productId" integer NOT NULL, "fileId" uuid NOT NULL, CONSTRAINT "PK_d878e77f31198d8add91dfdbb78" PRIMARY KEY ("productId", "fileId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3841db663ef502a0a33e6b7cdf" ON "product_images_file" ("productId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_697f1706bb9245dee6f7694f12" ON "product_images_file" ("fileId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "likes" ("productId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_a4a87b8e1155983bef474c7ddfe" PRIMARY KEY ("productId", "userId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_36096625e9a713d7b1f8d34eea" ON "likes" ("productId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cfd8e81fac09d7339a32e57d90" ON "likes" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "reviews_files_file" ("reviewsId" integer NOT NULL, "fileId" uuid NOT NULL, CONSTRAINT "PK_d33bb7c14601d938e084d5d08ac" PRIMARY KEY ("reviewsId", "fileId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7a40a1d604fa6427773147fee2" ON "reviews_files_file" ("reviewsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_596ad21c1604113208b389f94d" ON "reviews_files_file" ("fileId") `,
    );
    await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "productId"`);
    await queryRunner.query(`ALTER TABLE "model" DROP COLUMN "tierModelId"`);
    await queryRunner.query(`ALTER TABLE "file" ADD "type" character varying`);
    await queryRunner.query(`ALTER TABLE "file" ADD "duration" integer`);
    await queryRunner.query(`ALTER TABLE "brand" ADD "imageId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "UQ_062524ac7f03786e461134ea624" UNIQUE ("imageId")`,
    );
    await queryRunner.query(`ALTER TABLE "product" ADD "brandId" integer`);
    await queryRunner.query(`ALTER TABLE "model" ADD "productId" integer`);
    await queryRunner.query(`ALTER TABLE "model" ADD "statusId" integer`);
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
    await queryRunner.query(
      `ALTER TABLE "categories" ALTER COLUMN "slug" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "FK_7558b84d1a659a2a853e09a91bc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f"`,
    );
    await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "brand" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ALTER COLUMN "totalProduct" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ALTER COLUMN "slug" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "REL_7558b84d1a659a2a853e09a91b"`,
    );
    await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "statusId"`);
    await queryRunner.query(`ALTER TABLE "brand" ADD "statusId" integer`);
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_b1b332c0f436897f21a960f26c7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_f5c32732fdadb7b5bef29d28166"`,
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
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "keywords"`);
    await queryRunner.query(`ALTER TABLE "product" ADD "keywords" jsonb`);
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "slug" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "UQ_b1b332c0f436897f21a960f26c7"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoriesId"`);
    await queryRunner.query(`ALTER TABLE "product" ADD "categoriesId" integer`);
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "REL_f5c32732fdadb7b5bef29d2816"`,
    );
    await queryRunner.query(
      `ALTER TABLE "model" ALTER COLUMN "sold" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5198460192ebbd084ffbb5aebd" ON "brands_categories" ("brandId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_207eadbaa38ce8cf4625642519" ON "brands_categories" ("categoriesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "FK_7558b84d1a659a2a853e09a91bc" FOREIGN KEY ("logoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "FK_062524ac7f03786e461134ea624" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "FK_c3992aae3742cdb91294e7ec7fc" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_b1b332c0f436897f21a960f26c7" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_b31522e7a7f93ef47f311590a79" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_f5c32732fdadb7b5bef29d28166" FOREIGN KEY ("tierModelId") REFERENCES "tier_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "model" ADD CONSTRAINT "FK_4ae03a5dbb5a4be16e752543237" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "model" ADD CONSTRAINT "FK_cac03b34b156594338414182c71" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_ba7c2d4620cd7088e74e3ba84ad" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
    await queryRunner.query(
      `ALTER TABLE "product_images_file" ADD CONSTRAINT "FK_3841db663ef502a0a33e6b7cdf5" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_images_file" ADD CONSTRAINT "FK_697f1706bb9245dee6f7694f12c" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "FK_36096625e9a713d7b1f8d34eea0" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews_files_file" ADD CONSTRAINT "FK_7a40a1d604fa6427773147fee24" FOREIGN KEY ("reviewsId") REFERENCES "reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews_files_file" ADD CONSTRAINT "FK_596ad21c1604113208b389f94d3" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reviews_files_file" DROP CONSTRAINT "FK_596ad21c1604113208b389f94d3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews_files_file" DROP CONSTRAINT "FK_7a40a1d604fa6427773147fee24"`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904"`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "FK_36096625e9a713d7b1f8d34eea0"`,
    );
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
      `ALTER TABLE "categories_banners" DROP CONSTRAINT "FK_e50ee303ec1070fd4bc4461d362"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" DROP CONSTRAINT "FK_a1b6389225cc7d56b57bdb207d6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "FK_ba7c2d4620cd7088e74e3ba84ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "model" DROP CONSTRAINT "FK_cac03b34b156594338414182c71"`,
    );
    await queryRunner.query(
      `ALTER TABLE "model" DROP CONSTRAINT "FK_4ae03a5dbb5a4be16e752543237"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_f5c32732fdadb7b5bef29d28166"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_b31522e7a7f93ef47f311590a79"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_b1b332c0f436897f21a960f26c7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "FK_c3992aae3742cdb91294e7ec7fc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "FK_062524ac7f03786e461134ea624"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "FK_7558b84d1a659a2a853e09a91bc"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_207eadbaa38ce8cf4625642519"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5198460192ebbd084ffbb5aebd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "model" ALTER COLUMN "sold" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "REL_f5c32732fdadb7b5bef29d2816" UNIQUE ("tierModelId")`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoriesId"`);
    await queryRunner.query(`ALTER TABLE "product" ADD "categoriesId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "UQ_b1b332c0f436897f21a960f26c7" UNIQUE ("imageId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "slug" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "keywords"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "keywords" text array NOT NULL`,
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
      `ALTER TABLE "product" ADD CONSTRAINT "FK_f5c32732fdadb7b5bef29d28166" FOREIGN KEY ("tierModelId") REFERENCES "tier_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_b1b332c0f436897f21a960f26c7" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "statusId"`);
    await queryRunner.query(`ALTER TABLE "brand" ADD "statusId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "REL_7558b84d1a659a2a853e09a91b" UNIQUE ("logoId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ALTER COLUMN "slug" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ALTER COLUMN "totalProduct" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f"`,
    );
    await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "brand" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "FK_7558b84d1a659a2a853e09a91bc" FOREIGN KEY ("logoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ALTER COLUMN "slug" SET NOT NULL`,
    );
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
    await queryRunner.query(`ALTER TABLE "model" DROP COLUMN "statusId"`);
    await queryRunner.query(`ALTER TABLE "model" DROP COLUMN "productId"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "brandId"`);
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "UQ_062524ac7f03786e461134ea624"`,
    );
    await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "imageId"`);
    await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "duration"`);
    await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "type"`);
    await queryRunner.query(`ALTER TABLE "model" ADD "tierModelId" uuid`);
    await queryRunner.query(`ALTER TABLE "file" ADD "productId" uuid`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_596ad21c1604113208b389f94d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7a40a1d604fa6427773147fee2"`,
    );
    await queryRunner.query(`DROP TABLE "reviews_files_file"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cfd8e81fac09d7339a32e57d90"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_36096625e9a713d7b1f8d34eea"`,
    );
    await queryRunner.query(`DROP TABLE "likes"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_697f1706bb9245dee6f7694f12"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3841db663ef502a0a33e6b7cdf"`,
    );
    await queryRunner.query(`DROP TABLE "product_images_file"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e50ee303ec1070fd4bc4461d36"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a1b6389225cc7d56b57bdb207d"`,
    );
    await queryRunner.query(`DROP TABLE "categories_banners"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
    await queryRunner.query(`DROP TABLE "reviews"`);
    await queryRunner.query(`DROP TABLE "brands_categories"`);
    await queryRunner.query(
      `ALTER TABLE "model" ADD CONSTRAINT "FK_effac29b5ff21f939d5a2b58bff" FOREIGN KEY ("tierModelId") REFERENCES "tier_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "FK_c3992aae3742cdb91294e7ec7fc" FOREIGN KEY ("statusId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" ADD CONSTRAINT "FK_eae532e4ae79b4fc1ff7d1197ad" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
