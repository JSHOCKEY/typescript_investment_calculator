import { useState } from "react";

type InvestmentData = {
  initialAmount: number;
  annualContribution: number;
  expectedReturn: number;
  duration: number;
};

type InvestmentResult = {
  year: string;
  totalAmount: number;
  totalContributions: number;
  totalInterestEarned: number;
};

type CalculationResult = InvestmentResult[] | string;

function calculateInvestment(data: InvestmentData): CalculationResult {
  const { initialAmount, annualContribution, expectedReturn, duration } = data;

  if (initialAmount < 0) {
    return "Initial investment amount must be at least zero.";
  }

  if (duration <= 0) {
    return "No valid amount of years provided.";
  }

  if (expectedReturn < 0) {
    return "Expected return must be at least zero.";
  }

  let total = initialAmount;
  let totalContributions = 0;
  let totalInterestEarned = 0;
  const annualResults: InvestmentResult[] = [];

  for (let i = 0; i < duration; i++) {
    total = total * (1 + expectedReturn);
    totalInterestEarned = total - totalContributions - initialAmount;
    totalContributions = totalContributions + annualContribution;
    total = total + annualContribution;

    annualResults.push({
      year: `Year: ${i + 1}`,
      totalAmount: total,
      totalContributions,
      totalInterestEarned,
    });
  }

  return annualResults;
}

export default function InvestmentCalculator() {
  const [formData, setFormData] = useState<InvestmentData>({
    initialAmount: 0,
    annualContribution: 0,
    expectedReturn: 0,
    duration: 0,
  });

  const [results, setResults] = useState<CalculationResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: parseFloat(e.target.value),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResults(calculateInvestment(formData));
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Investment Calculator</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="number"
          name="initialAmount"
          value={formData.initialAmount || ""}
          onChange={handleInputChange}
          placeholder="Initial amount in $ (ex: 5000)"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="annualContribution"
          value={formData.annualContribution || ""}
          onChange={handleInputChange}
          placeholder="Annual contribution in $ (ex: 500)"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="expectedReturn"
          step="0.01"
          value={formData.expectedReturn || ""}
          onChange={handleInputChange}
          placeholder="Expected return rate % (ex: 0.08)"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="duration"
          value={formData.duration || ""}
          onChange={handleInputChange}
          placeholder="Duration in years (ex: 5)"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded">
          Calculate
        </button>
      </form>

      {results && (
        <div className="mt-6">
          {typeof results === "string" ? (
            <p className="text-red-500">{results}</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300 mt-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Year</th>
                  <th className="border p-2">Total Amount</th>
                  <th className="border p-2">Total Contributions</th>
                  <th className="border p-2">Interest Earned</th>
                </tr>
              </thead>
              <tbody>
                {results.map((res, index) => (
                  <tr key={index} className="border-t">
                    <td className="border p-2">{res.year}</td>
                    <td className="border p-2">${res.totalAmount.toFixed(2)}</td>
                    <td className="border p-2">${res.totalContributions.toFixed(2)}</td>
                    <td className="border p-2">${res.totalInterestEarned.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
