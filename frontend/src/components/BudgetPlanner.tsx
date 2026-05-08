"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface BudgetPlannerProps {
  totalEstimatedCost: string;
}

export default function BudgetPlanner({ totalEstimatedCost }: BudgetPlannerProps) {
  // Extract number from string, e.g. "$1200" -> 1200
  const costMatch = totalEstimatedCost.match(/\d+/g);
  const totalCost = costMatch ? parseInt(costMatch.join('')) : 1000;

  // Mock a budget distribution for the pie chart
  const data = [
    { name: 'Flights & Transport', value: Math.round(totalCost * 0.4), color: '#6366f1' }, // Indigo
    { name: 'Accommodation', value: Math.round(totalCost * 0.3), color: '#a855f7' },      // Purple
    { name: 'Food & Dining', value: Math.round(totalCost * 0.2), color: '#ec4899' },      // Pink
    { name: 'Activities & Fun', value: Math.round(totalCost * 0.1), color: '#14b8a6' },   // Teal
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  };

  return (
    <div className="w-full h-full glass rounded-2xl p-6 flex flex-col relative z-0">
      <h3 className="text-xl font-semibold text-white mb-2">Smart Budget Planner</h3>
      <p className="text-gray-400 text-sm mb-6">Total Estimated Cost: <span className="text-emerald-400 font-bold">{totalEstimatedCost}</span></p>
      
      <div className="flex-1 min-h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{ backgroundColor: 'rgba(20, 20, 25, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              wrapperStyle={{ fontSize: '12px', color: '#a1a1aa' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
