'use client';

import { useEffect } from "react";
import { CiShoppingCart } from "react-icons/ci"

import Link from "next/link"

import { useAppDispatch, useAppSelector } from "@/store";
import { fetchCartCount } from "@/store/cart/cartSlice";

export const CartNavItem = () => {
    const { userItemsCount } = useAppSelector(state => state.cartReducer);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if(!userItemsCount) {
            dispatch(fetchCartCount());
        }

    }, [dispatch, userItemsCount]);

    return (
        <>
            <Link href={'/cart'} className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">View Cart</span>
                <CiShoppingCart size={30} className="inline" />
                <span className="inline">({userItemsCount ?? 0})</span>
            </Link>
        </>
    );
}
