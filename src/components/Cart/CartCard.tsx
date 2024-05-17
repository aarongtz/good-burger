'use client';

import { BurgerItem } from "@/typings";
import { CartListItem } from "@/typings/Cart";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { CustomButton } from "../Util";
import { deleteCartItem } from "@/actions/cart";
import { useAppDispatch } from "@/store";
import { fetchCartCount } from "@/store/cart/cartSlice";



interface CartCardProps {
    cartItem: CartListItem;
    catalogueItem: BurgerItem;
    loading: boolean;
    onBeforeDelete: Function;
    onDelete: Function;
}


export const CartCard = ({ catalogueItem, cartItem, loading, onBeforeDelete, onDelete }: CartCardProps) => {
    const { name, price, image, slug} = catalogueItem;
    const { amount, id: cartId } = cartItem;
    const finalPrice = price * amount;
    const dispatch = useAppDispatch();

    const handleClick = async() => {
        if(onBeforeDelete) {
            onBeforeDelete();
        }

        const deleteResponse = await deleteCartItem(slug);

        const { count } = deleteResponse;


        if(count > 0 && onDelete) {
            onDelete(cartId);
            dispatch(fetchCartCount());
        }
    };


    return (
        <div className={`justify-between mb-6 rounded-lg bg-black dark:bg-white p-6 shadow-md sm:flex sm:justify-start ${loading && 'cursor-not-allowed opacity-40'}`}>
            <Image priority width={100} height={100} src={image} alt="product-image" className="w-full rounded-lg sm:w-40" />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-white dark:text-gray-900">{name} ({amount})</h2>
                    <p className="mt-1 text-xs text-white dark:text-gray-700">${price}</p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center space-x-4">
                        <p className="text-sm text-white dark:text-black">$ {finalPrice}</p>
                        <CustomButton loading={loading} className="h-5 w-5 cursor-pointer duration-150 text-white dark:text-gray-400 hover:text-red-500" text={''} icon={<RxCross2 size={15}  className=""/>} loadingText="" clickHandler={handleClick} />
                    </div>
                </div>
            </div>
        </div>
    )
}
