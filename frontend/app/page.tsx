"use client"

import Link from "next/link"
import { BookOpen, Search, DollarSign, ShoppingCart, BookMarked, Users, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"


export default function Home() {


  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col ">
      <header className="sticky top-0 px-5 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">BookSwap</span>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4 mx-2 ">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl ">
                  Your Community Book Marketplace
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  Buy and sell pre-loved books directly from people in your community. Save money, reduce waste, and
                  discover your next favorite read.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="cursor-pointer" onClick={() => router.push('/signin')}>
                    Login
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button onClick={() => router.push('/signup')} variant="outline" size="lg" className="cursor-pointer" >
                    Signup
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="relative h-[350px] w-full rounded-xl overflow-hidden">
                <Image
                  src="https://media.gettyimages.com/id/1173824984/photo/books-on-shelves-in-bookstore.jpg?s=612x612&w=0&k=20&c=ZRolsPgY6FrrTG1IaZrnx8dGe_0uO0PJ7jr5eWb6xfY="
                  alt="Books on a shelf"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform connects book lovers directly, making it easy to buy and sell books.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
              <div className="rounded-lg border bg-card p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <BookMarked className="mr-2 h-6 w-6 text-primary" />
                  For Sellers
                </h3>
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      1
                    </div>
                    <div className="space-y-1">
                      <p className="text-lg font-medium leading-none">Create a listing</p>
                      <p className="text-sm text-muted-foreground">
                        Add photos, set your price, and describe your books condition.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      2
                    </div>
                    <div className="space-y-1">
                      <p className="text-lg font-medium leading-none">Connect with buyers</p>
                      <p className="text-sm text-muted-foreground">Receive inquiries and arrange the exchange.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      3
                    </div>
                    <div className="space-y-1">
                      <p className="text-lg font-medium leading-none">Complete the sale</p>
                      <p className="text-sm text-muted-foreground">Exchange the book and receive your payment.</p>
                    </div>
                  </li>
                </ol>
              </div>
              <div className="rounded-lg border bg-card p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <ShoppingCart className="mr-2 h-6 w-6 text-primary" />
                  For Buyers
                </h3>
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      1
                    </div>
                    <div className="space-y-1">
                      <p className="text-lg font-medium leading-none">Browse listings</p>
                      <p className="text-sm text-muted-foreground">Search by title, author, genre, or location.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      2
                    </div>
                    <div className="space-y-1">
                      <p className="text-lg font-medium leading-none">Contact the seller</p>
                      <p className="text-sm text-muted-foreground">
                        Ask questions and arrange to meet or have the book shipped.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      3
                    </div>
                    <div className="space-y-1">
                      <p className="text-lg font-medium leading-none">Get your book</p>
                      <p className="text-sm text-muted-foreground">Pay the seller and enjoy your new read.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose BookSwap?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform offers unique benefits for book lovers everywhere.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 text-center">
                <DollarSign className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Save Money</h3>
                <p className="text-sm text-muted-foreground">
                  Buy books at a fraction of retail price and sell your books to recoup costs.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 text-center">
                <Users className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Community Connection</h3>
                <p className="text-sm text-muted-foreground">
                  Meet fellow book lovers in your area and share recommendations.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 text-center">
                <Search className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Find Rare Books</h3>
                <p className="text-sm text-muted-foreground">
                  Discover out-of-print and hard-to-find titles from individual sellers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Join Our Community?</h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Create an account today and start buying or selling books with people in your area.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 px-5 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <p className="text-sm font-medium">© 2025 BookSwap. All rights reserved.</p>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="#" className="text-xs hover:underline underline-offset-4">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="#" className="text-xs hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
