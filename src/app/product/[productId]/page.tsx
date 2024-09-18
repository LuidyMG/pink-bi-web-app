'use client'

import { Card } from "@/components/ui/card";
import { Output } from "@/components/ui/output";
import { ProductService } from "@/service/ProductService";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { PackageSearch } from "lucide-react";

export interface ProductPageProps {
    params: { productId: string}
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
});

export default function ProductPage({ params }: ProductPageProps) {
    return (<QueryClientProvider client={queryClient}>
        <ProductView productId={params.productId} />
    </QueryClientProvider>)
}

const productService = new ProductService();

function ProductView({ productId }: {  productId: string })
{
    const { data, isLoading } = useQuery({
        queryKey: [`product/${productId}`],
        queryFn: async () => {
            const response = await productService.getById(productId);

            return response?.data;
        }
    });

    return (<div className="flex flex-col p-10 pt-5 gap-5">
        <Card>
            <div className="flex items-center gap-5">
                <PackageSearch size={40} />
                <p className="font-semibold">{data?.name}</p>
            </div>
        </Card>

        <div className="w-full flex gap-5">
            <Card className="!w-8/12 flex flex-col gap-2">
                <Output label="Nome">
                    {data?.name}
                </Output>
                <Output label="Descrição">
                    {data?.description}
                </Output>
                <Output label="Valor">
                    {data?.amount}
                </Output>
            </Card>
            <Card className="!w-4/12">
                MODELOS
            </Card>
        </div>
    </div>)
}