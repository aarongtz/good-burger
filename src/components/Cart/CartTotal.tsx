'use client';

import { useAppSelector } from "@/store";
import { CartListItem } from "@/typings/Cart";
import { useMemo } from "react";

interface CartTotalProps {
    cartListItems: CartListItem[];
};

export const CartTotal = ({ cartListItems }: CartTotalProps) => {
    const { burgersObject } = useAppSelector(state => state.burgerReducer);

    const getTotal = useMemo(() => {
        return cartListItems.reduce((total: number, currentValue: CartListItem) => {
            const burgerItem = burgersObject[currentValue.burgerSlug];

            return total + (burgerItem.price * currentValue.amount);
        }, 0);
    }, [cartListItems, burgersObject]);


    return (
        <div className="mt-6 h-full rounded-lg border bg-black dark:bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
                <p className="text-white dark:text-gray-700">Total</p>
                <p className="text-white dark:text-gray-700">$ {getTotal}</p>
            </div>
        </div>
    )
}
