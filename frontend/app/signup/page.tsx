// app/signup/page.tsx (Next.js 13+ App Router)
'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import axios from "axios"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from 'next/navigation';

export default function SignupPage() {

    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [userData, setUserData] = useState([]);

    async function RegisterUser() {

        const router = useRouter();
        try {
            const response = await axios.post("http://localhost:3000/register", {
                name,
                email,
                password,
                mobile,
                role
            })

            if (!response) {
                toast.error("Can't Register User, Try again")
            }
            setUserData(response.data)
            toast("User Register Success")
            setName('');
            setMobile('');
            setEmail('');
            setPassword('');
            setRole('');
            console.log(userData);
            router.push('/signin');

        } catch (error) {
            console.error("Failed to register user:", error);
            toast.error("Registration failed. Please try again.");
        }

    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-neutral-100 px-4">
            <Card className="w-full max-w-md shadow-lg border-neutral-200">
                <CardHeader>
                    <CardTitle className="text-center text-neutral-800">Sign Up</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-1">
                        <Label htmlFor="name" className="text-neutral-700">Name</Label>
                        <Input id="name" placeholder="John Doe" className="bg-neutral-50" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="mobile" className="text-neutral-700">Mobile Number</Label>
                        <Input id="mobile" type="tel" placeholder="9876543210" className="bg-neutral-50" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="email" className="text-neutral-700">Email</Label>
                        <Input id="email" type="email" placeholder="you@example.com" className="bg-neutral-50" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="password" className="text-neutral-700">Password</Label>
                        <Input id="password" type="password" placeholder="••••••••" className="bg-neutral-50" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="space-y-1">
                        <Label className="text-neutral-700">Role</Label>
                        <Select value={role} onValueChange={(val) => setRole(val)}>
                            <SelectTrigger className="bg-neutral-50">
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="owner">Owner</SelectItem>
                                <SelectItem value="seeker">Seeker</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>

                <CardFooter>
                    <Button onClick={RegisterUser} className="w-full bg-neutral-800 text-white hover:bg-neutral-700">Create Account</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
