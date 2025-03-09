"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Newspaper, Users, BarChart } from "lucide-react"
import { cn } from "@/lib/utils"

export function MobileNavigation() {
    const pathname = usePathname()

    // Don't show navigation on the landing page
    if (pathname === "/") {
        return null
    }

    const navItems = [
        {
            name: "News",
            href: "/news",
            icon: Newspaper,
        },
        {
            name: "Contacts",
            href: "/contacts",
            icon: Users,
        },
        {
            name: "CRM",
            href: "/crm",
            icon: BarChart,
        },
    ]

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 backdrop-blur-lg bg-opacity-80">
            <nav className="flex h-16">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-1 flex-col items-center justify-center gap-1 transition-colors",
                                isActive
                                    ? "text-zinc-900 dark:text-zinc-50"
                                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            <span className="text-xs font-medium">{item.name}</span>
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
} 