import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, Calendar, User } from "lucide-react";
import { signupSchema } from "../../../lib/validators/authSchemas";
import { useSignup } from "../hooks/useSignup";
import PasswordInput from "../../../components/ui/PasswordInput";
import { CheckCircle2 } from "lucide-react";

const fieldClass =
  "w-full border border-border bg-surface rounded-lg pl-9 pr-3 py-2.5 font-body text-sm text-ink placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition";

function SignupForm() {
  const navigate = useNavigate();
  const signup = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema), mode: 'onBlur' });

  const onSubmit = (data) => signup.mutate(data);

  if (signup.isSuccess) {
    return (
      <div className="text-center py-4">
        <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="text-success" size={24} />
        </div>
        <h3 className="font-display text-lg font-bold text-ink mb-1.5">
          Account created
        </h3>
        <p className="font-body text-sm text-muted mb-6">
          Log in to verify your email and get started.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="w-full bg-primary text-white font-body font-semibold text-sm py-2.5 rounded-lg hover:bg-primary-hover transition"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-body font-medium text-ink mb-1.5">
            First Name
          </label>
          <div className="relative">
            <User
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              {...register("firstName")}
              className={fieldClass}
              placeholder="Shivansh"
            />
          </div>
          {errors.firstName && (
            <p className="text-error text-xs mt-1.5">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-xs font-body font-medium text-ink mb-1.5">
            Last Name
          </label>
          <div className="relative">
            <User
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              {...register("lastName")}
              className={fieldClass}
              placeholder="Mishra"
            />
          </div>
          {errors.lastName && (
            <p className="text-error text-xs mt-1.5">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

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
            className={fieldClass}
          />
        </div>
        {errors.email && (
          <p className="text-error text-xs mt-1.5">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-body font-medium text-ink mb-1.5">
          Phone Number
        </label>
        <div className="relative">
          <Phone
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            {...register("phoneNumber")}
            className={fieldClass}
            placeholder="9876543210"
          />
        </div>
        {errors.phoneNumber && (
          <p className="text-error text-xs mt-1.5">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-xs font-body font-medium text-ink mb-1.5">
          Date of Birth
        </label>
        <div className="relative">
          <Calendar
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input type="date" {...register("dob")} className={fieldClass} />
        </div>
        {errors.dob && (
          <p className="text-error text-xs mt-1.5">{errors.dob.message}</p>
        )}
      </div>

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

      <button
        type="submit"
        disabled={signup.isPending}
        className="w-full bg-primary text-white font-body font-semibold text-sm py-2.5 rounded-lg hover:bg-primary-hover active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {signup.isPending ? "Creating account..." : "Sign Up"}
      </button>
    </form>
  );
}

export default SignupForm;
