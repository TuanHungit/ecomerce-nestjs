import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNameTable1661256846792 implements MigrationInterface {
    name = 'CreateNameTable1661256846792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "forgot" DROP COLUMN "updatedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "forgot" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "file" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "file" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "file" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "status" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "status" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "status" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "role" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "role" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "role" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
