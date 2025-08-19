"use client";

import { ReactNode } from "react";
import { DrawerProvider } from "./child-providers/DrawerProvider";
import { NextAuthSessionProvider } from "./child-providers/SessionProvider";
import { ConfirmationDialogueProvider } from "./child-providers/ConfirmationDialogProvider";

export default function RootProvider({ children }: { children: ReactNode }) {
    return (
        <NextAuthSessionProvider>
            <DrawerProvider>
                <ConfirmationDialogueProvider>
                    {children}
                </ConfirmationDialogueProvider>
            </DrawerProvider>
        </NextAuthSessionProvider>
    );
}