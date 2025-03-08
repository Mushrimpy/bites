"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Newspaper, Users, BarChart } from "lucide-react"
import { cn } from "@/lib/utils"

export function MobileNavigation() {
    const pathname = usePathname()

    const navItems = [
        {
            name: "News",
            href: "/",
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
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background">
            <nav className="flex h-16">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-1 flex-col items-center justify-center gap-1",
                                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
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