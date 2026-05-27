// @ts-ignore
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as argon2 from 'argon2';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('DATABASE_URL is not set. Please check your .env file.');
  throw new Error('DATABASE_URL is not set');
}

const pool = new Pool({ connectionString: databaseUrl });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    // Hash passwords
    const password1Hash = await argon2.hash('password123');
    const password2Hash = await argon2.hash('password123');

    const testUsers = [
      {
        email: 'sowmyasniyer@gmail.com',
        auth0Id: 'user1',
        name: 'Sowmya Sharath',
        password: password1Hash,
      },
      {
        email: 'sharathnatraj@gmail.com',
        auth0Id: 'user2',
        name: 'Sharath Nataraj',
        password: password2Hash,
      },
    ];

    for (const userData of testUsers) {
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (existingUser) {
        await prisma.user.update({
          where: { email: userData.email },
          data: { password: userData.password },
        });
        console.log(`User exists: ${userData.email} (password updated)`);
      } else {
        const newUser = await prisma.user.create({
          data: userData,
        });
        console.log(`User created: ${newUser.email}`);
      }
    }

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
