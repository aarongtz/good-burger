'use client';

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { FaArrowLeftLong, FaCartPlus } from "react-icons/fa6";

import { useAppDispatch, useAppSelector } from "@/store";
import { fetchData } from "@/store/burgers/burgerSlice";
import { getCustomServerSession } from "@/util";
import { Alert, CustomButton } from "../Util";
import { addToCart } from "@/actions/cart";
import { AlertTypes } from "@/typings";
import { addOneToCart } from "@/store/cart/cartSlice";
import { notFound } from "next/navigation";


interface BurgerDetailProps {
    slug: string;
}

export const BurgerDetail = ({ slug }: BurgerDetailProps) => {
    const dispatch = useAppDispatch();
    const { burgersArray, burgersObject } = useAppSelector(state => state.burgerReducer);
    const [addLoading, setAddLoading] = useState(false);
    const [alertProps, setAlertProps] = useState({
        alertType: AlertTypes.default,
        alertHeader: '',
        alertMessage: '',
        isAlertShowing: false,
    });


    useEffect(() => {
        if (!burgersArray.length) {
            dispatch(fetchData());
        }

    }, [dispatch, burgersArray]);

    const selectedBurger = burgersObject[slug];

    if(!selectedBurger) {
        notFound();
    }

    const handleAddToCart = async () => {
        setAddLoading(true);

        const session = await getCustomServerSession();

        const email = session?.user?.email as string;

        const userBurger = await addToCart(email, slug);

        if(userBurger) {
            setAlertProps((prevState) => ({
                ...prevState,
                alertType: AlertTypes.success,
                alertHeader: 'Success',
                alertMessage: `Added "${selectedBurger.name}" to cart.`,
                isAlertShowing: true
            }));
            
            dispatch(addOneToCart());

        } else {
            setAlertProps((prevState) => ({
                ...prevState,
                alertType: AlertTypes.error,
                alertHeader: 'Error',
                alertMessage: 'An internal error occured while saving your product',
                isAlertShowing: true
            }));
        }

        setAddLoading(false);
    }

    const handleOnClosedAlert = () => {
        setAlertProps((prevState) => ({
            ...prevState,
            isAlertShowing: false
        }));
    }

    const renderBurgerDetail = () => {
        if (!burgersArray.length) {
            return null;
        }

        
        const { calorie, description, image, name, price } = selectedBurger;
        const { alertType, alertHeader, alertMessage, isAlertShowing } = alertProps;

        return (
            <section className="text-gray-700 body-font overflow-hidden">
                <div className="container px-5 py-6 mx-auto">
                    <div className="lg:w-4/5 flex flex-wrap mx-auto mb-10">
                        <Link href='/burgers' className="text-2xl text-black dark:text-white"><FaArrowLeftLong size={20} className="inline" /> Go back</Link>
                    </div>
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <Image priority width={100} height={100} alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={image} />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h1 className="text-black dark:text-white text-3xl title-font font-medium mb-1">{name}</h1>
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    <small className="text-black dark:text-white"><b>Nutrition:</b> {calorie} calories</small>
                                </span>
                            </div>
                            <p className="leading-relaxed text-black dark:text-white mb-4">{description}</p>
                            <div className="flex mb-4">
                                <span className="title-font font-medium text-2xl text-black dark:text-white">${price}</span>
                            </div>
                            <div>
                                {
                                    isAlertShowing &&
                                    (
                                        <Alert onClosedAlert={handleOnClosedAlert} type={alertType} header={alertHeader} message={alertMessage} />
                                    )
                                }
                                
                            </div>
                            <div>
                                <CustomButton loading={addLoading} loadingText="Adding to cart..." clickHandler={handleAddToCart} icon={<FaCartPlus size={20} className="inline" />} text="Add to cart" className="text-white bg-amber-400 border-0 py-2 px-6 focus:outline-none hover:bg-amber-500 rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <>
            {renderBurgerDetail()}
        </>
    );
}
