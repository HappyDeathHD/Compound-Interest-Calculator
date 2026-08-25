import React from 'react'

const InputField = ({ label, value, onChange, min, max, step, prefix, suffix, icon: Icon, formatNumber = false }) => {
  const formatWithCommas = (num) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const handleInputChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, '')
    onChange(parseFloat(rawValue) || 0)
  }

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
        {prefix && !Icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
            {prefix}
          </span>
        )}
        <input
          type="text"
          value={formatNumber ? formatWithCommas(value) : value}
          onChange={handleInputChange}
          className={`w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
            Icon ? 'pl-10' : prefix ? 'pl-8' : ''
          } ${suffix ? 'pr-16' : ''}`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium">
            {suffix}
          </span>
        )}
      </div>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        min={min}
        max={max}
        step={step}
        className="w-full mt-2 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
      />
    </div>
  )
}

export default InputField
