import { Category } from '@/types/category'
import { Tag } from '@/types/tag'

export interface ServiceImage {
    image: string;
    is_primary: boolean;
}


export interface ServiceType {
    service_type: string;
    need_moving: string;
    how_far: string;
    moving_price: string;
    related_image: string;
}


export interface Service {
    id: number;
    name: string;
    category: Category;
    tags: Tag[];

    created_at: string;
    updated_at: string;

    price?: string;
    estimated_time?: number;
    description: string;

    images?: ServiceImage[];
    service_types?: ServiceType[];
}