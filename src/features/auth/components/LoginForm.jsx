import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Mail, ShieldCheck } from "lucide-react";
import { loginSchema } from "../../../lib/validators/authSchemas";
import { useLogin } from "../hooks/useLogin";
import PasswordInput from "../../../components/ui/PasswordInput";
import FormError from "../../../components/ui/FormError";
import { getErrorMessage } from "../../../lib/errorMessages";

function LoginForm() {
  const login = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = (data) => login.mutate(data);


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormError
        message={login.isError ? getErrorMessage(login.error) : null}
      />

      {/* Email */}
      <div>
        <label className="block text-xs font-body font-medium text-ink mb-1.5">
          Email
        </label>

        <div className="relative">
          <Mail
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />

          <input
            type="email"
            placeholder="example@gmail.com"
            {...register("email")}
            className="w-full border border-border bg-surface rounded-lg pl-9 pr-3 py-2.5 font-body text-sm text-ink placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
          />
        </div>

        {errors.email && (
          <p className="text-error text-xs mt-1.5">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-xs font-body font-medium text-ink mb-1.5">
          Password
        </label>

        <PasswordInput
          register={register}
          name="password"
          error={errors.password}
        />
      </div>

      {/* Login Button */}
      <button
        type="submit"
        disabled={login.isPending}
        className="w-full bg-primary text-white font-body font-semibold text-sm py-2.5 rounded-lg hover:bg-primary-hover active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {login.isPending ? "Logging in..." : "Log In"}
      </button>
      
      <div className="pt-3 border-t border-border space-y-3 text-center">
        {/* Signup */}
        <p className="text-xs font-body text-muted">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-primary font-semibold hover:underline underline-offset-4 transition"
          >
            Sign up
          </Link>
        </p>

        {/* Forgot Password */}
        <p className="text-xs font-body text-muted">
          <Link
            to="/forgot-password"
            className="text-primary font-semibold hover:underline underline-offset-4 transition"
          >
            Forgot password?
          </Link>
        </p>

        {/* Admin Divider */}
        <div className="flex items-center gap-3 py-1">
          <div className="h-px flex-1 bg-border" />

          <span className="text-[10px] font-body uppercase tracking-[0.18em] text-faint">
            Admin
          </span>

          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Admin Login */}
        <Link
          to="/admin/login"
          className="group inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-surface text-xs font-body font-semibold text-ink hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
        >
          <ShieldCheck
            size={15}
            className="text-muted group-hover:text-primary transition-colors"
          />

          <span>Admin login</span>
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
