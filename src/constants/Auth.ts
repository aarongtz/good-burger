import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from "next-auth/providers/google";

import prisma from '../../lib/prisma';

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
            
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
            
        })
    ],
    debug: true,
    pages: {
        signIn: '/sign-in'
    },
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
};