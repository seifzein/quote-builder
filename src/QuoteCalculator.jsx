import { useState } from "react"

function Card({ children }) {
  return <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">{children}</div>
}

function CardContent({ children, className = "" }) {
  return <div className={`space-y-6 ${className}`}>{children}</div>
}

function Slider({ min, max, step, value, onValueChange }) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      className="w-full mt-2 accent-[#1a237e]"
      onChange={(e) => onValueChange([Number(e.target.value)])}
    />
  )
}

function Label({ children, className = "" }) {
  return <label className={`block text-sm font-medium mb-1 text-gray-800 ${className}`}>{children}</label>
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
    <div className="min-h-screen bg-[#f5f7fa] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-[#1a237e]">
          Moores Rowland Egypt — Quote Builder
        </h1>
        <Card>
          <CardContent>
            {questions.map((q) => (
              <div key={q.key}>
                <Label className="text-[#0d47a1]">
                  {q.label}: <span className="text-[#1a237e] font-semibold">{scores[q.key]}</span>
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
                <div className="text-sm text-gray-600 mt-1">
                  {q.levels[scores[q.key] - 1]}
                </div>
              </div>
            ))}
            <div className="pt-6 border-t border-gray-200">
              <p className="text-lg font-medium text-gray-700">
                Total Weighted Score: {Math.round(totalScore * 10) / 10}
              </p>
              <p className="text-3xl font-bold text-[#2e7d32] mt-2">
                Proposed Fee: ${fee.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
