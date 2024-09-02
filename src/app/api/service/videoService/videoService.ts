'use server'
import { currentUser, User } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";



export const createToken = async () => {

    const apiKey = process.env.GETSTREAM_ACCESS_KEY;
    const secret = process.env.GETSTREAM_SECRET;
    if(!apiKey)
        throw new Error("apiKey not found !");
    if(!secret)
        throw new Error("secret not found !");

    const client = new StreamClient(apiKey, secret);

    const user:User|null  = await currentUser(); 
    if(!user){
        throw new Error("User not found !");
    }

    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60 * 3;

    return [client.createToken(user.id,exp), apiKey]

}