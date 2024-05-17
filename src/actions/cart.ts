'use server';

import { revalidatePath } from "next/cache";
import prisma from "../../lib/prisma";

import { UserBurger } from "@prisma/client";
import { getCustomServerSession } from "@/util";
import { CartListItem, DeleteManyResponse } from "@/typings/Cart";

export const addToCart = async (email: string, slug: string) => {
    const userItem: UserBurger | null = await prisma.userBurger.findFirst({
        where:
        {
            user: {
                email
            },
            burgerSlug: slug
        }
    });

    if (userItem) {
        const { amount } = userItem;
        const updatedUserBurger = await prisma.userBurger.update({
            where: { id: userItem.id },
            data: { amount: amount + 1 }
        });

        revalidatePath('/cart');
        return updatedUserBurger;
    }

    const newUserBurger = await prisma.userBurger.create({
        data: {
            burgerSlug: slug,
            amount: 1,
            user: {
                connect: {
                    email
                }
            }
        }
    });

    revalidatePath('/cart');
    return newUserBurger;
}

export const getItemsCount = async () => {
    const session = await getCustomServerSession();

    if (!session) {
        return null;
    }

    const email = session?.user?.email as string;

    const userCartItems = await prisma.userBurger.aggregate({
        _sum: {
            amount: true,
        },
        where:
        {
            user: {
                email
            }
        }
    });

    return userCartItems;

}

export const getCartItems = async(): Promise<CartListItem[]> => {
    const session = await getCustomServerSession();

    if (!session) {
        return [];
    }

    const email = session?.user?.email as string;

    revalidatePath('/cart');

    const userCartItems = await prisma.userBurger.findMany({
        where:
        {
            user: {
                email
            }
        }
    });

    return userCartItems;
}

export const deleteCartItem = async(slug: string): Promise<DeleteManyResponse> => {
    const session = await getCustomServerSession();

    if (!session) {
        return { count: 0 };
    }

    const email = session?.user?.email as string;

    const userCartItems = await prisma.userBurger.deleteMany({
        where:
        {
            user: {
                email
            },
            burgerSlug: slug
        }
    });

    revalidatePath('/cart');

    return userCartItems;
}