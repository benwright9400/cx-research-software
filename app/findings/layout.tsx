"use client";
import { ReactNode } from "react";
import DocumentUploadButton from "../components/buttons/DocumentUploadButton";
import { usePathname } from "next/navigation";
import BackButton from "../components/buttons/BackButton";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    return (
        <div>
            <div className="border-b border-gray-200 pb-5 dark:border-gray-400 mb-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-600">Findings</h3>
            </div>
            <div className="max-w-full flex flex-row mb-4">
                {
                    !pathname.endsWith("/findings") && !pathname.endsWith("/findings/") ? <BackButton path="/findings" /> : null
                }
                <DocumentUploadButton />
            </div>
            {children}
        </div>
    );
}