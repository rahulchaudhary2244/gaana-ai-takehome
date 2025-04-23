type Props = {
    rows?: number;
};

export const HomePageSkeleton = ({ rows = 10 }: Props) => {
    return (
        <div className="space-y-4 animate-pulse">
            {/* Search Bar */}
            <div className="w-full h-9 bg-gray-200 dark:bg-gray-700 rounded" />

            {/* Column Visibility Filters */}
            <div className="w-full h-5 bg-gray-200 dark:bg-gray-700 rounded" />

            {/* Table Skeleton */}
            <div className="mt-4 rounded border border-gray-300 dark:border-gray-700 overflow-hidden">
                {/* Table Header */}
                <div className="h-10 w-full bg-gray-300 dark:bg-gray-600" />

                {/* Table Rows */}
                <div className="divide-y divide-gray-300 dark:divide-gray-700">
                    {Array.from({ length: rows }).map((_, i) => (
                        <div
                            key={i}
                            className="h-[3.289rem] w-full bg-gray-200 dark:bg-gray-700"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
