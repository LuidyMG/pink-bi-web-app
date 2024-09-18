'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { KeySquare, UserRound, UserRoundSearch, Mail,  } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Error } from '../ui/error';
import { UserService } from "@/service/UserService";
import { UserRegister } from "@/service/models/User";
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { APP_ROUTES } from "@/constrants/app_routes";

const userService = new UserService();

const formRegisterSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    username: z.string().min(1, 'Nome de usuário é obrigatório').regex(new RegExp('^[a-zA-Z0-9._-]{3,30}$'), `O username deve ter entre 3 e 30 caracteres, não pode conter espaço e nem caracters especiais.`),
    email: z.string().min(1, 'Email é obrigatório').email(),
    password: z.string().min(6, 'Senha precisa ter no minímo 6 caracters'),
    confirmPassword: z.string().min(1, 'Confirmar Senha é obrigatório')
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "Senhas não conferem",
            path: ['confirmPassword']
        });
    }
});

type FormRegisterSchema = z.infer<typeof formRegisterSchema>

export function FormRegister()
{
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<FormRegisterSchema>({
        resolver: zodResolver(formRegisterSchema)
    });

    function handleRegister({name, username, email, password} : FormRegisterSchema)
    {
        userService.create({name, username, email, password} as UserRegister).then(() => {
            enqueueSnackbar('Usuário criado com sucesso! Efetue o login', {variant: 'success'});

            goToLogin();
        }).catch(error => {
            enqueueSnackbar(error?.response?.data?.message, {variant: 'error'});
        });
    }

    function goToLogin()
    {
        router.push(APP_ROUTES.public.login);
    }

    return (
        <form onSubmit={handleSubmit(handleRegister)} className="flex flex-col gap-2 text-md items-center w-full">
            <p className="text-2xl font-bold">Cadastro</p>
            <Input label="Nome" type="string" register={{...register('name')}} className={errors?.name ? '!border-red-600' : ''} >
                <UserRound size={24} />
            </Input>
            <Error error={errors.name?.message} />
            <Input label="Nome de usuário" type="string" register={{...register('username')}} className={errors?.username ? '!border-red-600' : ''} >
                <UserRoundSearch size={24} />
            </Input>
            <Error error={errors.username?.message} />
            <Input label="Email" type="string" register={{...register('email')}} className={errors?.email ? '!border-red-600' : ''} >
                <Mail size={24} />
            </Input>
            <Error error={errors.email?.message} />
            <Input label="Senha" type="password" register={{...register('password')}} className={errors?.password ? '!border-red-600' : ''}>
                <KeySquare size={24} />
            </Input>
            <Error error={errors.password?.message} />
            <Input label="Confirmar Senha" type="password" register={{...register('confirmPassword')}} className={errors?.confirmPassword ? '!border-red-600' : ''}>
                <KeySquare size={24} />
            </Input>
            <Error error={errors.confirmPassword?.message} />
            <SnackbarProvider />
            <div className="flex flex-col gap-2 w-full">
                <Button label="Registrar" type="submit" />
                <Button label="Logar" type="button" onClick={goToLogin} className="!bg-transparent !text-violet-500" />
            </div>
        </form>
    );
}