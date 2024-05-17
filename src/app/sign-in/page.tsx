import { Metadata } from "next";

import { LoginForm } from "@/components/Auth";
import { redirect } from "next/navigation";
import { APP_NAME } from "@/constants/MetaData";
import { getCustomServerSession } from "@/util";

export const metadata: Metadata = {
    title: `${APP_NAME} - Sign in`,
    description: "Burger App sign in",
};

export default async function SignIn() {
    const session = await getCustomServerSession();
    if(session) {
        redirect('/burgers');
    }
    else {
        return (
            <LoginForm />
        );
    }

    
}