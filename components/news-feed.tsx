"use client"

import { useState } from "react"
import { Search, Calendar, Mail, ExternalLink, ArrowUpDown, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { NewsDetailDialog } from "@/components/news-detail-dialog"
import { cn } from "@/lib/utils"

// Mock news data
const newsItems = [
    {
        id: 1,
        headline: "Acme Corporation Reports Strong Q2 Earnings",
        client: "John Smith",
        company: "Acme Corporation",
        date: "2 hours ago",
        summary: "Acme Corporation exceeded analyst expectations with a 15% increase in quarterly revenue."
    },
    {
        id: 2,
        headline: "Globex International Announces New CEO",
        client: "Sarah Johnson",
        company: "Globex International",
        date: "5 hours ago",
        summary: "Sarah Johnson will step down as CEO of Globex International at the end of the quarter."
    },
    {
        id: 3,
        headline: "Initech Faces Regulatory Scrutiny",
        client: "Michael Brown",
        company: "Initech",
        date: "Yesterday",
        summary: "Regulators have opened an investigation into Initech's accounting practices."
    },
    {
        id: 4,
        headline: "Wayne Enterprises Unveils Revolutionary Clean Energy Technology",
        client: "Jennifer Lee",
        company: "Wayne Enterprises",
        date: "Yesterday",
        summary: "The new technology could reduce carbon emissions by up to 40% in industrial applications."
    },
    {
        id: 5,
        headline: "Soylent Corp Expands into Asian Markets",
        client: "Emily Davis",
        company: "Soylent Corp",
        date: "2 days ago",
        summary: "New partnerships in Japan and South Korea will increase global market share."
    },
    {
        id: 6,
        headline: "Stark Industries Awarded Major Defense Contract",
        client: "David Miller",
        company: "Stark Industries",
        date: "3 days ago",
        summary: "The $2.3B contract will fund development of next-generation security systems."
    },
    {
        id: 7,
        headline: "Umbrella Corporation Stock Downgraded",
        client: "Robert Wilson",
        company: "Umbrella Corporation",
        date: "1 week ago",
        summary: "Analysts at Goldman Sachs downgraded Umbrella Corporation stock from 'Buy' to 'Hold'."
    }
]

export function NewsFeed() {
    const [searchTerm, setSearchTerm] = useState("")
    const [sortColumn, setSortColumn] = useState<string | null>("date")
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
    const [selectedNews, setSelectedNews] = useState<typeof newsItems[0] | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
    }

    const handleRowClick = (newsItem: typeof newsItems[0]) => {
        setSelectedNews(newsItem)
        setDialogOpen(true)
    }

    const filteredNews = searchTerm
        ? newsItems.filter(
            (item) =>
                item.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.company.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : newsItems

    const sortedNews = [...filteredNews].sort((a, b) => {
        if (!sortColumn) return 0

        let valueA, valueB

        switch (sortColumn) {
            case "headline":
                valueA = a.headline
                valueB = b.headline
                break
            case "client":
                valueA = a.client
                valueB = b.client
                break
            case "company":
                valueA = a.company
                valueB = b.company
                break
            case "date":
                // Simple date comparison for demo purposes
                valueA = a.date
                valueB = b.date
                break
            default:
                return 0
        }

        if (valueA < valueB) return sortDirection === "asc" ? -1 : 1
        if (valueA > valueB) return sortDirection === "asc" ? 1 : -1
        return 0
    })

    return (
        <div className="space-y-4">
            <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search news..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {sortedNews.length > 0 ? (
                <div className="rounded-lg overflow-hidden border shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/40">
                                <TableHead
                                    className="cursor-pointer w-[45%]"
                                    onClick={() => handleSort("headline")}
                                >
                                    <div className="flex items-center">
                                        Headline
                                        {sortColumn === "headline" && (
                                            <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
                                        )}
                                    </div>
                                </TableHead>
                                <TableHead
                                    className="cursor-pointer"
                                    onClick={() => handleSort("client")}
                                >
                                    <div className="flex items-center">
                                        Client
                                        {sortColumn === "client" && (
                                            <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
                                        )}
                                    </div>
                                </TableHead>
                                <TableHead
                                    className="cursor-pointer"
                                    onClick={() => handleSort("company")}
                                >
                                    <div className="flex items-center">
                                        Company
                                        {sortColumn === "company" && (
                                            <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
                                        )}
                                    </div>
                                </TableHead>
                                <TableHead
                                    className="cursor-pointer text-right"
                                    onClick={() => handleSort("date")}
                                >
                                    <div className="flex items-center justify-end">
                                        Date
                                        {sortColumn === "date" && (
                                            <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
                                        )}
                                    </div>
                                </TableHead>
                                <TableHead className="w-[120px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedNews.map((item) => (
                                <TableRow
                                    key={item.id}
                                    className="group cursor-pointer hover:bg-muted/30"
                                    onClick={() => handleRowClick(item)}
                                >
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{item.headline}</div>
                                            <div className="text-xs text-muted-foreground mt-1 line-clamp-1">{item.summary}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{item.client}</TableCell>
                                    <TableCell>{item.company}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end text-muted-foreground text-sm">
                                            <Clock className="h-3.5 w-3.5 mr-1.5" />
                                            {item.date}
                                        </div>
                                    </TableCell>
                                    <TableCell onClick={(e) => e.stopPropagation()}>
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="icon" title="Schedule Meeting" className="h-8 w-8">
                                                <Calendar className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" title="Send Email" className="h-8 w-8">
                                                <Mail className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" title="View Full Article" className="h-8 w-8">
                                                <ExternalLink className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
                    <p className="text-sm text-muted-foreground">No news found</p>
                </div>
            )}

            <NewsDetailDialog
                newsItem={selectedNews}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
            />
        </div>
    )
} 