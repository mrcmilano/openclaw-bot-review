import { shouldHidePlatformChannel, getPlatformDisplayName } from '../../lib/platforms'

describe('Platform utilities', () => {
  describe('shouldHidePlatformChannel', () => {
    it('should return false for non-wechat-access channels', () => {
      const channels = { feishu: { enabled: true }, discord: { enabled: true } }

      expect(shouldHidePlatformChannel('feishu', channels)).toBe(false)
      expect(shouldHidePlatformChannel('discord', channels)).toBe(false)
    })

    it('should return false for wechat-access when wecom is not configured', () => {
      const channels = { feishu: { enabled: true } }

      expect(shouldHidePlatformChannel('wechat-access', channels)).toBe(false)
    })

    it('should return true for wechat-access when wecom is enabled', () => {
      const channels = {
        'wechat-access': { enabled: true },
        wecom: { enabled: true }
      }

      expect(shouldHidePlatformChannel('wechat-access', channels)).toBe(true)
    })

    it('should return false for wechat-access when wecom is disabled', () => {
      const channels = {
        'wechat-access': { enabled: true },
        wecom: { enabled: false }
      }

      expect(shouldHidePlatformChannel('wechat-access', channels)).toBe(false)
    })
  })

  describe('getPlatformDisplayName', () => {
    it('should return "wecom" for wechat-access channel', () => {
      expect(getPlatformDisplayName('wechat-access')).toBe('wecom')
    })

    it('should return channel name unchanged for other channels', () => {
      expect(getPlatformDisplayName('feishu')).toBe('feishu')
      expect(getPlatformDisplayName('discord')).toBe('discord')
      expect(getPlatformDisplayName('telegram')).toBe('telegram')
    })
  })
})