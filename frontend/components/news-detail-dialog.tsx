"use client"

import * as React from "react"
import { Calendar, Mail, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog"

interface NewsItem {
    id: number
    headline: string
    client: string
    company: string
    date: string
    sentiment: string
    summary: string
}

interface NewsDetailDialogProps {
    newsItem: NewsItem | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function NewsDetailDialog({ newsItem, open, onOpenChange }: NewsDetailDialogProps) {
    if (!newsItem) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>{newsItem.headline}</DialogTitle>
                    <DialogDescription className="flex items-center justify-between">
                        <span>{newsItem.client} • {newsItem.company}</span>
                        <Badge
                            variant={
                                newsItem.sentiment === "positive"
                                    ? "success"
                                    : newsItem.sentiment === "negative"
                                        ? "destructive"
                                        : "outline"
                            }
                        >
                            {newsItem.sentiment.charAt(0).toUpperCase() + newsItem.sentiment.slice(1)}
                        </Badge>
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    <p className="text-sm text-muted-foreground mb-4">{newsItem.summary}</p>
                    <p className="text-xs text-muted-foreground">Published: {newsItem.date}</p>
                </div>

                <DialogFooter className="flex sm:justify-between">
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Calendar className="h-4 w-4" />
                            Schedule Meeting
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Mail className="h-4 w-4" />
                            Send Email
                        </Button>
                    </div>
                    <DialogClose asChild>
                        <Button variant="ghost" size="sm">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 