'use client';

import { useState } from 'react';
import { ROUTES } from '@/constants';
import { LOGIN_WITH_CREDENTIALS } from '@/graphql/mutations';
import { useMutation } from '@apollo/client/react/hooks';
import { useRouter } from 'nextjs-toploader/app';

import { OnboardingStatus } from '@/types/__generated__/graphql';

import { useSession } from '@/providers/auth-provider';

import {
  OnboardingProgress,
  useOnboardingRedirect,
} from './use-onboarding-redirect';
import { useOtpFlow } from './use-otp-flow';

export function useLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { signIn } = useSession();
  const { getRedirectPath } = useOnboardingRedirect();
  const { requireOtp, clearOtp } = useOtpFlow();

  const [loginWithCred] = useMutation(LOGIN_WITH_CREDENTIALS, {
    onCompleted() {},
    onError() {},
  });

  const login = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    setError(null);

    const searchParams = new URLSearchParams(location.search);

    try {
      const user = await loginWithCred({
        variables: {
          data: {
            ...credentials,
          },
        },
      });

      await signIn({ data: user.data });
      if (
        user.data?.signInWeb?.data?.onboardingProgress?.verifyOtp ===
        OnboardingStatus.Pending
      ) {
        requireOtp(user.data?.signInWeb?.data?.email ?? '');
      } else {
        clearOtp();
      }
      // Preserve query params except 'from'
      const preservedQuery = new URLSearchParams();
      for (const [key, value] of Object.entries(searchParams)) {
        if (key !== 'from') preservedQuery.set(key, value);
      }

      const onboardingProgress = user.data?.signInWeb?.data?.onboardingProgress;

      const newUserRedirect =
        user.data?.signInWeb?.isNewUser ||
        getRedirectPath(onboardingProgress as OnboardingProgress)
          ? getRedirectPath(onboardingProgress as OnboardingProgress)
          : ROUTES.HOME;

      const rawRedirect = searchParams?.get('from');
      const isSafeRedirect = rawRedirect?.startsWith('/');
      const redirectPath = isSafeRedirect ? rawRedirect : newUserRedirect;

      router.replace(
        `${redirectPath}${preservedQuery.toString() ? `?${preservedQuery.toString()}` : ''}`,
      );

      return user;
    } catch (err) {
      const typedError = err as Error;
      setError(typedError);
      setLoading(false);
      return null;
    }
  };

  return { login, loading, error };
}
