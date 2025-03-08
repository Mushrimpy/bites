"use client"

import * as React from "react"
import { Calendar, Mail, Phone, Building, MapPin, Clock, FileText, ArrowRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

interface Contact {
    id: string
    name: string
    company: string
    title: string
    email: string
    phone: string
    status: string
    address?: string
    notes?: string
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
        status: "pending"
    },
    {
        id: 2,
        description: "Schedule quarterly review meeting",
        dueDate: "Within 2 weeks",
        status: "pending"
    },
    {
        id: 3,
        description: "Research new ESG investment opportunities",
        dueDate: "End of month",
        status: "in-progress"
    }
]

interface ContactDetailDialogProps {
    contact: Contact | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ContactDetailDialog({ contact, open, onOpenChange }: ContactDetailDialogProps) {
    const [newStep, setNewStep] = React.useState("")

    if (!contact) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-start justify-between">
                        <div>
                            <DialogTitle className="text-xl">{contact.name}</DialogTitle>
                            <DialogDescription className="mt-1">
                                {contact.title} at {contact.company}
                            </DialogDescription>
                        </div>
                        <Badge
                            variant={
                                contact.status === "active"
                                    ? "success"
                                    : contact.status === "inactive"
                                        ? "destructive"
                                        : "outline"
                            }
                        >
                            {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                        </Badge>
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
                                    <Mail className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium">{contact.email}</p>
                                        <p className="text-xs text-muted-foreground">Email</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Phone className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium">{contact.phone}</p>
                                        <p className="text-xs text-muted-foreground">Phone</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Building className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium">{contact.company}</p>
                                        <p className="text-xs text-muted-foreground">Company</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <MapPin className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium">{contact.address || "No address provided"}</p>
                                        <p className="text-xs text-muted-foreground">Address</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <FileText className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium">{contact.notes || "No notes available"}</p>
                                        <p className="text-xs text-muted-foreground">Notes</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                            <Button variant="outline" size="sm" className="gap-2">
                                <Mail className="h-4 w-4" />
                                Send Email
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Phone className="h-4 w-4" />
                                Call
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Calendar className="h-4 w-4" />
                                Schedule Meeting
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
                                    <div key={meeting.id} className="border rounded-md p-3">
                                        <div className="flex justify-between items-start">
                                            <h4 className="text-sm font-medium">{meeting.title}</h4>
                                            <Badge variant="outline">{meeting.date}</Badge>
                                        </div>
                                        <div className="flex items-center mt-1 text-xs text-muted-foreground">
                                            <Clock className="h-3.5 w-3.5 mr-1" />
                                            {meeting.time}
                                        </div>
                                        <p className="mt-2 text-xs text-muted-foreground">{meeting.notes}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex h-[100px] items-center justify-center rounded-md border border-dashed">
                                <p className="text-sm text-muted-foreground">No past meetings found</p>
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
                                    <div key={step.id} className="flex items-center justify-between border rounded-md p-3">
                                        <div className="flex items-start gap-3">
                                            <ArrowRight className="h-4 w-4 text-muted-foreground mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium">{step.description}</p>
                                                <p className="text-xs text-muted-foreground">Due: {step.dueDate}</p>
                                            </div>
                                        </div>
                                        <Badge
                                            variant={
                                                step.status === "completed"
                                                    ? "success"
                                                    : step.status === "in-progress"
                                                        ? "outline"
                                                        : "secondary"
                                            }
                                        >
                                            {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex h-[100px] items-center justify-center rounded-md border border-dashed">
                                <p className="text-sm text-muted-foreground">No next steps defined</p>
                            </div>
                        )}

                        <div className="mt-4 space-y-2">
                            <h4 className="text-sm font-medium">Add New Step</h4>
                            <Textarea
                                placeholder="Describe the next action item..."
                                value={newStep}
                                onChange={(e) => setNewStep(e.target.value)}
                                className="min-h-[80px]"
                            />
                            <div className="flex justify-end">
                                <Button size="sm" disabled={!newStep.trim()}>
                                    Save Step
                                </Button>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>

                <DialogFooter className="mt-6">
                    <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 