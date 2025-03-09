import { ContactList } from "@/components/contact-list"
import { PageHeader } from "@/components/page-header"

export default function ContactsPage() {
    return (
        <div className="container pb-16">
            <PageHeader
                title="Contacts"
                description="Manage your client contacts"
            />
            <ContactList />
        </div>
    )
} 