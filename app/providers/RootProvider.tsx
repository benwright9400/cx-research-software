"use client";

import { ReactNode } from "react";
import { PopupProvider } from "./child-providers/PopupProvider";
import { NextAuthSessionProvider } from "./child-providers/SessionProvider";

export default function RootProvider({ children }: { children: ReactNode }) {
    return (
        <NextAuthSessionProvider>
            <PopupProvider>
                {children}
            </PopupProvider>
        </NextAuthSessionProvider>
    );
}