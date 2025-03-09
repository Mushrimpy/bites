"use client"

import { useState, useMemo } from "react"
import { Search, Plus, Filter, X, ArrowUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ContactDetailDialog } from "@/components/contact-detail-dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
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
        address: "101 Park Avenue, New York, NY 10178"
    },
    {
        id: "5",
        name: "Robert Wilson",
        company: "Umbrella Corporation",
        title: "VP of Operations",
        email: "robert.wilson@umbrella.com",
        phone: "+1 (555) 234-5678",
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
        address: "1007 Mountain Drive, Gotham, NY 10001",
        notes: "Interested in innovative tech startups and sustainable energy investments."
    },
]

// Update the contact data to remove status
const updatedContacts = contacts.map(contact => {
    // Create a new object without the status property
    const { status, ...contactWithoutStatus } = contact as any;
    return contactWithoutStatus;
});

export function ContactList() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedContact, setSelectedContact] = useState<typeof updatedContacts[0] | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
    const [sortColumn, setSortColumn] = useState<string | null>("name")
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [viewMode, setViewMode] = useState<"grid" | "table">("table")

    // Extract unique companies for filter
    const companies = useMemo(() => {
        return Array.from(new Set(updatedContacts.map(contact => contact.company))).sort()
    }, [])

    const handleViewContact = (contact: typeof updatedContacts[0]) => {
        setSelectedContact(contact)
        setDialogOpen(true)
    }

    const toggleCompanyFilter = (company: string) => {
        setSelectedCompanies(prev =>
            prev.includes(company)
                ? prev.filter(c => c !== company)
                : [...prev, company]
        )
    }

    const clearCompanyFilters = () => {
        setSelectedCompanies([])
    }

    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
    }

    // Filter contacts based on search term and selected companies
    const filteredContacts = useMemo(() => {
        return updatedContacts.filter(contact => {
            // Apply search filter
            const matchesSearch =
                searchTerm === "" ||
                contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (contact.title && contact.title.toLowerCase().includes(searchTerm.toLowerCase()))

            // Apply company filter
            const matchesCompany =
                selectedCompanies.length === 0 ||
                selectedCompanies.includes(contact.company)

            return matchesSearch && matchesCompany
        })
    }, [searchTerm, selectedCompanies])

    // Sort filtered contacts
    const sortedContacts = useMemo(() => {
        return [...filteredContacts].sort((a, b) => {
            if (!sortColumn) return 0

            let valueA, valueB

            switch (sortColumn) {
                case "name":
                    valueA = a.name
                    valueB = b.name
                    break
                case "company":
                    valueA = a.company
                    valueB = b.company
                    break
                case "title":
                    valueA = a.title || ""
                    valueB = b.title || ""
                    break
                default:
                    return 0
            }

            if (valueA < valueB) return sortDirection === "asc" ? -1 : 1
            if (valueA > valueB) return sortDirection === "asc" ? 1 : -1
            return 0
        })
    }, [filteredContacts, sortColumn, sortDirection])

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                    <Input
                        placeholder="Search contacts..."
                        className="pl-9 border-zinc-200"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-10 border-zinc-200">
                                <Filter className="mr-2 h-4 w-4" />
                                Filter by Company
                                {selectedCompanies.length > 0 && (
                                    <Badge variant="secondary" className="ml-2">
                                        {selectedCompanies.length}
                                    </Badge>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            {companies.map(company => (
                                <DropdownMenuCheckboxItem
                                    key={company}
                                    checked={selectedCompanies.includes(company)}
                                    onCheckedChange={() => toggleCompanyFilter(company)}
                                >
                                    {company}
                                </DropdownMenuCheckboxItem>
                            ))}
                            {selectedCompanies.length > 0 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full mt-2 text-xs justify-start text-zinc-500"
                                    onClick={clearCompanyFilters}
                                >
                                    <X className="mr-2 h-3 w-3" />
                                    Clear filters
                                </Button>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="flex items-center rounded-md border border-zinc-200 p-1 bg-zinc-50">
                        <Button
                            variant={viewMode === "table" ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => setViewMode("table")}
                            className="px-2.5"
                        >
                            Table
                        </Button>
                        <Button
                            variant={viewMode === "grid" ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => setViewMode("grid")}
                            className="px-2.5"
                        >
                            Grid
                        </Button>
                    </div>

                    <Button size="sm" className="h-10" asChild>
                        <a href="/news">
                            View News
                        </a>
                    </Button>

                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Contact
                    </Button>
                </div>
            </div>

            {selectedCompanies.length > 0 && (
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-zinc-500">Filtered by:</span>
                    <div className="flex flex-wrap gap-2">
                        {selectedCompanies.map(company => (
                            <Badge key={company} variant="outline" className="flex items-center gap-1 border-zinc-200">
                                {company}
                                <button
                                    onClick={() => toggleCompanyFilter(company)}
                                    className="ml-1 rounded-full hover:bg-zinc-100 p-0.5"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        ))}
                    </div>
                </div>
            )}

            {sortedContacts.length > 0 ? (
                viewMode === "table" ? (
                    <div className="rounded-lg overflow-hidden border border-zinc-200 shadow-sm">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-zinc-50">
                                    <TableHead
                                        className="cursor-pointer"
                                        onClick={() => handleSort("name")}
                                    >
                                        <div className="flex items-center">
                                            Name
                                            {sortColumn === "name" && (
                                                <ArrowUpDown className="ml-2 h-4 w-4 text-zinc-400" />
                                            )}
                                        </div>
                                    </TableHead>
                                    <TableHead
                                        className="cursor-pointer"
                                        onClick={() => handleSort("title")}
                                    >
                                        <div className="flex items-center">
                                            Title
                                            {sortColumn === "title" && (
                                                <ArrowUpDown className="ml-2 h-4 w-4 text-zinc-400" />
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
                                                <ArrowUpDown className="ml-2 h-4 w-4 text-zinc-400" />
                                            )}
                                        </div>
                                    </TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sortedContacts.map((contact, index) => (
                                    <TableRow
                                        key={contact.id}
                                        className={cn(
                                            "group hover:bg-zinc-50",
                                            index % 2 === 0 ? "bg-white" : "bg-zinc-50/50"
                                        )}
                                    >
                                        <TableCell className="font-medium">{contact.name}</TableCell>
                                        <TableCell>{contact.title}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="font-normal border-zinc-200">
                                                {contact.company}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{contact.email}</TableCell>
                                        <TableCell>{contact.phone}</TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleViewContact(contact)}
                                            >
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {sortedContacts.map((contact) => (
                            <Card key={contact.id} className="overflow-hidden border-zinc-200">
                                <div className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-medium">{contact.name}</h3>
                                            <p className="text-sm text-zinc-500">{contact.title}</p>
                                            <p className="text-sm text-zinc-500">
                                                <Badge variant="outline" className="mt-1 font-normal border-zinc-200">
                                                    {contact.company}
                                                </Badge>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        <p className="text-sm">
                                            <span className="text-zinc-500">Email: </span>
                                            {contact.email}
                                        </p>
                                        <p className="text-sm">
                                            <span className="text-zinc-500">Phone: </span>
                                            {contact.phone}
                                        </p>
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1 border-zinc-200"
                                            onClick={() => handleViewContact(contact)}
                                        >
                                            View
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1 border-zinc-200"
                                        >
                                            Email
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )
            ) : (
                <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed border-zinc-200">
                    <p className="text-sm text-zinc-500">No contacts found</p>
                </div>
            )}

            <ContactDetailDialog
                contact={selectedContact}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
            />
        </div>
    )
} 