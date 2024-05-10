import { Card } from '@/components/ui/card';
import { UnsplashApiResponse } from '@/lib/api';
import { NoResults } from './no-results';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import chunk from 'lodash.chunk';

interface UnsplashResultProps {
    results?: UnsplashApiResponse['results'];
    isLoading?: boolean;
}

export const UnsplashResults = ({
    results,
    isLoading,
}: UnsplashResultProps) => {
    const firstColumn = results?.filter((_, index) => index % 3 === 0);
    const secondColumn = results?.filter((_, index) => index % 3 === 1);
    const thirdColumn = results?.filter((_, index) => index % 3 === 2);

    if (results?.length === 0) return <NoResults />;

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <Skeleton className="w-full h-52" />
                <Skeleton className="w-full h-52" />
                <Skeleton className="w-full h-52" />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-20">
            <div className="grid gap-4">
                {firstColumn?.map((result) => (
                    <Image
                        alt="Result"
                        className="object-fill w-full h-auto rounded-md"
                        height="200"
                        src={result.urls.regular}
                        width="200"
                    />
                ))}
            </div>
            <div className="grid gap-4">
                {secondColumn?.map((result) => (
                    <Image
                        alt="Result"
                        className="object-fill w-full h-auto rounded-md"
                        height="200"
                        src={result.urls.regular}
                        width="200"
                    />
                ))}
            </div>
            <div className="grid gap-4">
                {thirdColumn?.map((result) => (
                    <Image
                        alt="Result"
                        className="object-fill w-full h-auto rounded-md"
                        height="200"
                        src={result.urls.regular}
                        width="200"
                    />
                ))}
            </div>
        </div>
    );
};
