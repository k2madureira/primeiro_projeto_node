import Redis, { Redis as RedisClient } from 'ioredis';
import ICacheProvider from '../models/ICashProvider';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis();
  }

  save(key: string, value: string): Promise<void> {}

  recover(key: string): Promise<string> {}

  invalidate(key: string): Promise<void> {}
}
