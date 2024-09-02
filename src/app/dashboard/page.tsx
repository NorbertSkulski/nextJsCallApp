"use client";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const router  = useRouter();
  const client = useStreamVideoClient();
  const [callsList,setCallsList] = useState<Call[]>();

  const loadData = async () => {
   
    if(!client)
      return;
    const {calls} = await client.queryCalls()
    
    const nonEmptyCallsList = [];

    // Iteruj przez rozmowy i pobierz szczegóły każdej rozmowy
    for (const callInfo of calls) {
      // Pobierz szczegóły rozmowy za pomocą getCall
      const tmpCall = client.call(callInfo.type, callInfo.id); // Utwórz obiekt rozmowy
      const {call} = await tmpCall.get(); // Pobierz aktualny stan rozmowy

      if (call && call.session && call.session.participants.length > 0) {
        nonEmptyCallsList.push(callInfo);
        continue;
      }

      if (!call || !call.session || call.session.participants.length <= 0) {
        callInfo.leave();
        callInfo.endCall();
        continue;
      }
    }
    setCallsList(nonEmptyCallsList);   
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

  const joinToCall = (uuid:string) => {
    router.push(`/dashboard/stream/${uuid}`)
  }

  
  return (
    <main className=" flex h-[90dvh] justify-center items-center">

      <div className=" absolute top-5 left-5"> 
        {callsList?.map((el,idx)=>
        <ul key={`x1=${idx}`}>
          <li key={`x2=${idx}`}>{idx} {el.id} <button onClick={()=>joinToCall(el.id)}> Join </button></li>
        </ul>
)}
      </div>

      <button onClick={createCall}>CreateCall</button>
     
    </main>
  );
}
