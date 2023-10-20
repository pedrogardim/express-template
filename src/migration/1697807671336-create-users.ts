import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1697807671336 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "username", type: "varchar", length: "50" },
          { name: "email", type: "varchar", length: "50" },
          {
            name: "created_at",
            type: "timestamp",
            default: "current_timestamp",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
