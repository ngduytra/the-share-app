import { useMemo } from 'react'

export enum State {
  Initialized = 'initialized',
  Accepted = 'confirmed',
  Canceled = 'canceled',
  Rejected = 'rejected',
}

type StatusTagProps = {
  status: State
}

type ColorConfigs = {
  background: string
  color: string
}

const STATUS_COLOR_PALETTE: Record<string, ColorConfigs> = {
  unpaid: {
    background: '#444444',
    color: '#EAF4F4',
  },
  cancellation: {
    background: '#fff',
    color: '#DB4646',
  },
  completed: {
    background: '#fff',
    color: '#1EAF6A',
  },
  shipping: {
    background: '#252C47',
    color: '#2F6CE4',
  },
  toShip: {
    background: '#2D2818',
    color: '#D7A647',
  },
}

const StatusTag = ({ status }: StatusTagProps) => {
  const color_configs: ColorConfigs = useMemo(() => {
    switch (status) {
      case State.Rejected:
        return STATUS_COLOR_PALETTE.cancellation
      case State.Canceled:
        return STATUS_COLOR_PALETTE.cancellation
      case State.Accepted:
        return STATUS_COLOR_PALETTE.completed
      default:
        return STATUS_COLOR_PALETTE.unpaid
    }
  }, [status])

  return (
    <div
      style={{
        background: color_configs.background,
        color: color_configs.color,
        borderRadius: 28,
        border: `1px solid ${color_configs.color}`,
        padding: '4px 10px',
        minWidth: 90,
        textAlign: 'center',
      }}
    >
      {status}
    </div>
  )
}

export default StatusTag
