import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddProducerColumn1697796069608 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "films",
      new TableColumn({ name: "producer", type: "varchar", length: "255" })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      "films",
      new TableColumn({ name: "producer", type: "varchar", length: "255" })
    );
  }
}
