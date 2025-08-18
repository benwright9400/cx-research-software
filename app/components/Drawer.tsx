'use client'

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { PopupContextType, usePopup } from '../providers/child-providers/PopupProvider'
import DocumentForm from './forms/DocumentForm';
import DocumentTable from './tables/DocumentTable';

// Written to eventually include multiple drawer pages through dynamic imports
export default function Drawer() {
  const popup: PopupContextType = usePopup();

  /* 
    1. Add context
    2. Link drawer to context
    3. Add drawer to layout
  */

  return (
    <div>
      <Dialog open={popup.isOpen} onClose={popup.closePopup} className="relative z-10">
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-2xl transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                <div className="relative flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl dark:bg-gray-800 dark:after:absolute dark:after:inset-y-0 dark:after:left-0 dark:after:w-px dark:after:bg-white/10">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start pt-16 md:pt-0  justify-between">
                      <DialogTitle className="text-base font-semibold text-gray-900 dark:text-white">
                        {popup.title}
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => popup.closePopup()}
                          className="relative rounded-md text-gray-400 hover:text-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:hover:text-white dark:focus-visible:outline-indigo-500"
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    {/* Your content */}
                    <DocumentForm />
                    <DocumentTable />
                    </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
