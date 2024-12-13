'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function ChildPage() {
    const router = useRouter()

    const [children, setChildren] = useState<any>([])
    
    useEffect(() => {
        const storedChildren = JSON.parse(localStorage.getItem("children") ?? '[]');
        setChildren(storedChildren)
    }, [])

    const handleClick = (childId: any) => {
        const childClicked = children.filter((child: any) => childId === child.id)[0]
        localStorage.setItem('selectedChild', JSON.stringify(childClicked));
        router.push('/dashboard');
    }

    return (
        <div>
            <h1>Choose Child</h1>
            {children?.map((child: any) => {
                return (
                    <button
                        key={child.id}
                        type="button"
                        onClick={() => handleClick(child.id)}
                    >
                        {child.first_name}
                    </button>
                )
            })}
        </div>
    )
}
