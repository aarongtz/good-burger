import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { BurgerCard } from '@/components/Burgers';
import { renderWithProviders } from '@/util/store';

import { screen, fireEvent, waitFor } from '@testing-library/react'

import productsResponse from '@/mocks/productResponse.json';
import { AllStoresType } from '@/typings/Stores';

import createMockRouter from '@/mocks/mockRouter';

import { useSession } from "next-auth/react";

jest.mock("next-auth/react", () => {
    const originalModule = jest.requireActual('next-auth/react');
    const mockSession = {
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        user: { name: "admin" }
    };
    return {
        __esModule: true,
        ...originalModule,
        useSession: jest.fn(() => {
            return { data: mockSession, status: 'authenticated' }
        }),
    };
});

describe(('Burger Card component'), () => {
    let element: any;
    let router = createMockRouter({});

    const mockBurgerCardProps = productsResponse.products[0];

    const getRenderedComponent = async (options?: AllStoresType) => {
        return renderWithProviders(<BurgerCard burger={mockBurgerCardProps} />, {
            preloadedState: {
                ...options
            }
        });
    }

    it('should render the card properly', async () => {
        element = getRenderedComponent();
        expect(await screen.findByRole('card-burger')).toBeInTheDocument();
    });

    it('should redirect when the link inside the component is being clicked', async () => {
        const componentWithWrapper = await renderWithProviders(
            <RouterContext.Provider value={router}>
                <BurgerCard burger={mockBurgerCardProps} />
            </RouterContext.Provider>
        );

        waitFor(() => {

            const { getByTestId } = componentWithWrapper;
            const link = getByTestId('burger-card-link');
            fireEvent.click(link);
            expect(router.push).toHaveBeenCalledWith('/burgers/burger-a');
        });
    });

})



