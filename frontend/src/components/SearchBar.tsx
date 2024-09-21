import React, {useCallback, useState} from 'react';
import {useDispatch} from "react-redux";
import {GrSearch} from "react-icons/gr";

import styles from '../styles/SearchBar.module.css';

import {AppDispatch} from "../store/store";
import {setSearchQuery} from "../store/searchSlice";
import {debounce} from "../utils/debounce";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

function SearchBar({onSearch}: SearchBarProps): React.JSX.Element {
    const dispatch = useDispatch<AppDispatch>();
    const [searchQueryState, setSearchQueryState] = useState<string>("");

    const debouncedSetSearchQuery = useCallback(debounce((query: string) => {
        setSearchQueryState(query);
    }, 1000), []);

    const handleSearch = useCallback(() => {
        if (searchQueryState.trim()) {
            dispatch(setSearchQuery(searchQueryState));
            onSearch(searchQueryState);
        }
    }, [searchQueryState, dispatch, onSearch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        debouncedSetSearchQuery(query);
    };

    console.log('SearchBar component re-rendered');

    return (
        <div className={styles.search_bar_container}>
            <input type="text"
                   className={styles.search_bar_input}
                   placeholder="Search Product Here..."
                   onChange={handleInputChange}
            />
            <div className={styles.search_bar_icon} onClick={handleSearch}>
                <GrSearch/>
            </div>
        </div>
    );
}

export default SearchBar;