"use client";

import { Toaster } from "@/components/ui/sonner";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import store from "@/redux/store";

export default function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Provider store={store}>
                {children}
            </Provider>
        );
    }

    return (
        <Provider store={store}>
            {children}
            <Toaster />
        </Provider>
    );
}