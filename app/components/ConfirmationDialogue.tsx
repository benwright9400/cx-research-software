'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useConfirmationDialogue } from '../providers/child-providers/ConfirmationDialogProvider'

export default function ConfirmationDialogue() {
    const confirmationDialogue = useConfirmationDialogue();

    return (
        <Dialog open={confirmationDialogue.isOpen} onClose={confirmationDialogue.closePopup} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in dark:bg-gray-900/50"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 dark:bg-gray-800 dark:outline dark:outline-1 dark:-outline-offset-1 dark:outline-white/10"
                    >
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10 dark:bg-red-500/10">
                                <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600 dark:text-red-400" />
                            </div>
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <DialogTitle as="h3" className="text-base font-semibold text-gray-900 dark:text-white">
                                    {confirmationDialogue.title}
                                </DialogTitle>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {confirmationDialogue.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:ml-10 sm:mt-4 sm:flex sm:pl-4">
                            <button
                                type="button"
                                onClick={() => {confirmationDialogue.callback(); confirmationDialogue.closePopup();}}
                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto dark:bg-red-500 dark:hover:bg-red-400"
                            >
                                Proceed
                            </button>
                            <button
                                type="button"
                                data-autofocus
                                onClick={() => confirmationDialogue.closePopup()}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:mt-0 sm:w-auto dark:bg-white/10 dark:text-white dark:ring-white/5 dark:hover:bg-white/20"
                            >
                                Cancel
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
