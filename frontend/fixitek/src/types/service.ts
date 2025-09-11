import { Category } from '@/types/category'
import { Tag } from '@/types/tag'

export interface Service {
    id: number;
    name: string;
    category: Category[];
    tags: Tag[];

    created_at: string;
    updated_at: string;

    price?: string;
    estimated_time?: number;
    description: string;


    photo?: string | null;
}