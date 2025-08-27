import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import {
  showErrorToast,
  showSuccessToast,
} from "@/components/common/notification/Toast";
import { api } from "@/lib/api/fetcher";
import { ROUTES } from "@/constants/routes";
import { loginSuccess } from "@/store/reducers/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LoginUser, UserResponse } from "@think-storm/contracts";

interface LoginUserResponse {
  message: string;
  data: UserResponse;
}

export default function useSignIn() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // const onboardingCompleted = useAppSelector(
  //   (state) => state.onboarding.onboardingCompleted,
  // );
  // const markProfileCreated = useAppSelector(
  //   (state) => state.profile.profileCreated,
  // );

  const mutation = useMutation<LoginUserResponse, Error, LoginUser>({
    mutationFn: (data: LoginUser) => api.post(ROUTES.API.AUTH.SIGNIN, data),
    onSuccess: (response: LoginUserResponse) => {
      dispatch(loginSuccess({ user: response.data }));

      showSuccessToast({
        message: "Sign-in Successful",
        description: "Welcome to ThinkStorm!",
      });

      // if (onboardingCompleted || markProfileCreated) {
      //   router.push(ROUTES.PAGE.PROTECTED.EXPLORE);
      // } else {
      router.push(ROUTES.PAGE.PROTECTED.ONBOARDING);
      // }
    },
    onError: (error: Error) => {
      console.log("Sign-in error:", error);

      showErrorToast({
        message: "Sign-in Failed",
        description: "An error occurred while signing in. Please try again.",
      });
    },
  });

  return {
    signIn: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
