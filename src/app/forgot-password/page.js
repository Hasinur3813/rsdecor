import AuthLayout from "@/components/auth/AuthLayout";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata = {
  title: "Forgot Password | RS Wallpaper & Floor",
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="We'll send a reset link to your email."
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
