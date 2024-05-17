import { BurgerState } from '@/typings/Burgers';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { CartState } from './Cart';
import { ModeSwitcherType, SearchInputState } from './Navigation';

export interface AllStoresType {
    burgerReducer?: BurgerState & PersistPartial;
    cartReducer?: CartState & PersistPartial;
    visualModeReducer?: ModeSwitcherType & PersistPartial;
    searchReducer?: SearchInputState;
};