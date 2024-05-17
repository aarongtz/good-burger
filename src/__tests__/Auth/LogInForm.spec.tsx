import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { LoginForm } from '@/components/Auth';
import { signIn } from 'next-auth/react';


jest.mock('next-auth/react', () => ({
    signIn: jest.fn(),
}));

describe('LoginForm', () => {
    it('Renders the heading title', () => {
        render(<LoginForm />);

        const heading = screen.getByRole('heading', { level: 1 });
 
        expect(heading).toBeInTheDocument();
    });

    it('Renders the sign in button', () => {
        render(<LoginForm />);

        const button = screen.getByRole('button', { name: /continue with github/i });

        expect(button).toBeInTheDocument();
    });

    it('Checks if signIn function is called when clicking the login button', () => {
        render(<LoginForm />);

        const button = screen.getByRole('button', { name: /continue with github/i });

        fireEvent.click(button);

        expect(signIn).toHaveBeenCalledWith('github', { callbackUrl: "/burgers" });
    });
})