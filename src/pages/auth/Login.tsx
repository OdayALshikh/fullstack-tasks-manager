import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { signInSchema, type SignInFormData } from "../../App/uitls/validtion";
import { signIn } from "../../App/store/authSlice";
import { useAppDispatch, useAppSelector } from "../../hook/";
import Input from "../../App/components/ui/Input";
import Button from "../../App/components/ui/Button";
const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const result = await dispatch(signIn(data)).unwrap();
      toast.success(t("auth.loginSuccess"));
      navigate(result.role === "admin" ? "/admin" : "/user");
    } catch (err) {
      toast.error(error || t("auth.loginFailed"));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
            {t("auth.login")}
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            {t("auth.enterEmail")}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label={t("auth.email")}
              type="email"
              placeholder={t("auth.enterEmail")}
              {...register("email")}
              error={errors.email?.message}
            />

            <Input
              label={t("auth.password")}
              type="password"
              placeholder={t("auth.enterPassword")}
              {...register("password")}
              error={errors.password?.message}
            />

            <Button type="submit" isLoading={loading} className="w-full mt-6">
              {t("auth.login")}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              {t("auth.dontHaveAccount")}{" "}
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors"
              >
                {t("auth.signUpHere")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
