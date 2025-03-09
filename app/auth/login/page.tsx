'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Redirect after successful login
    supabase.auth.onAuthStateChange((event) => {
        if (event === 'SIGNED_IN') {
            router.push('/');
            router.refresh();
        }
    });

    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h1 className="text-center text-3xl font-bold tracking-tight">
                        Investment Banking CRM
                    </h1>
                    <h2 className="mt-6 text-center text-2xl font-bold tracking-tight">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-8 bg-white p-6 shadow rounded-lg">
                    <Auth
                        supabaseClient={supabase}
                        appearance={{ theme: ThemeSupa }}
                        theme="light"
                        providers={['google', 'github']}
                        redirectTo={`${window.location.origin}/auth/callback`}
                    />
                </div>
            </div>
        </div>
    );
} 