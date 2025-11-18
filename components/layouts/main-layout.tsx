import Header from '@/components/layouts/header'
import Sidebar from '@/components/layouts/sidebar'
import { cn } from '@/lib/utils'
import{ ReactNode } from 'react'

interface MainLayoutProps {
    children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col w-full min-h-screen">
                <Header />
                <main className={cn("w-full h-full p-4 md:p-6")}>{children}</main>
            </div>
        </div>
    )
}

export default MainLayout