import { FormRegister } from "@/components/forms/formRegister";

export default function RegisterPage() {
  return (
    <div>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="bg-white w-4/12 p-10 rounded-md shadow-lg">
          <FormRegister />
        </div>
      </div>
    </div>
  );
}
