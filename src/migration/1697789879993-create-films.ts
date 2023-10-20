import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFilms1697789879993 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "films",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "title", type: "varchar", length: "255" },
          { name: "director", type: "varchar", length: "255" },
          { name: "release_year", type: "timestamp" },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("films");
  }
}
