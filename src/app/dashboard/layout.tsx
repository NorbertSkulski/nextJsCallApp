'use client'
import {  useUser } from "@clerk/nextjs";
import { StreamVideo, StreamVideoClient, StreamVideoProvider } from "@stream-io/video-react-sdk";
import { createToken } from "../api/service/videoService/videoService";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    
  const [client, setClient] = useState<StreamVideoClient>();  
  const {user, isLoaded} = useUser(); 
  
   
  useEffect(()=>{
    initialFunc();
  },[user?.id])

  const initialFunc = async () => {
    console.log("start")

    const [token,apiKey] = await createToken();
    console.log(token)
    console.log(apiKey)
    if(!user || !apiKey)
        return;
  
    const client = new StreamVideoClient({ apiKey, user:{
      id:user.id,
      name:user.username || user.id,
      image: user.imageUrl
    }, token });

    setClient(client);
  }
  

  if(!client || !isLoaded){
    return <div>Loading...</div>
  }

  return (  
          <main>
             <StreamVideo client={client}>
                {children}
             </StreamVideo>
          </main>        
  );
}
