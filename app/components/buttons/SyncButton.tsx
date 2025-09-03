import { Button } from "@headlessui/react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function SyncButton({ onPressed }) {

    return (
        <Button onClick={onPressed} type="button" className="ml-auto rounded bg-white py-0.5 h-fit mt-auto px-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <ArrowPathIcon width={16} className="inline -translate-y-0.5" /> Sync
        </Button>
    );
}