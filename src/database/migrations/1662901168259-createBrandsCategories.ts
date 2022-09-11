import { MigrationInterface, QueryRunner } from 'typeorm';

export class createBrandsCategories1662901168259 implements MigrationInterface {
  name = 'createBrandsCategories1662901168259';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "slug" character varying, "logoId" uuid, "statusId" integer, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tier_model" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "statusId" integer, CONSTRAINT "PK_f77960fd789d2b9a4f95db87050" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "likedCount" integer NOT NULL, "discount" integer NOT NULL, "stock" integer NOT NULL, "price" integer NOT NULL, "priceBeforeDiscount" integer NOT NULL, "sold" integer NOT NULL, "keywords" text array NOT NULL, "slug" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "imageId" uuid, "statusId" integer, "categoriesId" uuid, "tierModelId" uuid, CONSTRAINT "REL_b1b332c0f436897f21a960f26c" UNIQUE ("imageId"), CONSTRAINT "REL_f5c32732fdadb7b5bef29d2816" UNIQUE ("tierModelId"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "path" character varying NOT NULL, "productId" uuid, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "banner" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "type" integer NOT NULL, "link" character varying, "order" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "photoId" uuid, "statusId" integer, CONSTRAINT "PK_6d9e2570b3d85ba37b681cd4256" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "brand" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "totalProduct" integer NOT NULL DEFAULT '0', "slug" character varying, "logoId" uuid, "imageId" uuid, "statusId" integer, CONSTRAINT "REL_062524ac7f03786e461134ea62" UNIQUE ("imageId"), CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "brands_categories" ("brandId" integer NOT NULL, "categoriesId" integer NOT NULL, CONSTRAINT "PK_b48fcd532fd89479dc81cd6e141" PRIMARY KEY ("brandId", "categoriesId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying, "username" character varying, "password" character varying, "provider" character varying NOT NULL DEFAULT 'email', "socialId" character varying, "fullName" character varying, "birthday" TIMESTAMP, "gender" integer, "phoneNumber" character varying, "hash" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "photoId" uuid, "roleId" integer, "statusId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f" ON "user" ("socialId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_035190f70c9aff0ef331258d28" ON "user" ("fullName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e282acb94d2e3aec10f480e4f6" ON "user" ("hash") `,
    );
    await queryRunner.query(
      `CREATE TABLE "forgot" ("id" SERIAL NOT NULL, "hash" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, CONSTRAINT "PK_087959f5bb89da4ce3d763eab75" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_df507d27b0fb20cd5f7bef9b9a" ON "forgot" ("hash") `,
    );
    await queryRunner.query(
      `CREATE TABLE "model" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" integer NOT NULL, "priceBeforeDiscount" integer NOT NULL, "stock" integer NOT NULL, "sold" integer NOT NULL, "image" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "tierModelId" uuid, CONSTRAINT "PK_d6df271bba301d5cc79462912a4" PRIMARY KEY ("id"))`,
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
    await queryRunner.query(
      `CREATE INDEX "IDX_5198460192ebbd084ffbb5aebd" ON "brands_categories" ("brandId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_207eadbaa38ce8cf4625642519" ON "brands_categories" ("categoriesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD CONSTRAINT "FK_3f43543ba2a8716cc5d3dd58ae8" FOREIGN KEY ("logoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD CONSTRAINT "FK_a01a568fbbff540189390c77704" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tier_model" ADD CONSTRAINT "FK_3386c1c0dba4b5faaf69ea648c3" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_b1b332c0f436897f21a960f26c7" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_9ec2c7792817b56a3533ca1d7aa" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_b31522e7a7f93ef47f311590a79" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_f5c32732fdadb7b5bef29d28166" FOREIGN KEY ("tierModelId") REFERENCES "tier_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" ADD CONSTRAINT "FK_eae532e4ae79b4fc1ff7d1197ad" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "banner" ADD CONSTRAINT "FK_069dddfdc9b2255d633a27e3b17" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "banner" ADD CONSTRAINT "FK_b8cbc3e8c3efd6dca51ab58ee40" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "user" ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "forgot" ADD CONSTRAINT "FK_31f3c80de0525250f31e23a9b83" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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

  public async down(queryRunner: QueryRunner): Promise<void> {
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
      `ALTER TABLE "forgot" DROP CONSTRAINT "FK_31f3c80de0525250f31e23a9b83"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`,
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
      `ALTER TABLE "banner" DROP CONSTRAINT "FK_b8cbc3e8c3efd6dca51ab58ee40"`,
    );
    await queryRunner.query(
      `ALTER TABLE "banner" DROP CONSTRAINT "FK_069dddfdc9b2255d633a27e3b17"`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" DROP CONSTRAINT "FK_eae532e4ae79b4fc1ff7d1197ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_f5c32732fdadb7b5bef29d28166"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_b31522e7a7f93ef47f311590a79"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_9ec2c7792817b56a3533ca1d7aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_b1b332c0f436897f21a960f26c7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tier_model" DROP CONSTRAINT "FK_3386c1c0dba4b5faaf69ea648c3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" DROP CONSTRAINT "FK_a01a568fbbff540189390c77704"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" DROP CONSTRAINT "FK_3f43543ba2a8716cc5d3dd58ae8"`,
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
      `ALTER TABLE "brands_categories" ADD "categoriesId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" DROP CONSTRAINT "PK_5198460192ebbd084ffbb5aebd7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" ADD CONSTRAINT "PK_b48fcd532fd89479dc81cd6e141" PRIMARY KEY ("brandId", "categoriesId")`,
    );
    await queryRunner.query(`DROP TABLE "model"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_df507d27b0fb20cd5f7bef9b9a"`,
    );
    await queryRunner.query(`DROP TABLE "forgot"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e282acb94d2e3aec10f480e4f6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_035190f70c9aff0ef331258d28"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9bd2fe7a8e694dedc4ec2f666f"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "brands_categories"`);
    await queryRunner.query(`DROP TABLE "brand"`);
    await queryRunner.query(`DROP TABLE "banner"`);
    await queryRunner.query(`DROP TABLE "file"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "tier_model"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "status"`);
  }
}
