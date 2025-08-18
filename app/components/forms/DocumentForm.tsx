import { DocumentIcon } from "@heroicons/react/24/outline";

export default function DocumentForm() {
    return (
        <div className="space-y-8 border-b border-white/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-white/10 sm:border-t sm:border-t-white/10 sm:pb-0">
            <label htmlFor="cover-photo" className="block text-base font-semibold dark:text-gray-200 text-gray-900 pl-4 py-2 sm:pt-1.5">
                Add Document
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex max-w-2xl justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                        <DocumentIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                        <div className="mt-4 flex text-sm/6 text-gray-600">
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:text-indigo-500"
                            >
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1 dark:text-gray-200">or drag and drop</p>
                        </div>
                        <p className="text-xs/5 text-gray-600 dark:text-gray-200">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>
            </div>
        </div>
    );
}