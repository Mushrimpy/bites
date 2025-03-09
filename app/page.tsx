import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BackgroundGradient } from "@/components/ui/background-gradient"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col relative">
      <BackgroundGradient />

      <header className="container py-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center">
              <span className="text-zinc-50 font-semibold text-xl">B</span>
            </div>
            <span className="font-semibold text-2xl">Bites</span>
          </div>
        </div>
      </header>

      <main className="flex-1 container flex flex-col items-center justify-center py-12 md:py-24 relative z-10">
        <div className="text-center space-y-6 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-500">
            Client News That Matters
          </h1>

          <p className="text-xl text-zinc-600 dark:text-zinc-400 md:text-2xl">
            Empower investment bankers with timely, relevant client updates
          </p>

          <p className="text-zinc-500 dark:text-zinc-400 max-w-[600px] mx-auto">
            Bites delivers personalized news alerts, meeting triggers, and email automation
            to strengthen client relationships and drive business growth.
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <Link
            href="/news"
            className="inline-flex h-14 items-center justify-center rounded-full bg-zinc-800 px-10 text-base font-medium text-zinc-50 transition-all hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 shadow-lg shadow-zinc-800/20 hover:shadow-xl hover:shadow-zinc-800/30 hover:-translate-y-0.5"
          >
            Try Demo
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            No sign up required. Explore the full demo instantly.
          </p>
        </div>
      </main>

      <section className="py-16 md:py-24 bg-zinc-100 dark:bg-zinc-900/50 relative z-10">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-200">Key Features</h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-[700px] mx-auto">
              Designed specifically for investment bankers to strengthen client relationships
              through timely, relevant interactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col p-6 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm">
              <div className="h-12 w-12 rounded-full bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-800 dark:text-zinc-200"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path><path d="M18 14h-8"></path><path d="M15 18h-5"></path><path d="M10 6h8v4h-8V6Z"></path></svg>
              </div>
              <h3 className="text-xl font-medium mb-2 text-zinc-800 dark:text-zinc-200">Client News Feed</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Stay updated with the latest news about your clients in real-time, filtered for relevance.</p>
            </div>

            <div className="flex flex-col p-6 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm">
              <div className="h-12 w-12 rounded-full bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-800 dark:text-zinc-200"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line><path d="m9 16 2 2 4-4"></path></svg>
              </div>
              <h3 className="text-xl font-medium mb-2 text-zinc-800 dark:text-zinc-200">Meeting Triggers</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Automatically schedule meetings based on important client news and events.</p>
            </div>

            <div className="flex flex-col p-6 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm">
              <div className="h-12 w-12 rounded-full bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-800 dark:text-zinc-200"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
              </div>
              <h3 className="text-xl font-medium mb-2 text-zinc-800 dark:text-zinc-200">Email Automation</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Send timely emails when significant client events occur to maintain engagement.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 md:py-0 relative z-10">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center">
              <span className="text-zinc-50 font-semibold text-sm">B</span>
            </div>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">Bites</span>
          </div>

          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} Bites. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <Link href="#" className="hover:text-zinc-800 dark:hover:text-zinc-200 hover:underline">
              Privacy
            </Link>
            <Link href="#" className="hover:text-zinc-800 dark:hover:text-zinc-200 hover:underline">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
