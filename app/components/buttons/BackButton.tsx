"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function BackButton({ path }: { path: string }) {
    const router = useRouter();

    return (
        <button
            type="button"
            className="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() => {router.push(path)}}
        >
            <ArrowLeftIcon width={16} className="inline -translate-y-0.5" /> Back
        </button>
    );
}