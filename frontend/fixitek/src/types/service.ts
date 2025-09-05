export interface Service {
    id: number;
    name: string;
    category: number;
    description: string;
    price: string;
    estimated_time: number;
    photo?: string;
    tags: number[];
}