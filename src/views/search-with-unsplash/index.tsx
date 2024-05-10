'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenu,
} from '@/components/ui/dropdown-menu';
import { PaletteIcon } from '@/components/icons/palette';
import { ChevronDownIcon } from '@/components/icons/chevron-down';
import { ArrowUpDownIcon } from '@/components/icons/arrown-up-down-icon';
import { useUnsplashStore } from '@/lib/store/unsplash-store';
import { UnsplashResults } from './unsplash-results';
import { useQuery } from '@tanstack/react-query';
import { UnsplashApiResponse, fetchPhotos } from '@/lib/api';
import { Pagination } from './pagination';
import { NoResults } from './no-results';
import { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { SearchError } from './search-error';

const SearchWithUnsplash = () => {
    const {
        query,
        setQuery,
        sortByLatest,
        setSortByLatest,
        page,
        color,
        setColor,
    } = useUnsplashStore();
    const [inputValue, setInputValue] = useState('');

    const { data, error, isLoading } = useQuery<UnsplashApiResponse>({
        queryKey: ['photos', page, query, color, sortByLatest],
        queryFn: () => fetchPhotos(page, query, color, sortByLatest),
        enabled: !!query,
    });

    const debouncedQuery = useCallback(
        debounce((newQuery: string) => {
            if (!newQuery) return;
            setQuery(newQuery);
        }, 300),
        [],
    ); // 300 ms delay

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        debouncedQuery(event.target.value);
    };

    return (
        <div className="max-w-6xl mx-auto p-8">
            <div className="flex flex-col space-y-6">
                <Input
                    className="w-full"
                    placeholder="Search Unsplash..."
                    value={inputValue}
                    onChange={handleSearchChange}
                />
                <div className="flex justify-end items-center space-x-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <PaletteIcon className="w-4 h-4 mr-2" />
                                <span>Color</span>
                                <ChevronDownIcon className="w-4 h-4 ml-2" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {[
                                'black_and_white',
                                'black',
                                'white',
                                'yellow',
                                'orange',
                                'red',
                                'purple',
                                'magenta',
                                'green',
                                'teal',
                                'blue',
                            ].map((color) => (
                                <DropdownMenuItem
                                    key={color}
                                    onClick={() => setColor(color)}
                                >
                                    {color}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                        variant={sortByLatest ? 'default' : 'outline'}
                        onClick={() => setSortByLatest(!sortByLatest)}
                    >
                        <ArrowUpDownIcon className="w-4 h-4 mr-2" />
                        Order by {sortByLatest ? 'Relevant' : 'Latest'}
                    </Button>
                </div>
                {error ? (
                    <SearchError />
                ) : query ? (
                    <UnsplashResults
                        results={data?.results}
                        isLoading={isLoading}
                    />
                ) : (
                    <NoResults />
                )}
                <Pagination total_pages={data?.total_pages ?? 0} />
            </div>
        </div>
    );
};

export default SearchWithUnsplash;
