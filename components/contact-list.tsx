"use client"

import { useState } from "react"
import { Search, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ContactDetailDialog } from "@/components/contact-detail-dialog"
import { cn } from "@/lib/utils"

// Mock contacts data
const contacts = [
    {
        id: "1",
        name: "John Smith",
        company: "Acme Corporation",
        title: "Chief Financial Officer",
        email: "john.smith@acmecorp.com",
        phone: "+1 (555) 123-4567",
        status: "active",
        address: "123 Wall Street, New York, NY 10005",
        notes: "Interested in expanding portfolio to include more tech investments. Has a conservative risk profile."
    },
    {
        id: "2",
        name: "Sarah Johnson",
        company: "Globex International",
        title: "CEO",
        email: "sarah.johnson@globex.com",
        phone: "+1 (555) 987-6543",
        status: "active",
        address: "456 Madison Avenue, New York, NY 10022",
        notes: "Looking for acquisition opportunities in the Asian market. Prefers high-risk, high-reward investments."
    },
    {
        id: "3",
        name: "Michael Brown",
        company: "Initech",
        title: "Director of Finance",
        email: "michael.brown@initech.com",
        phone: "+1 (555) 456-7890",
        status: "pending",
        address: "789 Broadway, New York, NY 10003",
        notes: "Very risk-averse. Prefers stable, dividend-paying investments."
    },
    {
        id: "4",
        name: "Emily Davis",
        company: "Soylent Corp",
        title: "COO",
        email: "emily.davis@soylent.com",
        phone: "+1 (555) 789-0123",
        status: "active",
        address: "101 Park Avenue, New York, NY 10178"
    },
    {
        id: "5",
        name: "Robert Wilson",
        company: "Umbrella Corporation",
        title: "VP of Operations",
        email: "robert.wilson@umbrella.com",
        phone: "+1 (555) 234-5678",
        status: "inactive",
        address: "555 Fifth Avenue, New York, NY 10017",
        notes: "Need to re-engage. Last contact was over a month ago."
    },
    {
        id: "6",
        name: "Jennifer Lee",
        company: "Wayne Enterprises",
        title: "CTO",
        email: "jennifer.lee@wayne.com",
        phone: "+1 (555) 345-6789",
        status: "active",
        address: "1007 Mountain Drive, Gotham, NY 10001",
        notes: "Interested in innovative tech startups and sustainable energy investments."
    },
]

export function ContactList() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedContact, setSelectedContact] = useState<typeof contacts[0] | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleViewContact = (contact: typeof contacts[0]) => {
        setSelectedContact(contact)
        setDialogOpen(true)
    }

    const filteredContacts = searchTerm
        ? contacts.filter(
            (contact) =>
                contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contact.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : contacts

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search contacts..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Contact
                </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredContacts.map((contact) => (
                    <Card key={contact.id} className="overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-medium">{contact.name}</h3>
                                    <p className="text-sm text-muted-foreground">{contact.title}</p>
                                    <p className="text-sm text-muted-foreground">{contact.company}</p>
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
                            <div className="mt-4 space-y-2">
                                <p className="text-sm">
                                    <span className="text-muted-foreground">Email: </span>
                                    {contact.email}
                                </p>
                                <p className="text-sm">
                                    <span className="text-muted-foreground">Phone: </span>
                                    {contact.phone}
                                </p>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1"
                                    onClick={() => handleViewContact(contact)}
                                >
                                    View
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1">
                                    Email
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <ContactDetailDialog
                contact={selectedContact}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
            />
        </div>
    )
} 