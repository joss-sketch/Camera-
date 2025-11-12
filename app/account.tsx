import { Account } from "@/components/modules/auth/Account";
import { Login } from "@/components/modules/auth/Login";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

//en app archivos de pantalla
export default function AccountScreen(){ 
    //ACCEDER A LA SESION
      const [session, setSession] = useState<Session | null>(null)
    
      useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session)
        })
    
        supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session)
        })
      }, []) 
      //si no hay sesion, mostrar loging 
      if (!session){
        return <Login />
      }
    return(
        <Account session={session}        
        />
    );
}