'use client'

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
  } from 'recharts';
import dynamic from 'next/dynamic';

const BabyWeightChart = dynamic(() => import('./BabyWeightChart.tsx'), { ssr: false });

export default function Weight() {
    
    return (
        <div>
            <h1>Weight</h1>
            <BabyWeightChart />
        </div>
    )
}
