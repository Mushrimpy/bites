import { NewsFeed } from "@/components/news-feed"
import { PageHeader } from "@/components/page-header"

export default function NewsPage() {
    return (
        <div className="container pb-16">
            <PageHeader
                title="Client News"
                description="Stay updated with the latest news about your clients"
            />
            <NewsFeed />
        </div>
    )
} 