import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './prisma/generated/client';

export class Database {
  private client: PrismaClient;

  constructor() {
    this.client = this.createClient();
  }

  public getConnection() {
    return this.client;
  }

  private createClient() {
    const connectionString = `${process.env.DATABASE_URL}`;
    const adapter = new PrismaPg({ connectionString });
    const client = new PrismaClient({ adapter });
    return client;
  }

  public async connect() {
    await this.client.$connect();
  }

  public async disconnect() {
    await this.client.$disconnect();
  }
}
