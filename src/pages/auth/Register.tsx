//creat rigister page

import { useAppDispatch, useAppSelector } from "../../hook/";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import Input from "../../App/components/ui/Input";
import Button from "../../App/components/ui/Button";

import { signUp } from "../../App/store/authSlice";
import { signUpSchema, type SignUpFormData } from "../../App/uitls/validtion";

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { loading, error } = useAppSelector((state) => state.auth);

  // use react hook form to handle form state and validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    console.log("FORM DATA:", data);
    try {
      await dispatch(
        signUp({
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
        }),
      ).unwrap();
      toast.success(t("auth.signupSuccess"));

      navigate("/login");
    } catch (err: any) {
      console.error(err.response?.data || err);
      toast.error(err.response?.data?.message || t("auth.signupFailed"));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
            {t("auth.signup")}
          </h1>

          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            {t("auth.enterEmail")}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label={t("auth.firstName")}
                placeholder={t("auth.enterFirstName")}
                {...register("firstName")}
                error={errors.firstName?.message}
              />
              <Input
                label={t("auth.lastName")}
                placeholder={t("auth.enterLastName")}
                {...register("lastName")}
                error={errors.lastName?.message}
              />
            </div>

            <Input
              label={t("auth.email")}
              placeholder={t("auth.enterEmail")}
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />

            <Input
              label={t("auth.password")}
              placeholder={t("auth.enterPassword")}
              type="password"
              {...register("password")}
              error={errors.password?.message}
            />

            <Input
              label={t("auth.confirmPassword")}
              placeholder={t("auth.confirmPassword")}
              type="password"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />

            <Button type="submit" isLoading={loading} className="w-full mt-6">
              up
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              <Link
                to="/signin"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors"
              >
                {t("auth.alreadyHaveAccount")} {t("auth.signInHere")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
