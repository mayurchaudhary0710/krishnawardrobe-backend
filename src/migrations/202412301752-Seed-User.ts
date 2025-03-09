import { ROLE } from '@constants';
import { QueryInterface } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export const up = async ({ context }: { context: QueryInterface }) => {
  try {
    await context.bulkInsert('users', [
      {
        id: uuidv4(),
        email: 'sanjaynagar071@gmail.com',
        password:
          '$2a$10$59vTQ0guSC4TvRfp8X/nPeF3eIsuCUu3ncPwvyJOm6TFpbczofZUq',
        name: 'Sanjay',
        phoneNumber: '',
        roleName: ROLE.ADMIN,
        createdAt: new Date(),
      },
      {
        id: uuidv4(),
        email: 'mayur@gmail.com',
        password:
          '$2a$10$59vTQ0guSC4TvRfp8X/nPeF3eIsuCUu3ncPwvyJOm6TFpbczofZUq',
        name: 'Mayur',
        phoneNumber: '',
        roleName: ROLE.ADMIN,
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
