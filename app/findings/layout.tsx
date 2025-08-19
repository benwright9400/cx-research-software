import { ReactNode } from "react";
import DocumentUploadButton from "../components/buttons/DocumentUploadButton";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <div className="border-b border-gray-200 pb-5 dark:border-gray-400 mb-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-600">Findings</h3>
            </div>
            <div className="ml-auto w-fit">
                <DocumentUploadButton />
            </div>
            {children}
        </div>
    );
}