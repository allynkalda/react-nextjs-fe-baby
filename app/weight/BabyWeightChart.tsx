import React, { useEffect, useCallback, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { getWeightData } from '../api/measurement.ts';
import { WEIGHT_MINMAX } from '../utils/weight.ts'

type FetchedWeight = {
  date: number,
  weight: string
}

type FetchedWeightData = Array<FetchedWeight>

type ChartWeight = {
  month: number,
  minMax: number[],
  weight: number | null
}

type ChartWeightData = Array<ChartWeight>

const sortWeightData = (weight: FetchedWeightData) => weight.sort((a: { date: number; }, b: { date: number; }) => a.date - b.date);

export default function BabyWeightChart() {

  const [weightData, setWeightData] = useState<ChartWeightData>([])

  const childInfo = JSON.parse(localStorage.getItem("selectedChild") ?? '[]');

  const fetchWeightData = useCallback(
    async (childId: number) => {
      try {
        const retrievedWeightData = await getWeightData(childId);
        const sortedWeightData = sortWeightData(retrievedWeightData);
        const refBirthDate = new Date(childInfo.birthdate);

        const formatWeightData = () => {
          const weightArr: ChartWeightData = []

          WEIGHT_MINMAX.forEach((weight: {
            month: number,
            min: number,
            max: number
          }, index: number) => {
            const weightElem: ChartWeight = {
              month: 0,
              minMax: [],
              weight: 0
            }
            weightElem.month = weight.month
            weightElem.minMax = [ weight.min, weight.max ]

            const refDate = new Date(new Date(refBirthDate).setMonth(refBirthDate.getMonth() + index)).toISOString();
            const refMonth = new Date(refDate).getMonth();
            const refYear = new Date(refDate).getFullYear();

            const filterWeightDate = sortedWeightData.filter((w: { date: string | number | Date; }) => {
              const refDate = new Date(w.date)
              return refDate.getMonth() === refMonth && refDate.getFullYear() == refYear
              
            })
            
            weightElem.weight = filterWeightDate.length > 0 ? Number(filterWeightDate[0].weight) : null
            weightArr.push(weightElem)
          })
          return weightArr
        }
        setWeightData(formatWeightData())
      } catch (error) {
        console.error("Error fetching weight info:", error);
      }
    }, [ childInfo ]
  )
  
  useEffect(() => {
    fetchWeightData(childInfo.id)
  }, [childInfo.id])

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={weightData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        {/* Grid */}
        <CartesianGrid strokeDasharray="3 3" />

        {/* Axes */}
        <XAxis
          dataKey="month"
          label={{ value: 'Months', position: 'insideBottom', offset: -5 }}
          tickFormatter={(month: any) => `${month} mo`}
        />
        <YAxis label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft' }} />

        {/* Tooltip */}
        <Tooltip formatter={(value: number) => `${value} kg`} />

       {/* Baby's Actual Weight */}
       <Area
          type="monotone"
          dataKey="weight"
          stroke="red"
          fill="none"
          fillOpacity={1}
          name="Actual weight"
        />

        {/* Shaded Area Between Min and Max */}
        <Area
          type="monotone"
          dataKey="minMax"
          stroke="none"
          fill="lightblue"
          fillOpacity={0.5}
          name="Shaded Area (Min to Max)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

