'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { CircleDollarSign, NotepadText, PackageSearch } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Error } from "../ui/error";
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { APP_ROUTES } from "@/constrants/app_routes";
import { ProductService } from "@/service/ProductService";
import { Product } from "@/service/models/Product";


const productService = new ProductService();

const formNewProductSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    description: z.string(),
    amount: z.string().transform((val) => parseFloat(val)).refine((val) => val > 0, { message: 'Valor deve ser positivo > 0.'})
})

type FormNewProductSchema = z.infer<typeof formNewProductSchema>

export function FormNewProduct()
{
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<FormNewProductSchema>({
        resolver: zodResolver(formNewProductSchema)
    });

    function handleSave({name, description, amount} : FormNewProductSchema)
    {
        productService.create({name, description, amount} as Product).then((response) => {
            enqueueSnackbar(`Produto "${name}" criado com sucesso!`, {variant: 'error'});

            console.log(response);
            router.push(APP_ROUTES.private.product.view(response.data?.id));
        }).catch((error) => {
            console.log(error);
            enqueueSnackbar(error?.response?.message, {variant: 'error'});
        });
    }

    return (
        <form onSubmit={handleSubmit(handleSave)} className="flex flex-col gap-2 text-md items-center w-full">
            <p className="text-2xl font-bold">Cadastrar Produto</p>
            <Input label="Nome" type="string" register={{...register('name')}} className={errors?.name ? '!border-red-600' : ''} >
                <PackageSearch size={24} />
            </Input>
            <Error error={errors.name?.message} />
            <Input label="Descrição" type="text" register={{...register('description')}} className={errors?.description ? '!border-red-600' : ''}>
                <NotepadText size={24} />
            </Input>
            <Error error={errors.description?.message} />
            <Input label="Valor" type="number" register={{...register('amount')}} className={errors?.amount ? '!border-red-600' : ''}>
                <CircleDollarSign size={24} />
            </Input>
            <Error error={errors.amount?.message} />
            <SnackbarProvider />
            <div className="flex gap-2 w-full">
                <Button label="Cancelar" type="button" className="!bg-transparent !text-violet-500" />
                <Button label="Salvar" type="submit" />
            </div>
        </form>
    );
}