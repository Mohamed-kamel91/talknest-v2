import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './prisma/generated/client';
import './loadEnv';


export interface IDatabase {
  getClient(): PrismaClient;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

export class PrismaDatabase implements IDatabase {
  private client: PrismaClient;

  constructor() {
    this.client = this.createClient();
  }

  public getClient() {
    return this.client;
  }

  private createClient() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error('DATABASE_URL is not set.');
    }

    const adapter = new PrismaPg({ connectionString });
    const client = new PrismaClient({ adapter });
    return client;
  }

  public async connect() {
    console.log('Starting the database connection...');
    await this.client.$connect();
    console.log('Connected to the prisma database');
  }

  public async disconnect() {
    await this.client.$disconnect();
  }
}
