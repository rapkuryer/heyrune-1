import cn from 'clsx'
import { useEffect, useState } from 'react'
import s from './docs-widgets.module.scss'

export const StatsGrid = ({ stats }) => (
  <ul className={s.stats}>
    {stats.map(({ label, value }) => (
      <li key={label} className={s.stat}>
        <p className={cn('p-xs', s.statLabel)}>{label}</p>
        <p className={cn('p', s.statValue)}>{value}</p>
      </li>
    ))}
  </ul>
)

export const FlashblocksWidget = () => {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % 10)
    }, 200)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className={s.flashblocks}>
      <div className={s.flashRow}>
        {Array.from({ length: 10 }).map((_, index) => (
          <span
            key={index}
            className={cn(s.flash, index <= active && s.flashActive)}
          />
        ))}
      </div>
      <p className={cn('p-xs', s.caption)}>
        10 flashblocks × 200ms = ~1 standard block · live simulation
      </p>
    </div>
  )
}

export const X402Flow = ({ steps }) => {
  const [active, setActive] = useState(0)

  return (
    <div className={s.flow}>
      <div className={s.flowSteps}>
        {steps.map(({ label }, index) => (
          <button
            key={label}
            type="button"
            className={cn(s.flowStep, index === active && s.flowStepActive)}
            onClick={() => setActive(index)}
          >
            <span className={cn('p-xs', s.flowIndex)}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className={cn('h4', s.flowLabel)}>{label}</span>
          </button>
        ))}
      </div>
      <p className={cn('p', s.flowDetail)}>{steps[active].detail}</p>
    </div>
  )
}

export const WalletCompare = ({ compare }) => (
  <div className={s.compare}>
    {compare.map(({ title, items }) => (
      <div key={title} className={s.compareCol}>
        <p className={cn('h4', s.compareTitle)}>{title}</p>
        <ul className={s.compareList}>
          {items.map((item) => (
            <li key={item} className="p">
              {item}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
)

export const ProtocolTable = ({ protocols }) => (
  <div className={s.table}>
    {protocols.map(({ name, category, fact }) => (
      <div key={name} className={s.tableRow}>
        <div>
          <p className={cn('h4', s.tableName)}>{name}</p>
          <p className={cn('p-xs', s.tableCategory)}>{category}</p>
        </div>
        <p className={cn('p', s.tableFact)}>{fact}</p>
      </div>
    ))}
  </div>
)

export const GasCalculator = () => {
  const [txCount, setTxCount] = useState(100)
  const l1Cost = (txCount * 2.5).toFixed(2)
  const baseCost = (txCount * 0.002).toFixed(3)

  return (
    <div className={s.calculator}>
      <label className={cn('p-xs', s.calculatorLabel)} htmlFor="tx-count">
        Number of transactions
      </label>
      <input
        id="tx-count"
        className={s.calculatorInput}
        type="range"
        min="1"
        max="1000"
        step="1"
        value={txCount}
        onChange={(e) => setTxCount(Number(e.target.value))}
      />
      <p className={cn('p-xs', s.calculatorValue)}>{txCount} txs</p>
      <div className={s.calculatorResults}>
        <div className={s.calculatorResult}>
          <p className={cn('p-xs', s.calculatorChain)}>Ethereum L1</p>
          <p className={cn('h4', s.calculatorPrice)}>${l1Cost}</p>
        </div>
        <div className={cn(s.calculatorResult, s.calculatorResultAccent)}>
          <p className={cn('p-xs', s.calculatorChain)}>Base</p>
          <p className={cn('h4', s.calculatorPrice)}>${baseCost}</p>
        </div>
      </div>
      <p className={cn('p-xs', s.caption)}>
        Illustrative averages · actual fees vary by network conditions
      </p>
    </div>
  )
}

export const DocSectionContent = ({ section }) => {
  switch (section.type) {
    case 'flashblocks':
      return (
        <>
          <FlashblocksWidget />
          <StatsGrid stats={section.stats} />
        </>
      )
    case 'x402':
      return <X402Flow steps={section.steps} />
    case 'wallet-compare':
      return <WalletCompare compare={section.compare} />
    case 'protocols':
      return <ProtocolTable protocols={section.protocols} />
    case 'stats':
      return <StatsGrid stats={section.stats} />
    case 'gas-calculator':
      return <GasCalculator />
    default:
      return null
  }
}
