export interface Order {
    id: number
    status: string
    customer: {
        user: {
            first_name: string
            last_name: string
        }
    }
}