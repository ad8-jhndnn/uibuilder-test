import clsx from 'clsx'
import {
  FilterIcon,
  filterTypeKeys,
  getIconSymbol,
  type FilterType,
  type GraphFilter
} from 'dsssp'
import { useMemo, useState } from 'react'
import 'dsssp/font'

//import SelectArrowIcon from '../../assets/select-arrow.svg?react'

const isSafari = () => {
  const ua = navigator.userAgent
  return (
    !ua.includes('Chrome') &&
    !ua.includes('Chromium') &&
    (ua.includes('Safari') || /iPad|iPhone|iPod/.test(ua))
  )
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const getLabelName = (type: FilterType) => {
  return capitalize(type.toLowerCase())
    .replace(/([wh])shelf/, '$1 Shelf')
    .replace(/([wh])pass/, '$1 Pass')
    .replace(/1/g, ' ¹')
    .replace(/2/g, ' ²')
}

const FilterSelect = ({
  color,
  filter,
  disabled,
  onChange
}: {
  color?: string
  filter: GraphFilter
  disabled: boolean
  onChange: (type: FilterType) => void
}) => {
  const [opened, setOpened] = useState<boolean>(false)
  // temporary solution to hide broken dsssp icons from dropdowns
  const safariBrowser = useMemo(() => isSafari(), [])

  return (
    <div
      className={clsx('transition-opacity duration-150', {
        'opacity-50 pointer-events-none': disabled
      })}
    >
      <div className="font-semibold text-sm text-zinc-500 z-10 relative">
        Type
      </div>

      <div className="relative py-1 select-none text-zinc-500 hover:text-zinc-300 ">
        <select
          value={filter.type}
          onBlur={() => setOpened(false)}
          onFocus={() => setOpened(true)}
          onMouseDown={() => setOpened(true)}
          onChange={(e) => {
            setOpened(false)
            onChange(e.target.value as FilterType)
          }}
          className="bg-transparent text-transparent appearance-none w-[130px] h-full px-1 cursor-pointer focus:outline-none focus:ring-0"
        >
          {filterTypeKeys.map((type: FilterType) => (
            <option
              key={type}
              value={type}
              className="bg-zinc-950 active:bg-blue-400 text-white text-sm font-[dsssp,sans-serif]"
              dangerouslySetInnerHTML={{
                __html: `&nbsp;${safariBrowser ? '' : getIconSymbol(type)} ${getLabelName(type)}&nbsp;`
              }}
            ></option>
          ))}
        </select>
        <div
          className={clsx(
            'absolute top-1/2 right-7 transform -translate-y-1/2 pointer-events-none z-10',
            { 'text-sky-500': opened }
          )}
        >
          {/* <SelectArrowIcon className="w-3 h-3" /> */}
        </div>
        <div className="p-1 absolute -top-1 left-1/2 -translate-x-1/2 pointer-events-none">
          <div
            className="absolute rounded-full -inset-8"
            style={{
              background: `radial-gradient(circle, ${color}20 0%, ${color}08 20%, transparent 70%)`
            }}
          />
          <FilterIcon
            size={32}
            color={color}
            filter={filter}
            className="relative z-10"
            style={{
              textShadow: opened ? `${color} 0 0 12px` : `${color}80 0 0 8px`
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default FilterSelect