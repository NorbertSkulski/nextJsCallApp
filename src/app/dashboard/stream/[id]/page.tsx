"use client";
import { useLoadCall } from "@/app/hooks/callHooks";
import {
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  useParticipantViewContext,
} from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home({ params: { id } }: { params: { id: string } }) {

  const router = useRouter();

  const {call,isLoading} = useLoadCall(id);


  useEffect(()=>{
    if(!call)
        return;
    call.join()
       
  },[call])

  const onLeave = () => {
    router.push("/dashboard");
  }

  if (!call || isLoading) {
    return "Call creating...";
  }


  return (
    <main className=" flex h-[90dvh] justify-center items-center">
      <StreamCall call={call}>
        <StreamTheme>
          <SpeakerLayout />
          <CallControls onLeave={onLeave} />
        </StreamTheme>
      </StreamCall>
    </main>
  );
}
