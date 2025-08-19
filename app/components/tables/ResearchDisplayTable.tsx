"use client";

import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react';

export default function ResearchDisplayTable() {
    const [uploadedFiles, setUploadedFiles] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getUploadedFiles();
    }, [])

    async function getUploadedFiles() {
        setIsLoading(true);

        const res = await fetch("/api/files")
        const body = await res.json();

        console.log(body.files);
        setUploadedFiles(body.files);

        setIsLoading(false);
    }

    if (isLoading) {
        return <div className='text-center mt-20'>
            <p>Loading...</p>
        </div>
    }

    return (
        <ul role="list" className="divide-y divide-gray-100 dark:divide-white/5 mt-8">
            {uploadedFiles.map((file) => (
                <li
                    key={file.uri}
                    className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8 dark:hover:bg-gray/[0.04]"
                >
                    <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm/6 font-semibold text-gray-900 dark:text-gray-600">
                                <a href={"/findings/" + file.fileName}>
                                    <span className="absolute inset-x-0 -top-px bottom-0" />
                                    {file.fileName}
                                </a>
                            </p>
                            {/* <p className="mt-1 flex text-xs/5 text-gray-500 dark:text-gray-400">
                                <a href={`mailto:${person.email}`} className="relative truncate hover:underline">
                                    {person.email}
                                </a>
                            </p> */}
                        </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-x-4">
                        <ChevronRightIcon aria-hidden="true" className="size-5 flex-none text-gray-400 dark:text-gray-500" />
                    </div>
                </li>
            ))}
        </ul>
    )
}
