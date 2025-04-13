"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import { Calendar, MapPin, User, Mail, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface BookType {
    title?: string;
    author?: string;
    genre?: string;
    location?: string;
    imageUrl?: string;
    ownerContact?: string;
    id?: string;
    createdAt: string;
    status?: string;
    ownerId?: string
}

export default function BookDetails() {

    const router = useRouter()
    const { id } = useParams();
    const [book, setBook] = useState<BookType | null>(null);
    const [loading, setLoading] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false)

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    }


    useEffect(() => {
        async function fetchBook() {
            try {
                const response = await axios.get(`http://localhost:8000/books/listings/${id}`);
                setBook(response.data.book);
                setIsLoaded(true);
            } catch (error) {
                console.error("Error fetching book:", error);
            } finally {
                setLoading(false);
            }
        }

        if (id) fetchBook();
    }, [id]);

    if (loading) return <div className="text-center py-10">Loading book details...</div>;

    if (!book) return <div className="text-center text-red-500 py-10">Book not found.</div>;

    return (
        <div className="container max-w-4xl mx-auto py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -50 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <Badge className="mb-4">
                    {book.status === "available" ? "Available" : "Unavailable"}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">{book.title}</h1>
                <p className="text-xl text-muted-foreground">by {book.author}</p>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                animate={isLoaded ? "show" : "hidden"}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                <motion.div variants={item} className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between">
                                <div>
                                    <CardTitle>Book Details</CardTitle>
                                    <CardDescription>Information about this book</CardDescription>
                                </div>
                                <div>
                                    <img className="h-full w-60" src={book.imageUrl} alt="bookimage" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-muted-foreground" />
                                <span className="font-medium">Genre:</span>
                                <span>{book.genre}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-muted-foreground" />
                                <span className="font-medium">Location:</span>
                                <span>{book.location}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-muted-foreground" />
                                <span className="font-medium">Listed on:</span>
                                <span>{formatDate(book?.createdAt)}</span>
                            </div>

                            <Separator className="my-4" />

                            <div className="space-y-2">
                                <h3 className="font-semibold">About this book</h3>
                                <p className="text-muted-foreground">
                                    "The Great Gatsby" is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long
                                    Island, the novel depicts first-person narrator Nick Carraway's interactions with mysterious
                                    millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={item}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Owner Information</CardTitle>
                            <CardDescription>Contact details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2">
                                <User className="h-5 w-5 text-muted-foreground" />
                                <span className="font-medium">Owner ID:</span>
                                <span className="text-sm font-mono">{book.ownerId}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Mail className="h-5 w-5 text-muted-foreground" />
                                <span className="font-medium">Contact:</span>
                                <span>{book.ownerContact}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <motion.div variants={item} className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Book ID</CardTitle>
                                <CardDescription>Reference number</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="font-mono text-sm bg-muted p-2 rounded">{book.id}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8 flex justify-center md:justify-start gap-4"
            >
                <Button className="cursor-pointer" onClick={() => router.push("/booklists")} variant="outline">Back to Books</Button>
                {book.status === "available" && <Button>Request Book</Button>}
            </motion.div>
        </div>
    );
}
