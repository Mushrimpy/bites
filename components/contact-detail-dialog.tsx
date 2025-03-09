"use client"

import * as React from "react"
import Link from "next/link"
import { Calendar, Mail, Phone, Building, MapPin, Clock, FileText, ArrowRight, Plus, Newspaper, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog"

interface Contact {
    id: string
    name: string
    company: string
    title: string
    email: string
    phone: string
    address?: string
    notes?: string
    // status is now optional since we're removing it
    status?: string
}

// Mock past meetings data
const pastMeetings = [
    {
        id: 1,
        title: "Quarterly Portfolio Review",
        date: "March 15, 2023",
        time: "10:00 AM - 11:30 AM",
        notes: "Discussed Q1 performance and market outlook. Client expressed interest in tech sector."
    },
    {
        id: 2,
        title: "Investment Strategy Session",
        date: "January 10, 2023",
        time: "2:00 PM - 3:00 PM",
        notes: "Reviewed long-term investment goals and adjusted portfolio allocation."
    },
    {
        id: 3,
        title: "Tax Planning Meeting",
        date: "December 5, 2022",
        time: "11:00 AM - 12:00 PM",
        notes: "Discussed year-end tax strategies and potential tax-loss harvesting opportunities."
    }
]

// Mock next steps data
const nextSteps = [
    {
        id: 1,
        description: "Send updated portfolio analysis report",
        dueDate: "Next week",
        priority: "high"
    },
    {
        id: 2,
        description: "Schedule quarterly review meeting",
        dueDate: "Within 2 weeks",
        priority: "medium"
    },
    {
        id: 3,
        description: "Research new ESG investment opportunities",
        dueDate: "End of month",
        priority: "low"
    }
]

interface ContactDetailDialogProps {
    contact: Contact | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ContactDetailDialog({ contact, open, onOpenChange }: ContactDetailDialogProps) {
    const [newStep, setNewStep] = React.useState("")
    const [showEmailDialog, setShowEmailDialog] = React.useState(false)
    const [showMeetingDialog, setShowMeetingDialog] = React.useState(false)
    const [emailSubject, setEmailSubject] = React.useState("")
    const [emailBody, setEmailBody] = React.useState("")
    const [meetingTitle, setMeetingTitle] = React.useState("")
    const [meetingDate, setMeetingDate] = React.useState("")
    const [meetingTime, setMeetingTime] = React.useState("")
    const [meetingDuration, setMeetingDuration] = React.useState("30")
    const [meetingNotes, setMeetingNotes] = React.useState("")

    if (!contact) return null

    const handleSendEmail = () => {
        // Demo only - show success message
        alert(`Email sent to ${contact.name} (${contact.email})`)
        setShowEmailDialog(false)
        // Reset form
        setEmailSubject("")
        setEmailBody("")
    }

    const handleScheduleMeeting = () => {
        // Demo only - show success message
        alert(`Meeting scheduled with ${contact.name} on ${meetingDate} at ${meetingTime}`)
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
                <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <div className="flex items-start justify-between">
                            <div>
                                <DialogTitle className="text-xl">{contact.name}</DialogTitle>
                                <DialogDescription className="mt-1 flex items-center">
                                    <span>{contact.title} at</span>
                                    <Badge variant="outline" className="ml-1 font-normal">
                                        {contact.company}
                                    </Badge>
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <Tabs defaultValue="info" className="mt-4">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="info">Contact Info</TabsTrigger>
                            <TabsTrigger value="meetings">Past Meetings</TabsTrigger>
                            <TabsTrigger value="next-steps">Next Steps</TabsTrigger>
                        </TabsList>

                        {/* Contact Information Tab */}
                        <TabsContent value="info" className="space-y-4 mt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <div className="flex items-start">
                                        <Mail className="h-5 w-5 text-zinc-400 mr-2 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium">{contact.email}</p>
                                            <p className="text-xs text-zinc-500">Email</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Phone className="h-5 w-5 text-zinc-400 mr-2 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium">{contact.phone}</p>
                                            <p className="text-xs text-zinc-500">Phone</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Building className="h-5 w-5 text-zinc-400 mr-2 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium">{contact.company}</p>
                                            <p className="text-xs text-zinc-500">Company</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-start">
                                        <MapPin className="h-5 w-5 text-zinc-400 mr-2 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium">{contact.address || "No address provided"}</p>
                                            <p className="text-xs text-zinc-500">Address</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <FileText className="h-5 w-5 text-zinc-400 mr-2 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium">{contact.notes || "No notes available"}</p>
                                            <p className="text-xs text-zinc-500">Notes</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-2 justify-start"
                                    onClick={() => setShowEmailDialog(true)}
                                >
                                    <Mail className="h-4 w-4" />
                                    Email
                                </Button>
                                <Button variant="outline" size="sm" className="gap-2 justify-start">
                                    <Phone className="h-4 w-4" />
                                    Call
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-2 justify-start"
                                    onClick={() => setShowMeetingDialog(true)}
                                >
                                    <Calendar className="h-4 w-4" />
                                    Schedule
                                </Button>
                                <Button variant="outline" size="sm" className="gap-2 justify-start" asChild>
                                    <Link href="/news">
                                        <Newspaper className="h-4 w-4" />
                                        News
                                    </Link>
                                </Button>
                            </div>
                        </TabsContent>

                        {/* Past Meetings Tab */}
                        <TabsContent value="meetings" className="space-y-4 mt-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium">Outlook Calendar Meetings</h3>
                                <Button variant="outline" size="sm" className="gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Sync with Outlook
                                </Button>
                            </div>

                            {pastMeetings.length > 0 ? (
                                <div className="space-y-3">
                                    {pastMeetings.map((meeting) => (
                                        <div key={meeting.id} className="border border-zinc-200 rounded-md p-3">
                                            <div className="flex justify-between items-start">
                                                <h4 className="text-sm font-medium">{meeting.title}</h4>
                                                <Badge variant="outline">{meeting.date}</Badge>
                                            </div>
                                            <div className="flex items-center mt-1 text-xs text-zinc-500">
                                                <Clock className="h-3.5 w-3.5 mr-1" />
                                                {meeting.time}
                                            </div>
                                            <p className="mt-2 text-xs text-zinc-500">{meeting.notes}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex h-[100px] items-center justify-center rounded-md border border-dashed border-zinc-200">
                                    <p className="text-sm text-zinc-500">No past meetings found</p>
                                </div>
                            )}
                        </TabsContent>

                        {/* Next Steps Tab */}
                        <TabsContent value="next-steps" className="space-y-4 mt-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium">Action Items</h3>
                                <Button variant="outline" size="sm">
                                    <Plus className="h-4 w-4 mr-1" />
                                    Add Step
                                </Button>
                            </div>

                            {nextSteps.length > 0 ? (
                                <div className="space-y-3">
                                    {nextSteps.map((step) => (
                                        <div key={step.id} className="flex items-center justify-between border border-zinc-200 rounded-md p-3">
                                            <div className="flex items-start gap-3">
                                                <ArrowRight className="h-4 w-4 text-zinc-400 mt-0.5" />
                                                <div>
                                                    <p className="text-sm font-medium">{step.description}</p>
                                                    <p className="text-xs text-zinc-500">Due: {step.dueDate}</p>
                                                </div>
                                            </div>
                                            <div className="text-xs text-zinc-500">
                                                Priority: {step.priority}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex h-[100px] items-center justify-center rounded-md border border-dashed border-zinc-200">
                                    <p className="text-sm text-zinc-500">No next steps defined</p>
                                </div>
                            )}

                            <div className="mt-4 space-y-2">
                                <h4 className="text-sm font-medium">Add New Step</h4>
                                <Textarea
                                    placeholder="Describe the next action item..."
                                    value={newStep}
                                    onChange={(e) => setNewStep(e.target.value)}
                                    className="min-h-[80px] border-zinc-200"
                                />
                                <div className="flex justify-end">
                                    <Button size="sm" disabled={!newStep.trim()}>
                                        Save Step
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>

                    <DialogFooter className="mt-6 sm:justify-between">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/crm">
                                Create Trigger
                            </Link>
                        </Button>
                        <DialogClose asChild>
                            <Button variant="outline">Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Email Dialog */}
            <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Send Email to {contact.name}</DialogTitle>
                        <DialogDescription>
                            Compose an email to send to {contact.email}
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
                        <DialogTitle>Schedule Meeting with {contact.name}</DialogTitle>
                        <DialogDescription>
                            Set up a meeting with {contact.name} from {contact.company}
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
                                placeholder="e.g. Quarterly Portfolio Review"
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