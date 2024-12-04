'use client'

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

import { getUser } from "../api/user";

export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState("");

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        console.log('storedEmail', storedEmail)
        if (storedEmail) {
          setEmail(storedEmail);
          router.push('/dashboard');
        }
      }, []);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      // localStorage.setItem("email", email)

      const userInfo = await getUser(email)
      console.log('userInfo', userInfo)
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
