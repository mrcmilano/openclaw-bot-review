import { getOpenclawPackageCandidates } from '../../lib/openclaw-paths'
import os from 'os'

describe('OpenClaw paths', () => {
  const mockVersion = 'v18.0.0'
  const realHome = process.env.HOME

  beforeEach(() => {
    jest.clearAllMocks()
    process.env.OPENCLAW_PACKAGE_DIR = undefined
    process.env.APPDATA = undefined
    process.env.HOMEBREW_PREFIX = undefined
    process.env.npm_config_prefix = undefined
    process.env.PREFIX = undefined
  })

  afterAll(() => {
    if (realHome !== undefined) {
      process.env.HOME = realHome
    }
  })

  describe('getOpenclawPackageCandidates', () => {
    it('should include OPENCLAW_PACKAGE_DIR when set', () => {
      process.env.OPENCLAW_PACKAGE_DIR = '/custom/openclaw-pkg'
      const candidates = getOpenclawPackageCandidates(mockVersion)
      expect(candidates).toContain('/custom/openclaw-pkg')
    })

    it('should include homebrew prefix when set', () => {
      process.env.HOMEBREW_PREFIX = '/opt/homebrew'
      const candidates = getOpenclawPackageCandidates(mockVersion)
      expect(candidates).toContain('/opt/homebrew/lib/node_modules/openclaw')
    })

    it('should include npm prefix when set', () => {
      process.env.npm_config_prefix = '/usr/local'
      const candidates = getOpenclawPackageCandidates(mockVersion)
      expect(candidates).toContain('/usr/local/node_modules/openclaw')
    })

    it('should always include standard system paths', () => {
      const candidates = getOpenclawPackageCandidates(mockVersion)
      expect(candidates).toContain('/opt/homebrew/lib/node_modules/openclaw')
      expect(candidates).toContain('/usr/local/lib/node_modules/openclaw')
      expect(candidates).toContain('/usr/lib/node_modules/openclaw')
    })

    it('should return unique paths only', () => {
      const candidates = getOpenclawPackageCandidates(mockVersion)
      const unique = new Set(candidates)
      expect(candidates.length).toBe(unique.size)
    })

    it('should not contain empty or undefined values', () => {
      const candidates = getOpenclawPackageCandidates(mockVersion)
      expect(candidates.every(p => p && p.trim().length > 0)).toBe(true)
    })

    it('should handle missing environment variables', () => {
      const candidates = getOpenclawPackageCandidates(mockVersion)
      expect(candidates.length).toBeGreaterThan(0)
    })
  })
})
