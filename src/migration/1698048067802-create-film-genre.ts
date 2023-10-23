import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFilmGenre1698048067802 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "film_genre",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "genre_id", type: "int" },
          { name: "film_id", type: "int" },
        ],
        foreignKeys: [
          {
            columnNames: ["genre_id"],
            referencedTableName: "genres",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["film_id"],
            referencedTableName: "films",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("film_genre");
  }
}
