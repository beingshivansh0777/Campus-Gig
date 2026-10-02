import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

import { useResetPassword } from "../hooks/useResetPassword";

const fieldClass =
  "w-full border border-border bg-surface rounded-lg pl-10 pr-10 py-2.5 font-body text-sm text-ink placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition";

function ResetPasswordForm() {
  const resetPassword = useResetPassword();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const newPassword = watch("newPassword");

  const onSubmit = (data) => {
    resetPassword.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <h2 className="font-display text-xl font-bold text-ink">
          Reset Password
        </h2>

        <p className="text-sm font-body text-muted mt-1">
          Update your password to keep your account secure.
        </p>
      </div>

      {/* Current Password */}
      <div>
        <label className="block text-xs font-body font-medium text-ink mb-1.5">
          Current Password
        </label>

        <div className="relative">
          <LockKeyhole
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />

          <input
            type={showCurrentPassword ? "text" : "password"}
            placeholder="Enter current password"
            {...register("oldPassword", {
              required: "Current password is required",
            })}
            className={fieldClass}
          />

          <button
            type="button"
            onClick={() => setShowCurrentPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition"
            aria-label={
              showCurrentPassword
                ? "Hide current password"
                : "Show current password"
            }
          >
            {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {errors.oldPassword && (
          <p className="text-xs text-red-500 mt-1">
            {errors.oldPassword.message}
          </p>
        )}
      </div>

      {/* New Password */}
      <div>
        <label className="block text-xs font-body font-medium text-ink mb-1.5">
          New Password
        </label>

        <div className="relative">
          <LockKeyhole
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />

          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="Enter new password"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              validate: (value) =>
                value !== watch("oldPassword") ||
                "New password must be different from current password",
            })}
            className={fieldClass}
          />

          <button
            type="button"
            onClick={() => setShowNewPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition"
            aria-label={
              showNewPassword ? "Hide new password" : "Show new password"
            }
          >
            {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {errors.newPassword && (
          <p className="text-xs text-red-500 mt-1">
            {errors.newPassword.message}
          </p>
        )}

        <p className="text-xs text-muted mt-1">Use at least 8 characters.</p>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-xs font-body font-medium text-ink mb-1.5">
          Confirm New Password
        </label>

        <div className="relative">
          <LockKeyhole
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />

          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            {...register("confirmPassword", {
              required: "Please confirm your new password",
              validate: (value) =>
                value === newPassword ||
                "New password and confirm password should match",
            })}
            className={fieldClass}
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition"
            aria-label={
              showConfirmPassword
                ? "Hide confirm password"
                : "Show confirm password"
            }
          >
            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {errors.confirmPassword && (
          <p className="text-xs text-red-500 mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={resetPassword.isPending}
        className="bg-primary text-white font-body font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {resetPassword.isPending ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
}

export default ResetPasswordForm;
