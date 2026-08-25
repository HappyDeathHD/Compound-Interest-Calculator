import React, { useState, useMemo } from 'react'
import { TrendingUp, DollarSign, Percent, Calendar, Calculator } from 'lucide-react'
import CompoundInterestChart from './components/CompoundInterestChart'
import InputField from './components/InputField'
import ResultCard from './components/ResultCard'
import { calculateCompoundInterest, generateChartData } from './utils/calculations'

function App() {
  const [principal, setPrincipal] = useState(10000)
  const [rate, setRate] = useState(5)
  const [time, setTime] = useState(10)
  const [frequency, setFrequency] = useState(12) // Monthly by default

  const frequencyOptions = [
    { label: 'Daily', value: 365 },
    { label: 'Monthly', value: 12 },
    { label: 'Quarterly', value: 4 },
    { label: 'Annually', value: 1 },
  ]

  // Calculate results in real-time
  const results = useMemo(() => {
    return calculateCompoundInterest(principal, rate, time, frequency)
  }, [principal, rate, time, frequency])

  // Generate chart data
  const chartData = useMemo(() => {
    return generateChartData(principal, rate, time, frequency)
  }, [principal, rate, time, frequency])

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-indigo-600 p-3 rounded-2xl">
              <Calculator className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Compound Interest Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate your investment growth with precision. Watch your money compound over time.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Inputs */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-indigo-600" />
                Input Parameters
              </h2>

              <div className="space-y-5">
                <InputField
                  label="Initial Principal"
                  value={principal}
                  onChange={setPrincipal}
                  min={0}
                  max={10000000}
                  step={1000}
                  prefix="$"
                  icon={DollarSign}
                  formatNumber={true}
                />

                <InputField
                  label="Annual Interest Rate"
                  value={rate}
                  onChange={setRate}
                  min={0}
                  max={100}
                  step={0.1}
                  suffix="%"
                  icon={Percent}
                />

                <InputField
                  label="Time Period"
                  value={time}
                  onChange={setTime}
                  min={1}
                  max={50}
                  step={1}
                  suffix="years"
                  icon={Calendar}
                />

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Compounding Frequency
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {frequencyOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFrequency(option.value)}
                        className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                          frequency === option.value
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl shadow-sm p-6 text-white">
              <h3 className="text-sm font-medium text-indigo-200 mb-2">Growth Rate</h3>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">
                  {((results.totalInterest / results.principal) * 100).toFixed(1)}%
                </span>
                <span className="ml-2 text-indigo-200">total return</span>
              </div>
              <div className="mt-4 pt-4 border-t border-indigo-500">
                <p className="text-sm text-indigo-200">
                  Your investment will grow by{' '}
                  <span className="font-semibold text-white">
                    {formatCurrency(results.totalInterest)}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Results & Chart */}
          <div className="lg:col-span-2 space-y-6">
            {/* Result Cards */}
            <div className="grid sm:grid-cols-3 gap-4">
              <ResultCard
                label="Total Balance"
                value={formatCurrency(results.totalAmount)}
                icon={TrendingUp}
                color="indigo"
              />
              <ResultCard
                label="Total Interest"
                value={formatCurrency(results.totalInterest)}
                icon={Percent}
                color="emerald"
              />
              <ResultCard
                label="Principal"
                value={formatCurrency(results.principal)}
                icon={DollarSign}
                color="slate"
              />
            </div>

            {/* Chart */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">
                Growth Over Time
              </h2>
              <CompoundInterestChart data={chartData} />
            </div>

            {/* Breakdown Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">
                Detailed Breakdown
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600">Compounding Period</span>
                  <span className="font-semibold text-slate-900">
                    {frequencyOptions.find(f => f.value === frequency)?.label}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600">Total Compounds</span>
                  <span className="font-semibold text-slate-900">
                    {frequency * time} times
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600">Effective Annual Rate</span>
                  <span className="font-semibold text-slate-900">
                    {(((1 + rate / 100 / frequency) ** frequency - 1) * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-slate-600">Interest-to-Principal Ratio</span>
                  <span className="font-semibold text-slate-900">
                    {(results.totalInterest / results.principal).toFixed(2)}x
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-slate-500">
          <p>Calculate compound interest with precision • Built with React & Tailwind CSS</p>
        </div>
      </div>
    </div>
  )
}

export default App
