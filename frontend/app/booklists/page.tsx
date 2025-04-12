"use client"

import axios from "axios"
import Image from "next/image"
import { useState, useEffect } from "react"

interface BookType {
    title?: string;
    author?: string;
    genre?: string;
    location?: string;
    ownerId?: string;
    image?: string
    ownerContact?: string;
    id?: string;
    createdAt?: string;
    status?: string;
}

export default function booklists() {

    const [books, setBooks] = useState<BookType[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    async function fetchAllBooks() {
        setLoading(true)
        try {
            const response = await axios.get("http://localhost:8000/books/listings")
            setBooks(response.data.allListings)
            setLoading(false)
        } catch (error) {
            console.error("Error fetching books:", error)
            setLoading(false) // Ensure loading is set to false even on error
        }
    }

    useEffect(() => {
        fetchAllBooks()
    }, [])

    return <section className="w-full py-12 md:py-24 lg:py-32">

        {loading ? <div>
            Loading Please wait
        </div> :
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Books</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Check out some of the latest books available on our platform.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
                    {books.map((book, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-lg border">
                            <div className="aspect-[3/4] bg-muted">
                                <img
                                    src={book.image || 'https://images-platform.99static.com//8vR0beE4zXRvHASM1W0kfT4iTYM=/413x198:1446x1231/fit-in/500x500/projects-files/157/15730/1573011/6e49d162-09d7-43f7-93b2-e1a9258ebc93.jpg'}
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
                                    <span className="font-mono text-green-300">$12.99</span>
                                    <span className="text-xs text-muted-foreground">Like New</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        }
    </section>
}