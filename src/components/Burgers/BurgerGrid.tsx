'use client';

import { useEffect, useMemo } from 'react'
import { BurgerCard } from './BurgerCard';
import { BurgerItem } from '@/typings';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchData } from '@/store/burgers/burgerSlice';


export const BurgerGrid = () => {
    const dispatch = useAppDispatch();
    const { burgersArray, loading } = useAppSelector(state => state.burgerReducer);
    const { search } = useAppSelector(state => state.searchReducer);

    useEffect(() => {
        if(!burgersArray.length) {
            dispatch(fetchData());
        }
        
    }, [burgersArray, dispatch]);

    const renderBurgerList = useMemo(() => {
        if(loading) {
            return null;
        }

        return burgersArray.map((value: BurgerItem) => {
            if(search && search.length) {
                if(value.name.toLowerCase().includes(search.toLowerCase())) {
                    return (
                        <BurgerCard key={value.id} burger={value} />
                    );
                }
            } else {
                return (
                    <BurgerCard key={value.id} burger={value} />
                );
            }
            
        })
    }, [burgersArray, loading, search]);

    return (
        <div data-testid="burger-grid" role="grid" className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {renderBurgerList}
        </div>
    )
}
