'use client';

import { Button } from '@/components/ui/button';
import { useUnsplashStore } from '@/lib/store/unsplash-store';

interface PaginationProps {
    total_pages: number;
}

export const Pagination = ({ total_pages }: PaginationProps) => {
    const { page, setPage } = useUnsplashStore();

    const renderPagination = () => {
        const pages = [];
        const totalPages = total_pages ?? 1;
        const maxPage = Math.min(totalPages, 5);
        for (let i = 1; i <= maxPage; i++) {
            const variant = i === page ? 'default' : 'secondary';
            pages.push(
                <Button key={i} variant={variant} onClick={() => setPage(i)}>
                    {i}
                </Button>,
            );
        }
        return (
            <div className="flex justify-end space-x-2">
                {page > 1 && (
                    <Button
                        variant="secondary"
                        onClick={() => setPage(page - 1)}
                    >
                        Previous
                    </Button>
                )}
                {pages}
                {page < totalPages && (
                    <Button
                        variant="secondary"
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </Button>
                )}
            </div>
        );
    };

    return renderPagination();
};
