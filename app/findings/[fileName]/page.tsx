"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogPostPage() {
    const params = useParams<{ fileName: string }>();

    const [findings, setFindings] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getFindings();
    }, []);

    async function getFindings() {
        setIsLoading(true);

        // request
        const res = await fetch("/api/analyses?fileName=" + params.fileName);
        const body = await res.json();

        console.log(body);
        setFindings(body);

        setIsLoading(false);
    }

    if (isLoading) {
        return <div className='text-center mt-20'>
            <p>Loading...</p>
        </div>
    }

    return (
        <div>
            {/* Purpose */}
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-600">{decodeURIComponent(params.fileName)}</h3>
            <p className="mt-2 max-w-4xl text-sm text-gray-500 dark:text-gray-400">
                {findings?.purpose?.purpose}
            </p>

            {/* Two columns, one titled themes, the other codes */}
            <div className="py-4 min-h-full">
                <div className={"grid grid-cols-1 gap-4 min-h-full" + findings?.themes && findings?.themes?.length > 0 ? " md:grid-cols-2" : null}>
                    {/* Column 1 */}

                    {!findings?.themes || findings?.themes?.length != 0 ? <div className="bg-white p-4 rounded-lg shadow h-96">
                        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-600">
                            Themes
                        </h2>

                        <div className="h-[90%] overflow-y-scroll py-4">
                            {
                                findings?.themes?.map((item) => {
                                    return <div className="pt-4">
                                        <h5 className="text-md font-semibold text-gray-900 dark:text-gray-600">{item?.theme}</h5>
                                        <p className="mt-2 max-w-4xl text-sm text-gray-500 dark:text-gray-400">
                                            {item?.description}
                                        </p>
                                    </div>
                                })
                            }
                        </div>

                    </div> : null}

                    {/* Column 2 */}
                    <div className="bg-white p-4 rounded-lg shadow h-96">
                        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-600">
                            Codes
                        </h2>

                        <div className="h-[90%] overflow-y-scroll py-4">
                            {
                                findings?.codes?.map((item) => {
                                    return <div className="pt-4">
                                        <h5 className="text-md font-semibold text-gray-900 dark:text-gray-600">{item?.code}</h5>
                                        <p className="mt-2 max-w-4xl text-sm text-gray-500 dark:text-gray-400">
                                            {item?.rationale}
                                        </p>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}