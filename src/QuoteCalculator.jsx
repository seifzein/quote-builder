import { useState } from "react"
import logo from "./logo.png" // Optional: replace with your actual logo path

function Card({ children }) {
  return <div className="bg-white rounded-2xl p-10 shadow-2xl border border-gray-100 transition hover:shadow-blue-200">{children}</div>
}

function CardContent({ children, className = "" }) {
  return <div className={`space-y-10 ${className}`}>{children}</div>
}

function Slider({ min, max, step, value, onValueChange }) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      className="w-full mt-2 accent-[#1a237e] hover:opacity-90 transition"
      onChange={(e) => onValueChange([Number(e.target.value)])}
    />
  )
}

function Label({ children, className = "" }) {
  return <label className={`block text-base font-semibold mb-1 text-[#0d47a1] ${className}`}>{children}</label>
}

const weights = {
  sector: 2.5,
  size: 2.5,
  purpose: 10,
  methodology: 25,
  data: 10,
  cooperation: 15,
  structure: 10,
  volatility: 2.5,
  plan: 20,
  sensitivity: 2.5,
}

const minFee = 1500
const maxFee = 10000

const questions = [
  {
    key: "sector",
    label: "Sector of Operation",
    icon: "🏭",
    levels: [
      "1 - Highly comparable sector with rich data",
      "2 - Moderately comparable with some adjustments",
      "3 - Limited comparables requiring broader benchmarking",
      "4 - Niche sector with scarce data",
      "5 - Emerging/unique sector with no comparables"
    ]
  },
  {
    key: "size",
    label: "Firm Size (No. of Employees)",
    icon: "👥",
    levels: [
      "1 - <50 employees, simple ops",
      "2 - 51–200 employees",
      "3 - 201–500, moderate structure",
      "4 - 501–1000, large and segmented",
      "5 - >1000, multinational complexity"
    ]
  },
  {
    key: "purpose",
    label: "Purpose of Valuation",
    icon: "📌",
    levels: [
      "1 - Internal decision-making",
      "2 - Tax or impairment reporting",
      "3 - Strategic planning",
      "4 - M&A (Buy/Sell side)",
      "5 - IPO or regulatory use"
    ]
  },
  {
    key: "methodology",
    label: "Valuation Methodology Used",
    icon: "📊",
    levels: [
      "1 - Multiples only",
      "2 - Simple DCF",
      "3 - DCF with adjustments",
      "4 - DCF + complex multiples",
      "5 - DCF + NAV + full suite"
    ]
  },
  {
    key: "data",
    label: "Data Availability & Quality",
    icon: "📁",
    levels: [
      "1 - Very poor, missing data",
      "2 - Sparse, high effort",
      "3 - Partially usable, moderate fixes",
      "4 - Mostly complete",
      "5 - Excellent, clean and organized"
    ]
  },
  {
    key: "cooperation",
    label: "Management Cooperation",
    icon: "🤝",
    levels: [
      "1 - Unresponsive",
      "2 - Poor communication",
      "3 - Some delays",
      "4 - Generally responsive",
      "5 - Proactive and helpful"
    ]
  },
  {
    key: "structure",
    label: "Complexity of Financial Structure",
    icon: "🏗️",
    levels: [
      "1 - No subsidiaries, clean",
      "2 - Simple subsidiaries",
      "3 - Multiple levels",
      "4 - Complex cross-holdings",
      "5 - Highly intricate structure"
    ]
  },
  {
    key: "volatility",
    label: "Industry Volatility",
    icon: "📉",
    levels: [
      "1 - Highly stable (e.g., utilities)",
      "2 - Predictable (e.g., staples)",
      "3 - Neutral cyclicality",
      "4 - Cyclical/volatile",
      "5 - Highly volatile/disruptive"
    ]
  },
  {
    key: "plan",
    label: "Availability of a Business Plan",
    icon: "📝",
    levels: [
      "1 - No plan, build from scratch",
      "2 - High-level targets only",
      "3 - Some assumptions, weak logic",
      "4 - Detailed plan with backup",
      "5 - Full plan + sensitivities"
    ]
  },
  {
    key: "sensitivity",
    label: "Level of Scenario Analysis",
    icon: "📈",
    levels: [
      "1 - None",
      "2 - Basic 1-2 variables",
      "3 - Few scenarios",
      "4 - Many inputs and paths",
      "5 - Advanced simulations"
    ]
  },
]

export default function QuoteCalculator() {
  const [scores, setScores] = useState(
    Object.fromEntries(questions.map((q) => [q.key, 3]))
  )

  const totalScore = questions.reduce((sum, q) => {
    const normalized = scores[q.key] / 5
    return sum + normalized * weights[q.key]
  }, 0)

  const fee = Math.round(minFee + (totalScore - 20) * 106.25)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8ebf0] to-[#f5f7fa] py-16 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <img src="/logo.png" alt="Moores Rowland" className="w-32 mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-[#1a237e] tracking-tight">
            Moores Rowland Pricing Tool
          </h1>
          <p className="text-sm text-gray-500 mt-2">Powered by Moores Rowland Egypt</p>
        </div>
        <Card>
          <CardContent>
            {questions.map((q) => (
              <div key={q.key} className="pb-6 border-b border-gray-100">
                <Label>
                  <span className="mr-2 text-lg">{q.icon}</span>
                  {q.label}: <span className="text-[#1a237e] font-bold">{scores[q.key]}</span>
                </Label>
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  value={scores[q.key]}
                  onValueChange={([val]) =>
                    setScores((prev) => ({ ...prev, [q.key]: val }))
                  }
                />
                <div className="text-sm text-gray-600 mt-1 italic">
                  {q.levels[scores[q.key] - 1]}
                </div>
              </div>
            ))}
            <div className="pt-10 text-center">
              <p className="text-lg font-medium text-gray-700">Total Weighted Score:</p>
              <p className="text-3xl font-bold text-[#1a237e]">{Math.round(totalScore * 10) / 10}</p>
              <p className="mt-4 text-lg font-medium text-gray-700">Estimated Quote:</p>
              <p className="text-5xl font-extrabold text-[#2e7d32]">${fee.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <footer className="mt-10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Moores Rowland Egypt · All Rights Reserved
        </footer>
      </div>
    </div>
  )
}
