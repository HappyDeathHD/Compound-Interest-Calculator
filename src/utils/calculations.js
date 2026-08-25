/**
 * Calculate compound interest
 * Formula: A = P(1 + r/n)^(nt)
 * Where:
 * A = Final amount
 * P = Principal (initial amount)
 * r = Annual interest rate (decimal)
 * n = Number of times interest is compounded per year
 * t = Time in years
 */
export const calculateCompoundInterest = (principal, rate, time, frequency) => {
  const r = rate / 100 // Convert percentage to decimal
  const n = frequency
  const t = time

  // Calculate total amount
  const totalAmount = principal * Math.pow(1 + r / n, n * t)

  // Calculate total interest earned
  const totalInterest = totalAmount - principal

  return {
    totalAmount,
    totalInterest,
    principal,
  }
}

/**
 * Generate data points for the chart
 * Creates yearly snapshots of the investment growth
 */
export const generateChartData = (principal, rate, time, frequency) => {
  const data = []
  const r = rate / 100
  const n = frequency

  // Generate data for each year
  for (let year = 0; year <= time; year++) {
    const totalAmount = principal * Math.pow(1 + r / n, n * year)

    data.push({
      year,
      total: Math.round(totalAmount * 100) / 100,
      principal: principal,
      interest: Math.round((totalAmount - principal) * 100) / 100,
    })
  }

  return data
}

/**
 * Calculate effective annual rate (EAR)
 * Takes into account the effect of compounding
 */
export const calculateEffectiveRate = (rate, frequency) => {
  const r = rate / 100
  const n = frequency

  return (Math.pow(1 + r / n, n) - 1) * 100
}
