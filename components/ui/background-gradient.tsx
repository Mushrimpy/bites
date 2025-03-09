"use client"

export function BackgroundGradient() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            {/* Grid pattern */}
            <div
                className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"
                style={{
                    backgroundSize: '40px 40px',
                    backgroundImage: `
                        linear-gradient(to right, #71717a 1px, transparent 1px),
                        linear-gradient(to bottom, #71717a 1px, transparent 1px)
                    `
                }}
            />

            {/* Subtle gradient blobs */}
            <div className="absolute left-[-20%] top-[-10%] h-[600px] w-[600px] rounded-full bg-zinc-200/40 dark:bg-zinc-800/30 blur-[100px]" />
            <div className="absolute right-[-20%] bottom-[-10%] h-[600px] w-[600px] rounded-full bg-zinc-300/40 dark:bg-zinc-700/30 blur-[100px]" />

            {/* Radial gradient */}
            <div
                className="absolute inset-0 bg-radial-gradient opacity-20 dark:opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(circle at center, rgba(161, 161, 170, 0.2) 0%, transparent 70%)',
                    backgroundSize: '100% 100%'
                }}
            />
        </div>
    )
} 