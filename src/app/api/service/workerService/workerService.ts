'use server'
import { currentUser, User } from "@clerk/nextjs/server";


export const getUser = async (): Promise<User | null> => {

    const user: User | null = await currentUser();
    return JSON.parse(JSON.stringify(user));
}