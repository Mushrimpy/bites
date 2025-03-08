"use client"

import { useState } from "react"
import { Search, Calendar, Mail, ExternalLink, ArrowUpDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
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
        sentiment: "positive",
        summary: "Acme Corporation exceeded analyst expectations with a 15% increase in quarterly revenue."
    },
    {
        id: 2,
        headline: "Globex International Announces New CEO",
        client: "Sarah Johnson",
        company: "Globex International",
        date: "5 hours ago",
        sentiment: "neutral",
        summary: "Sarah Johnson will step down as CEO of Globex International at the end of the quarter."
    },
    {
        id: 3,
        headline: "Initech Faces Regulatory Scrutiny",
        client: "Michael Brown",
        company: "Initech",
        date: "Yesterday",
        sentiment: "negative",
        summary: "Regulators have opened an investigation into Initech's accounting practices."
    },
    {
        id: 4,
        headline: "Wayne Enterprises Unveils Revolutionary Clean Energy Technology",
        client: "Jennifer Lee",
        company: "Wayne Enterprises",
        date: "Yesterday",
        sentiment: "positive",
        summary: "The new technology could reduce carbon emissions by up to 40% in industrial applications."
    },
    {
        id: 5,
        headline: "Soylent Corp Expands into Asian Markets",
        client: "Emily Davis",
        company: "Soylent Corp",
        date: "2 days ago",
        sentiment: "positive",
        summary: "New partnerships in Japan and South Korea will increase global market share."
    },
    {
        id: 6,
        headline: "Stark Industries Awarded Major Defense Contract",
        client: "David Miller",
        company: "Stark Industries",
        date: "3 days ago",
        sentiment: "positive",
        summary: "The $2.3B contract will fund development of next-generation security systems."
    },
    {
        id: 7,
        headline: "Umbrella Corporation Stock Downgraded",
        client: "Robert Wilson",
        company: "Umbrella Corporation",
        date: "1 week ago",
        sentiment: "negative",
        summary: "Analysts at Goldman Sachs downgraded Umbrella Corporation stock from 'Buy' to 'Hold'."
    }
]

export function NewsFeed() {
    const [searchTerm, setSearchTerm] = useState("")
    const [sortColumn, setSortColumn] = useState<string | null>(null)
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
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead
                                    className="cursor-pointer"
                                    onClick={() => handleSort("headline")}
                                >
                                    <div className="flex items-center">
                                        Headline
                                        {sortColumn === "headline" && (
                                            <ArrowUpDown className="ml-2 h-4 w-4" />
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
                                            <ArrowUpDown className="ml-2 h-4 w-4" />
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
                                            <ArrowUpDown className="ml-2 h-4 w-4" />
                                        )}
                                    </div>
                                </TableHead>
                                <TableHead>Sentiment</TableHead>
                                <TableHead
                                    className="cursor-pointer"
                                    onClick={() => handleSort("date")}
                                >
                                    <div className="flex items-center">
                                        Date
                                        {sortColumn === "date" && (
                                            <ArrowUpDown className="ml-2 h-4 w-4" />
                                        )}
                                    </div>
                                </TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedNews.map((item) => (
                                <TableRow
                                    key={item.id}
                                    className="group cursor-pointer"
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
                                    <TableCell>
                                        <Badge
                                            variant={
                                                item.sentiment === "positive"
                                                    ? "success"
                                                    : item.sentiment === "negative"
                                                        ? "destructive"
                                                        : "outline"
                                            }
                                        >
                                            {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell onClick={(e) => e.stopPropagation()}>
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="icon" title="Schedule Meeting">
                                                <Calendar className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" title="Send Email">
                                                <Mail className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" title="View Full Article">
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