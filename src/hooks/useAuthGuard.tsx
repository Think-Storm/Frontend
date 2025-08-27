import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ROUTES, protectedPages } from "@/constants/routes";
import { useAppSelector } from "@/store/hooks";
import { showErrorToast } from "@/components/common/notification/Toast";

export const useAuthGuard = (pathname: string) => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  const isProtectedRoute = useMemo(
    () =>
      Object.values(protectedPages).some((path) => pathname.startsWith(path)),
    [pathname],
  );

  useEffect(() => {
    try {
      if (!user && isProtectedRoute) {
        showErrorToast({
          id: `auth-guard-${pathname}`,
          message: "Please sign in first to access this page.",
          description: "Redirecting to sign in page.",
        });
        router.push(ROUTES.PAGE.AUTH.SIGNIN);
        return;
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      showErrorToast({
        id: `auth-error-${pathname}`,
        message: "Error checking authentication.",
        description: "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, isProtectedRoute, pathname, router]);

  return { user, isLoading };
};
