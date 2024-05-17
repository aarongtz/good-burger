'use server';

import { authOptions } from "@/constants";
import { getServerSession } from "next-auth";

export const getCustomServerSession = async () => {
    return await getServerSession(authOptions);
}