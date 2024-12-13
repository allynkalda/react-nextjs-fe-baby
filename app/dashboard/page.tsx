'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const router = useRouter()

    const [child, setChild] = useState<any>({})

    useEffect(() => {
        const storedSelectedChild = JSON.parse(localStorage.getItem("selectedChild") ?? '{}')
        setChild(storedSelectedChild)
    }, [])
    
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Name: {child?.first_name}</p>
            <button
                type="button"
                onClick={() => router.push('/weight')}
                >Go to weight data
            </button>
            <button
                type="button"
                onClick={() => router.push('/sleep')}
                >Go to sleep data
            </button>
        </div>
    )
}
