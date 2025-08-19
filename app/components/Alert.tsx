import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { XCircleIcon } from '@heroicons/react/24/outline'

export default function Alert({ success, message, onDismiss }: { success: boolean, message: string, onDismiss: () => void }) {

    if (!success) {
        return (
            <div className="rounded-md bg-red-50 p-4 dark:bg-red-500/10 dark:outline dark:outline-1 dark:outline-red-500/20">
                <div className="flex">
                    <div className="shrink-0">
                        <XCircleIcon aria-hidden="true" className="size-5 text-red-400" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-red-800 dark:text-red-300">{message}</p>
                    </div>
                    <div className="ml-auto pl-3">
                        <div className="-mx-1.5 -my-1.5">
                            <button
                                type="button"
                                className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-red-50 dark:bg-transparent dark:text-red-400 dark:hover:bg-red-500/10 dark:focus-visible:ring-red-500 dark:focus-visible:ring-offset-1 dark:focus-visible:ring-offset-red-900"
                                onClick={onDismiss}
                            >
                                <span className="sr-only">Dismiss</span>
                                <XMarkIcon aria-hidden="true" className="size-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="rounded-md bg-green-50 p-4 dark:bg-green-500/10 dark:outline dark:outline-1 dark:outline-green-500/20">
            <div className="flex">
                <div className="shrink-0">
                    <CheckCircleIcon aria-hidden="true" className="size-5 text-green-400" />
                </div>
                <div className="ml-3">
                    <p className="text-sm font-medium text-green-800 dark:text-green-300">{message}</p>
                </div>
                <div className="ml-auto pl-3">
                    <div className="-mx-1.5 -my-1.5">
                        <button
                            type="button"
                            className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 focus-visible:ring-offset-green-50 dark:bg-transparent dark:text-green-400 dark:hover:bg-green-500/10 dark:focus-visible:ring-green-500 dark:focus-visible:ring-offset-1 dark:focus-visible:ring-offset-green-900"
                            onClick={onDismiss}
                        >
                            <span className="sr-only">Dismiss</span>
                            <XMarkIcon aria-hidden="true" className="size-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
