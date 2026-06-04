import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1780519934260 implements MigrationInterface {
    name = 'Update1780519934260'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "room_type" ("id" SERIAL NOT NULL, "campus_id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_abd0f8a4c8a444a84fa2b343353" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "campus_id" integer NOT NULL, "building_id" integer NOT NULL, "floor" integer NOT NULL, "capacity" integer NOT NULL, "room_type_id" integer NOT NULL, "equipement" character varying NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "campus" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "zip_code" character varying NOT NULL, "region" character varying NOT NULL, "director" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "student_capacity" integer NOT NULL, "opening_date" TIMESTAMP NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_150aa1747b3517c47f9bd98ea6d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "building" ("id" SERIAL NOT NULL, "campus_id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_bbfaf6c11f141a22d2ab105ee5f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "room_type" ADD CONSTRAINT "FK_9ad71619a25ce1420d3a65b3fdc" FOREIGN KEY ("campus_id") REFERENCES "campus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_fa95bab7713e75cfd59cef55c59" FOREIGN KEY ("campus_id") REFERENCES "campus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_a60af3e73dc64bf32778ae73906" FOREIGN KEY ("building_id") REFERENCES "building"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_55b383d0ec20230d193ca584a4a" FOREIGN KEY ("room_type_id") REFERENCES "room_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "building" ADD CONSTRAINT "FK_23f189110507971a35d48861518" FOREIGN KEY ("campus_id") REFERENCES "campus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "building" DROP CONSTRAINT "FK_23f189110507971a35d48861518"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_55b383d0ec20230d193ca584a4a"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_a60af3e73dc64bf32778ae73906"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_fa95bab7713e75cfd59cef55c59"`);
        await queryRunner.query(`ALTER TABLE "room_type" DROP CONSTRAINT "FK_9ad71619a25ce1420d3a65b3fdc"`);
        await queryRunner.query(`DROP TABLE "building"`);
        await queryRunner.query(`DROP TABLE "campus"`);
        await queryRunner.query(`DROP TABLE "room"`);
        await queryRunner.query(`DROP TABLE "room_type"`);
    }

}
