import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'

const CompoundInterestChart = ({ data }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-3 rounded-lg shadow-lg border border-slate-200">
          <p className="text-sm font-semibold text-slate-900 mb-2">Year {label}</p>
          <div className="space-y-1">
            <p className="text-sm text-indigo-600 font-medium">
              Total: {formatCurrency(payload[0].value)}
            </p>
            <p className="text-sm text-slate-600">
              Principal: {formatCurrency(payload[1].value)}
            </p>
            <p className="text-sm text-emerald-600 font-medium">
              Interest: {formatCurrency(payload[0].value - payload[1].value)}
            </p>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#64748b" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#64748b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="year"
            stroke="#64748b"
            style={{ fontSize: '12px' }}
            label={{ value: 'Years', position: 'insideBottom', offset: -5, style: { fill: '#64748b' } }}
          />
          <YAxis
            stroke="#64748b"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '14px', paddingTop: '20px' }}
            iconType="circle"
          />
          <Area
            type="monotone"
            dataKey="principal"
            stroke="#64748b"
            strokeWidth={2}
            fill="url(#colorPrincipal)"
            name="Principal"
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#4f46e5"
            strokeWidth={3}
            fill="url(#colorTotal)"
            name="Total Amount"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CompoundInterestChart
