"use client";

import { Toaster } from "@/components/ui/sonner";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import store from "@/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export default function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(new QueryClient());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </Provider>
        );
    }

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                {children}
                <Toaster />
            </QueryClientProvider>
        </Provider>
    );
}