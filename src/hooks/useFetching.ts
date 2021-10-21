import { useState } from 'react';

export function useFetching(callback:(n?:any)=>any):[(n?:any)=>any, boolean, string]  {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('')

    const fetching:()=>void = async () => {
        try {
            setIsLoading(true)
            await callback()
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message)
            }          
            
        } finally {
            setIsLoading(false)
        }    
    }

    return [fetching, isLoading, error]
}