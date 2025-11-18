import MainLayout from '@/components/layouts/main-layout'
import { ReactNode } from 'react'

const Layout = ({ children }: {
    children: ReactNode
}) => {
    return (
        <MainLayout>
            {children}
        </MainLayout>
    )
}

export default Layout