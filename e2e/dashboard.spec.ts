import { test, expect } from '@playwright/test'

test.describe('OpenClaw Dashboard', () => {
  test('should load the dashboard page', async ({ page }) => {
    // Skip auth for this test by setting the environment variable
    // In a real scenario, you'd handle authentication properly
    await page.goto('/')

    // Wait for the page to load
    await page.waitForLoadState('networkidle')

    // Check if the page title is correct
    await expect(page).toHaveTitle(/OpenClaw Bot Dashboard/)
  })

  test('should display agent cards when data is available', async ({ page }) => {
    await page.goto('/')

    // Mock the config API response
    await page.route('/api/config', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          agents: [
            {
              id: 'test-agent',
              name: 'Test Agent',
              emoji: '🤖',
              model: 'gpt-4',
              platforms: [{ name: 'feishu' }],
              session: {
                lastActive: Date.now(),
                totalTokens: 1000,
                sessionCount: 5,
                todayAvgResponseMs: 1500
              }
            }
          ],
          providers: [],
          defaults: { model: 'gpt-4', fallbacks: [] },
          gateway: { port: 18789 }
        })
      })
    })

    await page.reload()

    // Check if agent card is displayed
    await expect(page.locator('text=Test Agent')).toBeVisible()
    await expect(page.locator('text=🤖')).toBeVisible()
    await expect(page.locator('text=gpt-4')).toBeVisible()
  })

  test('should navigate to models page', async ({ page }) => {
    await page.goto('/')

    // Click on models navigation (assuming it exists)
    // This test may need to be adjusted based on the actual navigation structure
    await page.goto('/models')

    // Check if we're on the models page
    await expect(page.locator('text=OpenClaw Model List')).toBeVisible()
  })

  test('should handle API errors gracefully', async ({ page }) => {
    await page.goto('/')

    // Mock a failed API response
    await page.route('/api/config', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal server error' })
      })
    })

    await page.reload()

    // The page should still load, possibly showing an error state
    // This test verifies the app doesn't crash on API errors
    await expect(page.locator('body')).toBeVisible()
  })
})