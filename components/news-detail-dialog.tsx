"use client"

import * as React from "react"
import Link from "next/link"
import { Calendar, Mail, Clock, ExternalLink, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
    const [showEmailDialog, setShowEmailDialog] = React.useState(false)
    const [showMeetingDialog, setShowMeetingDialog] = React.useState(false)
    const [emailSubject, setEmailSubject] = React.useState("")
    const [emailBody, setEmailBody] = React.useState("")
    const [meetingTitle, setMeetingTitle] = React.useState("")
    const [meetingDate, setMeetingDate] = React.useState("")
    const [meetingTime, setMeetingTime] = React.useState("")
    const [meetingDuration, setMeetingDuration] = React.useState("30")
    const [meetingNotes, setMeetingNotes] = React.useState("")

    // Pre-populate email subject and body based on news item
    React.useEffect(() => {
        if (showEmailDialog && newsItem) {
            setEmailSubject(`Regarding: ${newsItem.headline}`)
            setEmailBody(`Dear ${newsItem.client},\n\nI noticed the recent news about ${newsItem.headline}.\n\nI'd like to discuss how this might impact your investment strategy.\n\nBest regards,\nYour Investment Banker`)
        }
    }, [showEmailDialog, newsItem])

    // Pre-populate meeting title and notes based on news item
    React.useEffect(() => {
        if (showMeetingDialog && newsItem) {
            setMeetingTitle(`Discussion: ${newsItem.headline}`)
            setMeetingNotes(`Agenda:\n1. Review recent news about ${newsItem.company}\n2. Discuss potential impact on investment strategy\n3. Explore opportunities and next steps`)
        }
    }, [showMeetingDialog, newsItem])

    if (!newsItem) return null

    const handleSendEmail = () => {
        // Demo only - show success message
        alert(`Email sent to ${newsItem.client} regarding "${newsItem.headline}"`)
        setShowEmailDialog(false)
        // Reset form
        setEmailSubject("")
        setEmailBody("")
    }

    const handleScheduleMeeting = () => {
        // Demo only - show success message
        alert(`Meeting scheduled with ${newsItem.client} on ${meetingDate} at ${meetingTime}`)
        setShowMeetingDialog(false)
        // Reset form
        setMeetingTitle("")
        setMeetingDate("")
        setMeetingTime("")
        setMeetingDuration("30")
        setMeetingNotes("")
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl leading-tight">{newsItem.headline}</DialogTitle>
                        <DialogDescription className="flex items-center justify-between mt-2">
                            <span className="text-sm flex items-center">
                                <Badge variant="outline" className="mr-2 font-normal border-zinc-200">
                                    {newsItem.company}
                                </Badge>
                                <span className="text-zinc-500">{newsItem.client}</span>
                            </span>
                            <span className="flex items-center text-sm text-zinc-500">
                                <Clock className="h-3.5 w-3.5 mr-1.5" />
                                {newsItem.date}
                            </span>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        <p className="text-sm text-foreground leading-relaxed">{newsItem.summary}</p>

                        <div className="mt-6 pt-4 border-t border-zinc-200">
                            <h3 className="text-sm font-medium mb-3">Actions</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="justify-start gap-2 w-full border-zinc-200"
                                    onClick={() => setShowMeetingDialog(true)}
                                >
                                    <Calendar className="h-4 w-4" />
                                    Schedule Meeting
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="justify-start gap-2 w-full border-zinc-200"
                                    onClick={() => setShowEmailDialog(true)}
                                >
                                    <Mail className="h-4 w-4" />
                                    Send Email
                                </Button>
                                <Button variant="outline" size="sm" className="justify-start gap-2 w-full border-zinc-200">
                                    <ExternalLink className="h-4 w-4" />
                                    View Full Article
                                </Button>
                                <Button variant="outline" size="sm" className="justify-start gap-2 w-full border-zinc-200" asChild>
                                    <Link href="/contacts">
                                        <User className="h-4 w-4" />
                                        View Client Profile
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-zinc-200">
                            <h3 className="text-sm font-medium mb-3">Related News</h3>
                            <div className="space-y-3">
                                <div className="p-3 rounded-md bg-zinc-50 border border-zinc-200 text-sm">
                                    <p className="font-medium">{newsItem.company} Announces Q1 Financial Results</p>
                                    <p className="text-xs text-zinc-500 mt-1">1 month ago</p>
                                </div>
                                <div className="p-3 rounded-md bg-zinc-50 border border-zinc-200 text-sm">
                                    <p className="font-medium">{newsItem.company} Expands Operations in Europe</p>
                                    <p className="text-xs text-zinc-500 mt-1">2 months ago</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="sm:justify-between">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/crm">
                                Create Trigger
                            </Link>
                        </Button>
                        <DialogClose asChild>
                            <Button variant="outline" className="border-zinc-200">Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Email Dialog */}
            <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Send Email to {newsItem.client}</DialogTitle>
                        <DialogDescription>
                            Compose an email regarding "{newsItem.headline}"
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-medium">
                                Subject
                            </label>
                            <Input
                                id="subject"
                                value={emailSubject}
                                onChange={(e) => setEmailSubject(e.target.value)}
                                placeholder="Email subject"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="body" className="text-sm font-medium">
                                Message
                            </label>
                            <Textarea
                                id="body"
                                value={emailBody}
                                onChange={(e) => setEmailBody(e.target.value)}
                                placeholder="Write your message here..."
                                className="min-h-[200px]"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowEmailDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSendEmail} disabled={!emailSubject.trim() || !emailBody.trim()}>
                            Send Email
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Meeting Dialog */}
            <Dialog open={showMeetingDialog} onOpenChange={setShowMeetingDialog}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Schedule Meeting with {newsItem.client}</DialogTitle>
                        <DialogDescription>
                            Set up a meeting to discuss "{newsItem.headline}"
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label htmlFor="meeting-title" className="text-sm font-medium">
                                Meeting Title
                            </label>
                            <Input
                                id="meeting-title"
                                value={meetingTitle}
                                onChange={(e) => setMeetingTitle(e.target.value)}
                                placeholder="e.g. Discussion about recent news"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="meeting-date" className="text-sm font-medium">
                                    Date
                                </label>
                                <Input
                                    id="meeting-date"
                                    type="date"
                                    value={meetingDate}
                                    onChange={(e) => setMeetingDate(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="meeting-time" className="text-sm font-medium">
                                    Time
                                </label>
                                <Input
                                    id="meeting-time"
                                    type="time"
                                    value={meetingTime}
                                    onChange={(e) => setMeetingTime(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="meeting-duration" className="text-sm font-medium">
                                Duration
                            </label>
                            <select
                                id="meeting-duration"
                                value={meetingDuration}
                                onChange={(e) => setMeetingDuration(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="15">15 minutes</option>
                                <option value="30">30 minutes</option>
                                <option value="45">45 minutes</option>
                                <option value="60">1 hour</option>
                                <option value="90">1.5 hours</option>
                                <option value="120">2 hours</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="meeting-notes" className="text-sm font-medium">
                                Meeting Notes
                            </label>
                            <Textarea
                                id="meeting-notes"
                                value={meetingNotes}
                                onChange={(e) => setMeetingNotes(e.target.value)}
                                placeholder="Add agenda or notes about the meeting..."
                                className="min-h-[100px]"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowMeetingDialog(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleScheduleMeeting}
                            disabled={!meetingTitle.trim() || !meetingDate || !meetingTime}
                        >
                            Schedule Meeting
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
} 