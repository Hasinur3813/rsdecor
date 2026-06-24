import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Create Account | RS Wallpaper & Floor",
};

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join thousands of happy homeowners."
    >
      <RegisterForm />
    </AuthLayout>
  );
}
