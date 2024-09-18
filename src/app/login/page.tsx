import { FormLogin } from "@/components/forms/formLogin";

export default function LoginPage() {
  return (
    <div>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="bg-white w-4/12 p-10 rounded-md shadow-lg">
          <FormLogin />
        </div>
      </div>
    </div>
  );
}
