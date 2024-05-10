export interface UnsplashApiResponse {
    total_pages: number;
    results: UnsplashResult[];
}

type UnsplashResult = {
    urls: {
        regular: string;
    };
}

export const fetchPhotos = async (page: number, query: string, color: string, orderByLatest?: boolean) => {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}${color && `&color=${color}`}&page=${page}&per_page=21${orderByLatest ? '&order_by=latest' : '&order_by=relevant'}`, {
        headers: {
            Authorization: 'Client-ID <client id>'
        }
    });
    return response.json();
};