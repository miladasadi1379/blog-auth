'use client'
import { useContext } from 'react'
import Account from '@/components/dashboard/Account';
import LoginPage from '../login/page';
import { mainContext } from '@/context/mainContext';
export default function Dashboard() {
    const { session } = useContext(mainContext)

    return (
        <>
            {
                !session ? <LoginPage /> :
                    <Account session={session?.user} />
            }
        </>
    );
}
