import { Metadata } from "next";

import { BurgerDetail } from "@/components/Burgers/BurgerDetail";
import { MainHeader } from "@/components/Home";
import { PRODUCTS_LIST_URL } from "@/constants";
import { BurgerItem, BurgerListApiResponse } from "@/typings";

interface BurgerPageProps {
    params: { slug: string }
};

import { APP_NAME } from "@/constants/MetaData";
import { getCustomServerSession } from "@/util";
import { redirect } from "next/navigation";
import withAuth from "@/hoc/withAuth";

const generateMetadata = async ({ params }: BurgerPageProps): Promise<Metadata> => {

    try{
        const data: BurgerListApiResponse = await fetch(PRODUCTS_LIST_URL, {
            next: {
                revalidate: 60 * 60 * 30 * 6
            }
        })
            .then(res => res.json());
        
        const { slug } = params;

        const items: BurgerItem[] = data.products.filter((value: BurgerItem) => {
            return value.slug === slug;
        });

        if(!items.length) {
            return {
                title: 'Burger Detail Page',
                description: `Burger detail page`
            };
        }

        const item = items[0];

        return {
            title: `${APP_NAME} - ${item.name} detail`,
            description: `${APP_NAME} ${item.name} detail page`
        };

    } catch (error) {
        return {
            title: 'Burger Detail Page',
            description: `Burger detail page`
        }
    }
};

const generateStaticParams = async () => {
    const data: BurgerListApiResponse = await fetch(PRODUCTS_LIST_URL)
        .then(res => res.json());

    return data.products.map(burger => (
        {
            slug: burger.slug
        }
    ));
};

export { generateStaticParams, generateMetadata };

const BurgerPage = ({params}: BurgerPageProps) => {
    const { slug } = params;
    return (
        <>
            <MainHeader subTitle="Product Detail" />
            <BurgerDetail slug={slug} />
        </>
    )
};

export default withAuth(BurgerPage);
