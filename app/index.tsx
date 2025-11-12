/*import { GalleryView } from "@/components/modules/gallery/GalleryView";

export default function HomeScreen(){
    return <GalleryView/>
}*/
import { useEffect, useState } from 'react'

import { Login } from '@/components/modules/auth/Login'
import { HomeView } from '@/components/modules/home/homeView'
import { supabase } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'
import { View } from 'react-native'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <View>
      {session && session.user ? <HomeView/> : <Login />}
    </View>
  )
}
