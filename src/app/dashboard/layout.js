'use client'
import { useState, useEffect, useCallback } from 'react'
import { supabase } from "@/utils/supabase/client";
import { mainContext } from '@/context/mainContext';

export default function DashboardLayout({
    children, // will be a page or nested layout
}) {
    const [session, setSession] = useState(null)

    const getSession = useCallback(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    })

    useEffect(() => {
        getSession();
    }, [])
    return (
        <mainContext.Provider value={{
            session: session
        }}>
            {children}
        </mainContext.Provider>
    )
}