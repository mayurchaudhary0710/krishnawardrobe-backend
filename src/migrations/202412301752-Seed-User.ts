import { ROLE } from "@constants";
import { QueryInterface } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export const up = async ({ context }: { context: QueryInterface }) => {
  try {
    await context.bulkInsert("users", [
      {
        id: uuidv4(),
        email: "sanjay@gmail.com",
        password:
          "$2a$10$59vTQ0guSC4TvRfp8X/nPeF3eIsuCUu3ncPwvyJOm6TFpbczofZUq",
        name: "Sanjay",
        phoneNumber: "9320901977",
        roleName: ROLE.ADMIN,
        createdAt: new Date(),
      },
      {
        id: uuidv4(),
        email: "bharat.n@gmail.com",
        password:
          "$2a$10$59vTQ0guSC4TvRfp8X/nPeF3eIsuCUu3ncPwvyJOm6TFpbczofZUq",
        name: "bharat",
        phoneNumber: "9320901976",
        roleName: ROLE.USER,
        createdAt: new Date(),
      },
    ]);
  } catch (error) {
    throw error;
  }
};

export const down = async ({ context }: { context: QueryInterface }) => {
  // Undo migration logic
};
