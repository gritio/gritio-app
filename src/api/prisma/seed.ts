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

    // User 1: Sowmya Sharath
    const user1 = await prisma.user.upsert({
      where: { email: 'sowmyasniyer@gmail.com' },
      update: { auth0Id: 'user1', name: 'Sowmya Sharath', password: password1Hash },
      create: {
        email: 'sowmyasniyer@gmail.com',
        auth0Id: 'user1',
        name: 'Sowmya Sharath',
        password: password1Hash,
      },
    });

    console.log('User 1 created or updated:', user1.email);

    // User 2: Sharath Nataraj
    const user2 = await prisma.user.upsert({
      where: { email: 'sharathnatraj@gmail.com' },
      update: { auth0Id: 'user2', name: 'Sharath Nataraj', password: password2Hash },
      create: {
        email: 'sharathnatraj@gmail.com',
        auth0Id: 'user2',
        name: 'Sharath Nataraj',
        password: password2Hash,
      },
    });

    console.log('User 2 created or updated:', user2.email);
    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
