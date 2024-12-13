'use client'

import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const BabyWeightChart = dynamic(() => import('./BabyWeightChart.tsx'), { ssr: false });

export default function Weight() {
    const router = useRouter()
    return (
        <div>
            <h1>Weight</h1>
            <BabyWeightChart />
            <button
                type="button"
                onClick={() => router.push('/weight/add')}
                >Add weight data
            </button>
        </div>
    )
}
