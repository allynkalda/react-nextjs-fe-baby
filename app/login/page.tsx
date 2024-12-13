'use client'

import { useState, useEffect, useCallback } from "react";
import { useRouter } from 'next/navigation';

import { getUser } from "../api/user.ts";
import { getChild } from "../api/child.ts";

export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState("");

    const fetchChildren = useCallback(
      async (parentId: number) => {
        try {
          const childrenInfo = await getChild(parentId);
          console.log("childInfo", childrenInfo);

          if (childrenInfo?.length > 1) {
            localStorage.setItem("children", JSON.stringify(childrenInfo))
            router.push('/child');
          } else if (childrenInfo?.length === 0) {
            router.push('/child/add');
          } else if (childrenInfo?.length === 1) {
            router.push('/dashboard');
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }, [ email ]
    )
    
    useEffect(() => {
       const storedUser = localStorage.getItem("user");

        if (storedUser) {
          const parsed = JSON.parse(storedUser || '{}')
          setEmail(parsed.email);
          fetchChildren(parsed.id);
        }
      }, [ email ]);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      try {
        const userInfo = await getUser(email);
        if (userInfo.email) {
          localStorage.setItem("user", JSON.stringify(userInfo));
        }
        console.log("userInfo", userInfo);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    
    return (
        <div>
            <h1>Log in</h1>
            <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
            />
            <button type="submit">Submit</button>
            </form>
        </div>
    )
}
