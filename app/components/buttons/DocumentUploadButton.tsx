"use client";

import { useDrawer } from "@/app/providers/child-providers/DrawerProvider";

export default function DocumentUploadButton() {
    const popup = useDrawer();

    return (
        <button
            type="button"
            className="ml-auto w-fit rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() => { popup.openPopup(); popup.setTitle("Document Management"); }}
        >
            Manage Documents
        </button>
    );
}