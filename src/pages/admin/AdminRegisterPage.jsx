import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone } from "lucide-react";
import { useAdminRegister } from "../../features/admin/hooks/useAdminAuth";
import AdminAuthLayout from "../../features/admin/components/AdminAuthLayout";
import PasswordInput from "../../components/ui/PasswordInput";

const fieldClass =
  "w-full border border-border bg-surface rounded-lg pl-9 pr-3 py-2.5 font-body text-sm text-ink placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition";

function AdminRegisterPage() {
  const navigate = useNavigate();

  const adminRegister = useAdminRegister();

  const [countdown, setCountdown] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (countdown === null) return;

    if (countdown === 0) {
      navigate("/admin/login");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((current) => current - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  const onSubmit = (data) => {
    adminRegister.mutate(data, {
      onSuccess: () => {
        setCountdown(7);
      },
    });
  };

  return (
    <AdminAuthLayout
      title="Register as Admin"
      subtitle="Your account will stay pending until an existing admin approves it."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-body font-medium text-ink mb-1.5">
            Full Name
          </label>

          <div className="relative">
            <User
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />

            <input
              placeholder="Your full name"
              {...register("fullName", {
                required: "All fields are required.",
              })}
              className={fieldClass}
            />
          </div>

          {errors.fullName && (
            <p className="text-xs text-red-500 font-body mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-xs font-body font-medium text-ink mb-1.5">
            Contact Number
          </label>

          <div className="relative">
            <Phone
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />

            <input
              placeholder="9876543210"
              {...register("contactNo", {
                required: "All fields are required.",
              })}
              className={fieldClass}
            />
          </div>

          {errors.contactNo && (
            <p className="text-xs text-red-500 font-body mt-1">
              {errors.contactNo.message}
            </p>
          )}
        </div>

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
              placeholder="admin@campusgig.com"
              {...register("email", {
                required: "All fields are required.",
              })}
              className={fieldClass}
            />
          </div>

          {errors.email && (
            <p className="text-xs text-red-500 font-body mt-1">
              {errors.email.message}
            </p>
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
            rules={{
              required: "All fields are required.",
            }}
            error={errors.password}
          />
        </div>

        {/* Register Button */}
        <button
          type="submit"
          disabled={adminRegister.isPending || countdown !== null}
          className="w-full bg-ink text-white font-body font-semibold text-sm py-2.5 rounded-lg hover:opacity-90 disabled:opacity-50 transition"
        >
          {adminRegister.isPending ? "Registering..." : "Register"}
        </button>
      </form>

      {/* Redirect Countdown */}
      {countdown !== null && (
        <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-center">
          <p className="text-sm font-body text-ink">
            Redirecting to Login Page in{" "}
            <span className="font-semibold text-primary">
              {countdown}
            </span>{" "}
            sec
          </p>
        </div>
      )}

      <p className="text-xs font-body text-faint text-center mt-4">
        <Link
          to="/admin/login"
          className="hover:text-ink transition"
        >
          Back to login
        </Link>
      </p>
    </AdminAuthLayout>
  );
}

export default AdminRegisterPage;
