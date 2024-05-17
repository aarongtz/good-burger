export interface BurgerItem {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    calorie: number;
    slug: string;
};

export interface BurgerListApiResponse {
    products: BurgerItem[]
};


export interface BurgerSavedList {
    [key: string]: BurgerItem;
};

export interface BurgerState {
    burgersArray: BurgerItem[],
    burgersObject: BurgerSavedList,
    loading: boolean
};