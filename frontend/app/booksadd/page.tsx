'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function BookListingForm() {
    const [form, setForm] = useState({
        title: "",
        author: "",
        genre: "",
        location: "",
        ownerContact: ""
    });

    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bookp2pbackend-production.up.railway.app';
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        if (!form.title || !form.author || !form.genre || !form.location || !form.ownerContact) {
            toast.error("Please fill all fields");
            return;
        }

        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, value);
        });
        if (image) {
            formData.append("image", image);
        }

        try {
            setLoading(true);
            await axios.post(`${baseUrl}/books/listings/add`, formData);
            toast.success("Book listing created!");
            setForm({ title: "", author: "", genre: "", location: "", ownerContact: "" });
            setImage(null);
            setPreview(null);
            router.push("/booklists")


        } catch (err) {
            toast.error("Failed to create book listing");
            console.error(err);
        } finally {
            setLoading(false);
        }


    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-neutral-100 p-4">
            <Card className="w-full max-w-xl shadow-md border-neutral-300">
                <CardHeader>
                    <CardTitle className="text-neutral-800 text-center">Add Book Listing</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input name="title" id="title" value={form.title} onChange={handleChange} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="author">Author</Label>
                        <Input name="author" id="author" value={form.author} onChange={handleChange} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="genre">Genre</Label>
                        <Input name="genre" id="genre" value={form.genre} onChange={handleChange} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="location">Location</Label>
                        <Input name="location" id="location" value={form.location} onChange={handleChange} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="ownerContact">Owner Contact</Label>
                        <Input name="ownerContact" id="ownerContact" value={form.ownerContact} onChange={handleChange} />
                    </div>

                    <div className="grid gap-2 ">
                        <Label htmlFor="image">Upload Image</Label>
                        <Input type="file" accept="image/*" onChange={handleImageChange} className="cursor-pointer" />
                        {preview && <Image src={preview} alt="Preview" layout="fixed" width={32} height={32} objectFit="cover" className="mt-2 rounded-md" />}
                    </div>
                </CardContent>

                <CardFooter>
                    <Button
                        className=" cursor-pointer w-full bg-neutral-800 text-white hover:bg-neutral-700"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Add Listing"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
