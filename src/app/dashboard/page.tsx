"use client";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { getUser } from "../api/service/workerService/workerService";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const router  = useRouter();
  const client = useStreamVideoClient();

  const loadData = async () => {
    const user = await getUser();
    console.log(user);
  };

  useEffect(() => {
    loadData();
  }, []);


  const createCall = async () => {
    const uuid = crypto.randomUUID();
    if(!client)
      return;
    const call = client.call("default", uuid);

    await call.getOrCreate();
    router.push(`/dashboard/stream/${uuid}`)
  }

  
  return (
    <main className=" flex h-[90dvh] justify-center items-center">

      <button onClick={createCall}>CreateCall</button>
     
    </main>
  );
}
