// app/login/page.tsx (Next.js 13+ App Router Example)
'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Book } from "lucide-react"
import { toast } from "sonner"
import axios from "axios"
import { useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter } from 'next/navigation';


export default function LoginPage() {

    const router = useRouter()

    const [email, setEmail] = useState('owner@dev.com');
    const [password, setPassword] = useState('password123');
    const [role, setRole] = useState('');

    async function handleLogin() {
        try {
            const response = await axios.post('http://localhost:8000/login', {
                email,
                password,
                role
            });
            if (!response) {
                toast.error("Login failed, please try again.");
            } else {
                toast.success("Login successful.");
                localStorage.setItem('role', role);

                if (role === "owner") {
                    router.push("/ownerbooks")
                }
                else {
                    router.push("/booklists")
                }
            }

            setEmail("")
            setPassword("")
            setRole("")
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Login failed, please try again.");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-neutral-100 px-4">
            <Card className="w-full max-w-sm shadow-lg border-neutral-200">
                <CardHeader className="flex justify-center items-center flex-1">
                    <Book />
                    <CardTitle className="text-center text-neutral-800">Login</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-1">
                        <Label htmlFor="email" className="text-neutral-700">Email</Label>
                        <Input id="email" type="email" placeholder="you@example.com" className="bg-neutral-50" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="password" className="text-neutral-700">Password</Label>
                        <Input id="password" type="password" placeholder="••••••••" className="bg-neutral-50" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="role" className="text-neutral-700">Role</Label>
                        <Select value={role} onValueChange={(val) => setRole(val)}>
                            <SelectTrigger className="bg-neutral-50">
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="seller">Seller</SelectItem>
                                <SelectItem value="owner">Owner</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>

                <CardFooter>
                    <Button onClick={handleLogin} className="w-full bg-neutral-800 text-white hover:bg-neutral-700">Login</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
