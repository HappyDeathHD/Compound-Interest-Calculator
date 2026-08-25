# Compound Interest Calculator

A modern, sleek, and highly user-friendly React application for calculating compound interest on loans and investments.

## Features

- **Real-time Calculations**: Results update instantly as you adjust the inputs
- **Beautiful Visualizations**: Interactive area chart showing growth over time
- **Multiple Compounding Frequencies**: Daily, Monthly, Quarterly, and Annual options
- **Detailed Breakdown**: View effective annual rate, total compounds, and interest ratios
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Modern UI**: Clean SaaS-style aesthetic with Tailwind CSS

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Composable charting library
- **Lucide React** - Beautiful icon set

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Initial Principal**: Enter the starting amount of your loan or investment
2. **Annual Interest Rate**: Set the yearly interest rate percentage
3. **Time Period**: Choose how many years to calculate
4. **Compounding Frequency**: Select how often interest is compounded

The calculator will instantly show:
- Total balance after the time period
- Total interest earned/paid
- Visual growth chart
- Detailed breakdown including effective annual rate

## Project Structure

```
src/
├── components/
│   ├── CompoundInterestChart.jsx  # Recharts visualization
│   ├── InputField.jsx              # Reusable input with slider
│   └── ResultCard.jsx              # Display card for results
├── utils/
│   └── calculations.js             # Compound interest formulas
├── App.jsx                         # Main application component
├── main.jsx                        # React entry point
└── index.css                       # Global styles & Tailwind
```

## Formula

The compound interest formula used:

```
A = P(1 + r/n)^(nt)

Where:
A = Final amount
P = Principal (initial amount)
r = Annual interest rate (decimal)
n = Number of times interest is compounded per year
t = Time in years
```

## License

MIT
