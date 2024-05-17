export interface CartState {
    userItemsCount: number | null;
}

interface TransactionCartSumAggregate {
    amount: number | null;
}

export interface CartItemsNumberResponse {
    _sum: TransactionCartSumAggregate;
}

export interface CartListItem {
    id: string;
    burgerSlug: string;
    amount: number;
    userId: string;
}

export interface DeleteManyResponse {
    count: number
}