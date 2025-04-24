import * as  moment from "moment";

const createMigration = async () => {
  const name = process.argv[2];
  if (!name) {
    console.error("Please specify a migration name.");
    process.exit(1);
  }

  const filePath = `src/migrations/${moment(new Date()).format("YYYYMMDDHHmmss")}-${name}.ts`;
  const content = `
import { QueryInterface } from 'sequelize';

export const up = async ({ context }: { context: QueryInterface }) => {
  // Migration logic
};

export const down = async ({ context }: { context: QueryInterface }) => {
  // Undo migration logic
};
  `;

  require("fs").writeFileSync(filePath, content.trim());
  console.log(`Migration created: ${filePath}`);
};

createMigration();
