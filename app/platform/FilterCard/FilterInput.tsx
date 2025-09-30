import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import type React from 'react'

const FilterInput = ({
  value,
  min = -Infinity,
  max = Infinity,
  onChange,
  prefix,
  suffix,
  label,
  disabled,
  precision = 1
}: {
  value: number
  min?: number
  max?: number
  onChange?: (value: number) => void
  prefix?: string
  suffix?: string
  label?: string
  disabled?: boolean
  precision?: number
}) => {
  const oldValue = useRef<number>(value)
  const [inputValue, setInputValue] = useState<string>(value.toFixed(precision))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const validateInput = () => {
    const num = Number(inputValue)
    if (!isNaN(num)) {
      const sanitized = Math.min(Math.max(Number(num), min), max)
      if (sanitized !== oldValue.current) {
        setInputValue(sanitized.toFixed(precision))
        onChange?.(sanitized)
        oldValue.current = sanitized
      }
    }
  }

  const handleBlur = () => {
    validateInput()
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') validateInput()
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select()
    oldValue.current = Number(inputValue)
  }

  useEffect(() => {
    setInputValue(value.toFixed(precision))
  }, [value])

  return (
    <div
      className={clsx('flex flex-col transition-opacity duration-150', {
        'opacity-50 pointer-events-none': disabled
      })}
    >
      {label && (
        <label className="mb-1 text-sm font-semibold text-zinc-500 drop-shadow-lg">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="number"
          min={min}
          max={max}
          step={precision === 0 ? 1 : 0.1}
          value={disabled ? '' : inputValue}
          onFocus={handleFocus}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
          className={clsx(
            'appearance-none [&::-webkit-inner-spin-button]:appearance-none block w-full text-center shadow-md bg-zinc-950 text-white border border-zinc-700 rounded-sm py-0.5 focus:outline-none focus:ring-sky-500 focus:border-sky-500',
            { 'pl-10': prefix },
            { 'pr-8': suffix }
          )}
        />

        {suffix && (
          <span className="absolute top-[1px] right-[1px] bottom-[1px] flex items-center px-2 pointer-events-none rounded-r-sm text-zinc-500 text-sm text-center bg-zinc-900 border-l border-zinc-800 bg-opacity-80">
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

export default FilterInput