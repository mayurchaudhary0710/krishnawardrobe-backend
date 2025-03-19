import { ROLE } from '../constants/enums';
import { QueryInterface } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export const up = async ({ context }: { context: QueryInterface }) => {
  try {
    await context.bulkInsert('users', [
      {
        id: uuidv4(),
        email: 'sanjaynagar071@gmail.com',
        password:
          '$2a$10$gNe.TSB3zgsbvFaykYsDgOg7nE7GTTTyAgeLon1.Lyu.UsTsla7de',
        name: 'Sanjay',
        phoneNumber: '6942069420',
        roleName: ROLE.ADMIN,
        createdAt: new Date(),
      },
      {
        id: uuidv4(),
        email: 'mayur@gmail.com',
        password: '$2a$10$gNe.TSB3zgsbvFaykYsDgOg7nE7GTTTyAgeLon1.Lyu.UsTsla7de',
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
