import { getConfigCache, setConfigCache, clearConfigCache } from '../../lib/config-cache'

describe('Config cache', () => {
  beforeEach(() => {
    clearConfigCache()
  })

  describe('getConfigCache', () => {
    it('should return null when no cache is set', () => {
      const result = getConfigCache()
      expect(result).toBeNull()
    })

    it('should return cached data when cache is set', () => {
      const testData = { agents: [], providers: [] }
      const cacheEntry = { data: testData, ts: Date.now() }

      setConfigCache(cacheEntry)
      const result = getConfigCache()

      expect(result).toEqual(cacheEntry)
    })
  })

  describe('setConfigCache', () => {
    it('should store cache entry', () => {
      const testData = { agents: [{ id: 'test' }] }
      const cacheEntry = { data: testData, ts: 1234567890 }

      setConfigCache(cacheEntry)
      const result = getConfigCache()

      expect(result).toEqual(cacheEntry)
    })

    it('should overwrite existing cache', () => {
      const firstData = { agents: [{ id: 'first' }] }
      const secondData = { agents: [{ id: 'second' }] }

      setConfigCache({ data: firstData, ts: 1000 })
      setConfigCache({ data: secondData, ts: 2000 })

      const result = getConfigCache()
      expect(result?.data).toEqual(secondData)
      expect(result?.ts).toBe(2000)
    })
  })

  describe('clearConfigCache', () => {
    it('should clear the cache', () => {
      const testData = { agents: [] }
      setConfigCache({ data: testData, ts: Date.now() })

      expect(getConfigCache()).not.toBeNull()

      clearConfigCache()

      expect(getConfigCache()).toBeNull()
    })
  })
})