import { useState } from "react"
import logo from "./logo.png"

function Card({ children }) {
  return <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-200 transition hover:shadow-2xl">{children}</div>
}

function CardContent({ children, className = "" }) {
  return <div className={`space-y-12 ${className}`}>{children}</div>
}

function Slider({ min, max, step, value, onValueChange }) {
  return (
    <input
      type="range"
      min={min}
      max={5}
      step={1}
      value={value}
      className="w-full h-2 rounded-lg appearance-none bg-gray-300 accent-[#1a237e] hover:accent-[#0d47a1] transition"
      onChange={(e) => onValueChange([Number(e.target.value)])}
    />
  )
}

function Label({ children, className = "" }) {
  return <label className={`block text-lg font-semibold mb-1 text-[#0d47a1] ${className}`}>{children}</label>
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
  { key: "sector", label: "Sector of Operation", icon: "🏭", levels: ["1 - Highly comparable sector with rich data", "2 - Moderately comparable with some adjustments", "3 - Limited comparables requiring broader benchmarking", "4 - Niche sector with scarce data", "5 - Emerging/unique sector with no comparables"] },
  { key: "size", label: "Firm Size (No. of Employees)", icon: "👥", levels: ["1 - <50 employees, simple ops", "2 - 51–200 employees", "3 - 201–500, moderate structure", "4 - 501–1000, large and segmented", ">1000, multinational complexity"] },
  { key: "purpose", label: "Purpose of Valuation", icon: "📌", levels: ["1 - Internal decision-making", "2 - Tax or impairment reporting", "3 - Strategic planning", "4 - M&A (Buy/Sell side)", "5 - IPO or regulatory use"] },
  { key: "methodology", label: "Valuation Methodology Used", icon: "📊", levels: ["1 - Multiples only", "2 - Simple DCF", "3 - DCF with adjustments", "4 - DCF + complex multiples", "5 - DCF + NAV + full suite"] },
  { key: "data", label: "Data Availability & Quality", icon: "📁", levels: ["1 - Very poor, missing data", "2 - Sparse, high effort", "3 - Partially usable, moderate fixes", "4 - Mostly complete", "5 - Excellent, clean and organized"] },
  { key: "cooperation", label: "Management Cooperation", icon: "🤝", levels: ["1 - Unresponsive", "2 - Poor communication", "3 - Some delays", "4 - Generally responsive", "5 - Proactive and helpful"] },
  { key: "structure", label: "Complexity of Financial Structure", icon: "🏗️", levels: ["1 - No subsidiaries, clean", "2 - Simple subsidiaries", "3 - Multiple levels", "4 - Complex cross-holdings", "5 - Highly intricate structure"] },
  { key: "volatility", label: "Industry Volatility", icon: "📉", levels: ["1 - Highly stable (e.g., utilities)", "2 - Predictable (e.g., staples)", "3 - Neutral cyclicality", "4 - Cyclical/volatile", "5 - Highly volatile/disruptive"] },
  { key: "plan", label: "Availability of a Business Plan", icon: "📝", levels: ["1 - No plan, build from scratch", "2 - High-level targets only", "3 - Some assumptions, weak logic", "4 - Detailed plan with backup", "5 - Full plan + sensitivities"] },
  { key: "sensitivity", label: "Level of Scenario Analysis", icon: "📈", levels: ["1 - None", "2 - Basic 1-2 variables", "3 - Few scenarios", "4 - Many inputs and paths", "5 - Advanced simulations"] }
]

export default function QuoteCalculator() {
  const [scores, setScores] = useState(Object.fromEntries(questions.map((q) => [q.key, 3])))
  const totalScore = questions.reduce((sum, q) => sum + (scores[q.key] / 5) * weights[q.key], 0)
  const fee = Math.round(minFee + (totalScore - 20) * 106.25)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e3e8f0] to-[#f8fafc] py-16 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <img src="/logo.png" alt="Moores Rowland" className="w-28 mx-auto mb-5" />
          <h1 className="text-5xl font-bold text-[#1a237e] tracking-tight mb-2">
            Moores Rowland Pricing Tool
          </h1>
          <p className="text-md text-gray-600">Independent. Professional. Global Reach.</p>
        </div>
        <Card>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-8">
                {questions.map((q) => (
                  <div key={q.key} className="pb-6 border-b border-gray-200">
                    <Label>
                      <span className="mr-2 text-xl">{q.icon}</span>
                      {q.label}: <span className="text-[#1a237e] font-bold">{scores[q.key]}</span>
                    </Label>
                    <Slider
                      min={1}
                      max={5}
                      step={1}
                      value={scores[q.key]}
                      onValueChange={([val]) => setScores((prev) => ({ ...prev, [q.key]: val }))}
                    />
                    <div className="text-sm text-gray-500 mt-2 italic">
                      {q.levels[scores[q.key] - 1]}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-center items-start md:items-center text-left md:text-center space-y-10 p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
                <div>
                  <p className="text-lg font-semibold text-gray-700">Estimated Quote</p>
                  <p className="text-5xl font-extrabold text-[#2e7d32] mt-2">${fee.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-700">Total Weighted Score</p>
                  <p className="text-4xl font-bold text-[#1a237e] mt-2">{Math.round(totalScore * 10) / 10}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <footer className="mt-12 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Moores Rowland Egypt · All Rights Reserved
        </footer>
      </div>
    </div>
  )
}
