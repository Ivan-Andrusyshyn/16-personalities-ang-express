//
class CacheService {
  private cache: { [key: string]: { data: any; timestamp: number } } = {};
  private cacheTTL = 8 * 60 * 60 * 1000;

  async getCache(key: string, fetchDataFn: () => Promise<any>) {
    const now = Date.now();

    if (this.cache[key] && now - this.cache[key].timestamp < this.cacheTTL) {
      return this.cache[key].data;
    }

    const data = await fetchDataFn();

    this.cache[key] = { data, timestamp: now };

    return data;
  }
}

const cacheService = new CacheService();

export default cacheService;
