"use client"

import * as React from "react"
import { Calendar, Mail, Clock, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
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
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-xl leading-tight">{newsItem.headline}</DialogTitle>
                    <DialogDescription className="flex items-center justify-between mt-2">
                        <span className="text-sm">{newsItem.client} • {newsItem.company}</span>
                        <span className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-3.5 w-3.5 mr-1.5" />
                            {newsItem.date}
                        </span>
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    <p className="text-sm text-foreground leading-relaxed">{newsItem.summary}</p>

                    <div className="mt-6 pt-4 border-t">
                        <h3 className="text-sm font-medium mb-2">Suggested Actions</h3>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <Button variant="outline" size="sm" className="justify-start sm:justify-center gap-2 w-full">
                                <Calendar className="h-4 w-4" />
                                Schedule Meeting
                            </Button>
                            <Button variant="outline" size="sm" className="justify-start sm:justify-center gap-2 w-full">
                                <Mail className="h-4 w-4" />
                                Send Email
                            </Button>
                            <Button variant="outline" size="sm" className="justify-start sm:justify-center gap-2 w-full">
                                <ExternalLink className="h-4 w-4" />
                                View Full Article
                            </Button>
                        </div>
                    </div>
                </div>

                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button variant="secondary">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 