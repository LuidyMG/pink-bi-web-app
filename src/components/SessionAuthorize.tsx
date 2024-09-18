'use client'

import { APP_ROUTES } from "@/constrants/app_routes";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";

export interface SessionAuthorizeProps {
    children: React.ReactNode
}

export function SessionAuthorize({children} : SessionAuthorizeProps)
{
    const pathname = usePathname();

    function verifyAuthorized() {
        const authorized = localStorage.getItem('ACCESS_TOKEN') != undefined;

        const isLoginPage = pathname.startsWith('/login');
        const isRegisterPage = pathname.startsWith('/register');

        if(!authorized && !isLoginPage && !isRegisterPage) { redirect(APP_ROUTES.public.login); }
        if(authorized && (isLoginPage || isRegisterPage)) { redirect(APP_ROUTES.private.home); }
    }

    useEffect(() => {
        verifyAuthorized();
    });

    return <>{children}</>
}