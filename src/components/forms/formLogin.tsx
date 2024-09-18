'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { KeySquare, UserRoundPen } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Error } from "../ui/error";
import { UserService } from "@/service/UserService";
import { UserLogin } from "@/service/models/User";
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { APP_ROUTES } from "@/constrants/app_routes";

const userService = new UserService();

const formLoginSchema = z.object({
    username: z.string().min(1, 'Nome de usuário é obrigatório'),
    password: z.string().min(1, 'Senha é obrigatório')
})

type FormLoginSchema = z.infer<typeof formLoginSchema>

export function FormLogin()
{
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<FormLoginSchema>({
        resolver: zodResolver(formLoginSchema)
    });

    function handlerLogin({username, password} : FormLoginSchema)
    {
        userService.login({username, password} as UserLogin).then((response) => {
            enqueueSnackbar('Login efetuado com sucesso!', {variant: 'success'});
            
            localStorage.setItem('ACCESS_TOKEN', response?.data?.access_token);
            router.push(APP_ROUTES.private.home);
        }).catch(error => {
            enqueueSnackbar(error?.response?.data?.message, {variant: 'error'});
        });
    }

    function registerUser()
    {
        router.push(APP_ROUTES.public.register);
    }

    return (
        <form onSubmit={handleSubmit(handlerLogin)} className="flex flex-col gap-2 text-md items-center w-full">
            <p className="text-2xl font-bold">Login</p>
            <Input label="Nome de usuário" type="string" register={{...register('username')}} className={errors?.username ? '!border-red-600' : ''} >
                <UserRoundPen size={24} />
            </Input>
            <Error error={errors.username?.message} />
            <Input label="Senha" type="password" register={{...register('password')}} className={errors?.password ? '!border-red-600' : ''}>
                <KeySquare size={24} />
            </Input>
            <Error error={errors.password?.message} />
            <SnackbarProvider />
            <div className="flex flex-col gap-2 w-full">
                <Button label="Logar" type="submit" />
                <Button label="Registrar" type="button" onClick={registerUser} className="!bg-transparent !text-violet-500" />
            </div>
        </form>
    );
}