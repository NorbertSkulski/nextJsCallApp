import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";


export const useLoadCall = (id:string) => {
    const client = useStreamVideoClient();
    const [call,setCall] = useState<Call>();
    const [isLoading,setIsLoading] = useState<boolean>(true);

    useEffect(()=>{
        if(!client)
            return;
        
        const loadCall = async ()=>{
            setIsLoading(true);
    
            const {calls} = await client.queryCalls({
                filter_conditions:{
                    id
                }
            })
    
            if(calls.length > 0) setCall(calls[0]);
            
            setIsLoading(false);
    
        }
    
        loadCall();
    
      },[client])

    return {call, isLoading}
}