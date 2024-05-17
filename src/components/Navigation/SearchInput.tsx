'use client';

import { useAppDispatch, useAppSelector } from "@/store";
import { setSearch } from "@/store/nav/searchSlice";
import { useEffect, useState } from "react";

export const SearchInput = () => {
    const { search } = useAppSelector(state => state.searchReducer);
    const [searchValue, setSearchValue] = useState(search);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setSearchValue(search);
    }, [search])

    const handleOnChange = (value: string) => {
        setSearchValue(value);

        dispatch(setSearch({search: value.trim()}));
    }
    return (
        <input value={searchValue} onChange={(e) => handleOnChange(e.target.value)} className="hidden md:inline bg-zinc-600 rounded-md min-h-8 focus:outline-none focus:border-transparent active:border-transparent p-2" type="text" placeholder="Type to search" />
    )
}
