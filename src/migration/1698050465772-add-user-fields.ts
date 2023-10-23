import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddUserFields1698050465772 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("users", [
      new TableColumn({
        name: "password",
        type: "varchar",
        length: "200",
      }),
      new TableColumn({
        name: "is_active",
        type: "boolean",
      }),
      new TableColumn({
        name: "role",
        type: "enum",
        enum: ["user", "admin", "superadmin"],
        default: "'user'",
      }),
      new TableColumn({
        name: "updated_at",
        type: "timestamp",
        default: "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
      }),
    ]);
    
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("users", [
      "password",
      "is_active",
      "role",
      "updated_at",
    ]);
  }
}
