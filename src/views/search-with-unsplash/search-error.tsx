import { SearchIcon } from 'lucide-react';

export const SearchError = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 py-16">
            <SearchIcon className="w-12 h-12 text-gray-400" />
            <h3 className="text-2xl font-bold">Something went wrong.</h3>
            <p className="text-gray-500 dark:text-gray-400">
                Please try again later.
            </p>
        </div>
    );
};
