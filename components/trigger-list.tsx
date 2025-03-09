"use client"

import { useState } from "react"
import { Search, Plus, Mail, Calendar, Bell, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Mock triggers data
const triggers = [
    {
        id: "1",
        type: "email",
        name: "Earnings Report Follow-up",
        description: "Send follow-up email when client company releases earnings report",
        client: "John Smith",
        company: "Acme Corporation",
        keywords: ["earnings", "quarterly report", "financial results"],
        status: "active",
        lastTriggered: "2 days ago",
    },
    {
        id: "2",
        type: "meeting",
        name: "Acquisition Discussion",
        description: "Schedule meeting when news about potential acquisitions appears",
        client: "Sarah Johnson",
        company: "Globex International",
        keywords: ["acquisition", "merger", "takeover", "buy"],
        status: "active",
        lastTriggered: "1 week ago",
    },
    {
        id: "3",
        type: "email",
        name: "Regulatory Alert",
        description: "Send email alert when regulatory news mentions client",
        client: "Michael Brown",
        company: "Initech",
        keywords: ["regulation", "compliance", "SEC", "investigation"],
        status: "active",
        lastTriggered: "Never",
    },
    {
        id: "4",
        type: "meeting",
        name: "New Product Launch",
        description: "Schedule meeting when client launches new product",
        client: "Emily Davis",
        company: "Soylent Corp",
        keywords: ["launch", "new product", "release", "unveil"],
        status: "inactive",
        lastTriggered: "3 months ago",
    },
    {
        id: "5",
        type: "email",
        name: "Stock Price Alert",
        description: "Send email when stock price changes significantly",
        client: "Robert Wilson",
        company: "Umbrella Corporation",
        keywords: ["stock price", "shares", "market cap", "valuation"],
        status: "active",
        lastTriggered: "Yesterday",
    },
    {
        id: "6",
        type: "meeting",
        name: "Technology Innovation",
        description: "Schedule meeting when client announces new technology",
        client: "Jennifer Lee",
        company: "Wayne Enterprises",
        keywords: ["innovation", "technology", "patent", "R&D"],
        status: "active",
        lastTriggered: "2 weeks ago",
    },
]

export function TriggerList() {
    const [searchTerm, setSearchTerm] = useState("")
    const [activeTab, setActiveTab] = useState("all")

    const filteredTriggers = triggers
        .filter(
            (trigger) =>
                (activeTab === "all" ||
                    (activeTab === "email" && trigger.type === "email") ||
                    (activeTab === "meeting" && trigger.type === "meeting")) &&
                (searchTerm === "" ||
                    trigger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    trigger.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    trigger.company.toLowerCase().includes(searchTerm.toLowerCase()))
        )

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search triggers..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Trigger
                </Button>
            </div>

            <Tabs defaultValue="all" onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="all">All Triggers</TabsTrigger>
                    <TabsTrigger value="email">Email Triggers</TabsTrigger>
                    <TabsTrigger value="meeting">Meeting Triggers</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-4">
                    <div className="grid gap-4">
                        {filteredTriggers.length > 0 ? (
                            filteredTriggers.map((trigger) => (
                                <Card key={trigger.id}>
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-2">
                                                {trigger.type === "email" ? (
                                                    <Mail className="mt-1 h-4 w-4 text-blue-500" />
                                                ) : (
                                                    <Calendar className="mt-1 h-4 w-4 text-green-500" />
                                                )}
                                                <div>
                                                    <CardTitle className="text-base">{trigger.name}</CardTitle>
                                                    <CardDescription className="mt-1">
                                                        {trigger.client} • {trigger.company}
                                                    </CardDescription>
                                                </div>
                                            </div>
                                            <Badge
                                                variant={trigger.status === "active" ? "success" : "outline"}
                                            >
                                                {trigger.status.charAt(0).toUpperCase() + trigger.status.slice(1)}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">{trigger.description}</p>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {trigger.keywords.map((keyword) => (
                                                <Badge key={keyword} variant="outline">
                                                    {keyword}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <Bell className="mr-2 h-4 w-4" />
                                                Last triggered: {trigger.lastTriggered}
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm">
                                                    Edit
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    {trigger.status === "active" ? "Disable" : "Enable"}
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
                                <div className="flex flex-col items-center text-center">
                                    <AlertTriangle className="h-8 w-8 text-muted-foreground" />
                                    <h3 className="mt-2 text-sm font-medium">No triggers found</h3>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Create a new trigger to get started
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
} 