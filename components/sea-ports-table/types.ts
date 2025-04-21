export type LocationData = {
    id: string;
    name: string;
    city?: string;
    country: string;
    alias: string[];
    regions: string[];
    coordinates: [number, number];
    province?: string;
    timezone: string;
    unlocs: string[];
    code?: string;
};

export type LocationResponse = {
    first: number;
    prev: number | null;
    next: number | null;
    last: number;
    pages: number;
    items: number;
    data: LocationData[];
};
