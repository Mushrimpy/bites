import { TriggerList } from "@/components/trigger-list"
import { PageHeader } from "@/components/page-header"

export default function CrmPage() {
    return (
        <div className="container pb-16">
            <PageHeader
                title="CRM Triggers"
                description="Manage email and meeting triggers based on client news"
            />
            <TriggerList />
        </div>
    )
} 