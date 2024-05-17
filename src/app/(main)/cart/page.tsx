import { Metadata } from "next";

import { getCartItems } from "@/actions/cart";
import { CartList } from "@/components/Cart";
import { MainHeader } from "@/components/Home"
import { CartListItem } from "@/typings/Cart";

import { APP_NAME } from "@/constants/MetaData";
import withAuth from "@/hoc/withAuth";

export const metadata: Metadata = {
    title: `${APP_NAME} - Cart`,
    description: "Burger App cart",
};


const CartView = async() => {
    const cartItems: CartListItem[] = await getCartItems();
    return (
        <>
            <MainHeader subTitle="Cart" />
            <div className="h-screen pt-20">
                <CartList cartListItems={cartItems} />
            </div>
        </>

    )
}

export default withAuth(CartView);