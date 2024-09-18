import { FormNewProduct } from "@/components/forms/formNewProduct";

export default function NewProductPage()
{
    return (<div>
        <div className="w-full h-screen flex justify-center items-center">
            <div className="bg-white w-6/12 p-10 rounded-md shadow-lg">
                <FormNewProduct />
            </div>
      </div>
    </div>)
}