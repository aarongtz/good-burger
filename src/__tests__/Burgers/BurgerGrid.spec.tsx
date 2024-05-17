import { BurgerGrid } from '@/components/Burgers';
import { renderWithProviders } from '@/util/store';

import { screen } from '@testing-library/react'

import productsResponse from '@/mocks/productResponse.json';
import productsObject from '@/mocks/productsObject.json';
import { AllStoresType } from '@/typings/Stores';


describe(('Burger Grid component'), () => {
    let element: any;

    const burgerReducer = {
        burgerReducer: {
            burgersArray: productsResponse.products,
            burgersObject: productsObject,
            loading: false,
            '_persist': '' as any
        }
    };

    const getRenderedComponent = async (options?: AllStoresType) => {
        return renderWithProviders(<BurgerGrid />, {
            preloadedState: {
                ...options
            }
        });
    }

    it('should render the grid correctly', async () => {
        element = getRenderedComponent(burgerReducer);
        expect(await screen.findByRole('grid')).toBeInTheDocument();

    });


    it('should render 2 children because we are passing 2 product items to the store', async () => {
        element = await getRenderedComponent(burgerReducer);
        const { getByTestId } = element;
        const burgerGrid = getByTestId('burger-grid');
        const numberOfChildren = burgerGrid.children.length;

        expect(numberOfChildren).toBe(2);

    });


    it('should render 1 product due to the search criteria', async () => {
        const reducers = {
            searchReducer: {
                search: 'black'
            },
            ...burgerReducer
        };

        element = await getRenderedComponent(reducers);
        const { getByTestId } = element;
        const burgerGrid = getByTestId('burger-grid');
        const numberOfChildren = burgerGrid.children.length;

        expect(numberOfChildren).toBe(1);

    });

})



