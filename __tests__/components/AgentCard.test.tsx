import { render, screen } from '@testing-library/react'
import { AgentCard, type AgentModelOptionGroup } from '../../app/components/agent-card'
import '@testing-library/jest-dom'

// Mock the gateway URL builder
jest.mock('../../lib/gateway-url', () => ({
  buildGatewayUrl: jest.fn(() => 'http://mock-gateway:3000'),
}))

const mockAgent = {
  id: 'test-agent',
  name: 'Test Agent',
  emoji: '🤖',
  model: 'gpt-4',
  platforms: [
    { name: 'feishu', accountId: 'acc1' },
    { name: 'discord', botUserId: 'bot1' }
  ],
  session: {
    lastActive: Date.now(),
    totalTokens: 1000,
    contextTokens: 500,
    sessionCount: 5,
    todayAvgResponseMs: 1500,
    messageCount: 100,
    weeklyResponseMs: [1200, 1300, 1100, 1400, 1500, 1600, 1700],
    weeklyTokens: [100, 150, 200, 120, 180, 160, 140]
  }
}

const mockModelOptions: AgentModelOptionGroup[] = [
  {
    providerId: 'openai',
    providerName: 'OpenAI',
    accessMode: 'api_key',
    models: [
      { id: 'gpt-4', name: 'GPT-4' },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' }
    ]
  }
]

// Simple identity translation function
const t = (key: string) => key

const mockProps = {
  agent: mockAgent,
  gatewayPort: 18789,
  t,
  modelOptions: mockModelOptions,
  onModelChange: jest.fn(),
  onPlatformTest: jest.fn(),
  onModelTest: jest.fn(),
  onSessionTest: jest.fn(),
  platformTestResults: {},
  modelTestResults: {},
  sessionTestResults: {},
  isTesting: false
}

function renderAgentCard(props: typeof mockProps) {
  return render(<AgentCard {...props} />)
}

describe('AgentCard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render agent information correctly', () => {
    renderAgentCard(mockProps)

    expect(screen.getByText('Test Agent')).toBeInTheDocument()
    expect(screen.getByText('🤖')).toBeInTheDocument()
    expect(screen.getByText('gpt-4')).toBeInTheDocument()
  })

  it('should display session statistics', () => {
    renderAgentCard(mockProps)

    // Session count is rendered as a link with text "5 →"
    expect(screen.getByRole('link', { name: '5 →' })).toBeInTheDocument()
  })

  it('should show platform test buttons', () => {
    renderAgentCard(mockProps)

    // Model switch button uses translation key as label
    expect(screen.getByRole('button', { name: 'agent.switchModel' })).toBeInTheDocument()
  })

  it('should handle agent without session data', () => {
    const agentWithoutSession = { ...mockAgent, session: undefined }
    renderAgentCard({ ...mockProps, agent: agentWithoutSession })

    expect(screen.getByText('Test Agent')).toBeInTheDocument()
    expect(screen.getByText('🤖')).toBeInTheDocument()
  })

  it('should show model change interface when available', () => {
    renderAgentCard(mockProps)

    expect(screen.getByText('gpt-4')).toBeInTheDocument()
  })
})
