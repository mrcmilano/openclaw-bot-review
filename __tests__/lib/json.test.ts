import { stripUtf8Bom, parseJsonText, readJsonFileSync } from '../../lib/json'
import fs from 'fs'

jest.mock('fs', () => ({
  readFileSync: jest.fn(),
}))

describe('JSON utilities', () => {
  describe('stripUtf8Bom', () => {
    it('should remove UTF-8 BOM from the beginning of string', () => {
      const input = '\uFEFF{"test": "value"}'
      const result = stripUtf8Bom(input)
      expect(result).toBe('{"test": "value"}')
    })

    it('should return string unchanged if no BOM', () => {
      const input = '{"test": "value"}'
      const result = stripUtf8Bom(input)
      expect(result).toBe('{"test": "value"}')
    })
  })

  describe('parseJsonText', () => {
    it('should parse JSON with BOM', () => {
      const input = '\uFEFF{"test": "value"}'
      const result = parseJsonText(input)
      expect(result).toEqual({ test: 'value' })
    })

    it('should parse normal JSON', () => {
      const input = '{"test": "value"}'
      const result = parseJsonText(input)
      expect(result).toEqual({ test: 'value' })
    })
  })

  describe('readJsonFileSync', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should read and parse JSON file with BOM', () => {
      const mockContent = '\uFEFF{"test": "value"}'
      ;(fs.readFileSync as jest.Mock).mockReturnValue(mockContent)

      const result = readJsonFileSync('test.json')
      expect(fs.readFileSync).toHaveBeenCalledWith('test.json', 'utf-8')
      expect(result).toEqual({ test: 'value' })
    })

    it('should read and parse normal JSON file', () => {
      const mockContent = '{"test": "value"}'
      ;(fs.readFileSync as jest.Mock).mockReturnValue(mockContent)

      const result = readJsonFileSync('test.json')
      expect(result).toEqual({ test: 'value' })
    })
  })
})