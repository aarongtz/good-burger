'use client';

import { CartListItem } from "@/typings/Cart";
import { CartCard } from "./CartCard";
import { useAppSelector } from "@/store";
import { useState } from "react";
import { Loading } from "../Util";
import { CartTotal } from "./CartTotal";

interface CartListProps {
    cartListItems: CartListItem[];
};

export const CartList = ({ cartListItems }: CartListProps) => {
    const { burgersObject } = useAppSelector(state => state.burgerReducer);
    const [cartItems, setCartListItems] = useState(cartListItems);
    const [loadingCart, setLoadingCart] = useState(false);

    const handleOnBeforeDelete = () => {
        setLoadingCart(true);
    };

    const handleOnDelete = (id: string) => {
        const newCartList = cartItems.filter((item: CartListItem) => item.id !== id);
        setCartListItems(newCartList);
        setLoadingCart(false);
    };

    const renderCartItems = () => {
        if (typeof cartItems === 'undefined') {
            return null;
        }
        if (!cartItems.length && !loadingCart) {
            return (
                <div className="bg-black text-white dark:bg-white p-8 text-center dark:text-black">
                    No records to show...
                </div>
            );
        }

        return cartItems.map((item: CartListItem) => {
            const slug = item.burgerSlug;
            const burger = burgersObject[slug];
            return (
                <CartCard key={slug} cartItem={item} catalogueItem={burger} loading={loadingCart} onBeforeDelete={handleOnBeforeDelete} onDelete={handleOnDelete} />
            );
        });
    }

    return (
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
                {
                    loadingCart && (
                        <Loading />
                    )
                }
                {renderCartItems()}
            </div>
            {/* Subtotal: */}
            <CartTotal cartListItems={cartItems} />
        </div>
    );
}