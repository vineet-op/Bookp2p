"use client"

import axios from "axios"
import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface Book {
    title: string;
    author: string;
    genre: string;
    location: string;
    ownerId: string;
    ownerContact: string;
    imageUrl: string;
    id: string;
    createdAt: string;
    status: string;
}

export default function ownerbooks() {

    const [ownerbooks, setOwnerbooks] = useState<Book[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter()

    useEffect(() => {
        const fetchOwnerBooks = async () => {
            setLoading(true)
            try {
                const response = await axios.get("http://localhost:8000/books/listings/user/f8llfwc")
                setOwnerbooks(response.data.ownerBooks)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching owner books:", error)
                setLoading(false)
            }
        }
        fetchOwnerBooks()
    }, [])

    return (
        <section className="w-full py-10 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Your Books</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Check out some of your books you owned.
                        </p>
                    </div>
                </div>

                <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
                    {loading ? (
                        <div className="flex justify-center items-center h-screen">
                            <div className="loader"></div>
                        </div>
                    ) : (
                        ownerbooks.map((book, index) => (
                            <AnimatePresence key={index}>
                                <motion.div className="group relative overflow-hidden rounded-lg border"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}>

                                    <div className="aspect-[3/4] bg-muted">
                                        <img
                                            src={book.imageUrl || 'https://images-platform.99static.com//8vR0beE4zXRvHASM1W0kfT4iTYM=/413x198:1446x1231/fit-in/500x500/projects-files/157/15730/1573011/6e49d162-09d7-43f7-93b2-e1a9258ebc93.jpg'}
                                            alt={`Book cover ${book.title}`}
                                            width={300}
                                            height={450}
                                            className="h-full w-full object-cover transition-all group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold">{book?.title}</h3>
                                        <p className="text-sm text-muted-foreground">{book?.author}</p>
                                        <div className="mt-2 flex items-center justify-between">
                                            <span className="text-xs text-muted-foreground">Like New</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        ))
                    )}
                </div>
                <div className="flex justify-center items-center w-screen p-2 gap-5">
                    <Button onClick={() => router.push("/booklists")} className="p-2 cursor-pointer px-4 rounded-full">Show All Books</Button>
                    <Button onClick={() => router.push("/booksadd")} className="p-2 px-4 cursor-pointer rounded-full">Add Books</Button>
                </div>
            </div>
        </section>
    )
}