"use client";

import { useId } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ThreeDMarqueeDemoSecond } from "./ThreeDMarqueeDemoSecond";

export default function SignUpForm() {
  const id = useId();
  return (
    <ThreeDMarqueeDemoSecond>
      <div className="*:not-first:mt-2 relative z-20 mx-auto max-w-4xl text-center font-bold text-balance text-white">
        <div className="rounded-md border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black focus:outline-none">
          <div className="flex flex-col items-center gap-2">
            <div
              className="flex size-11 shrink-0 items-center justify-center rounded-full border"
              aria-hidden="true"
            >
              <svg
                className="stroke-zinc-800 dark:stroke-zinc-100"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
              </svg>
            </div>
            <div>
              <h3 className="sm:text-center text-stone-500 font-bold">
                Welcome To TMDB
              </h3>
              <h5 className="sm:text-center text-stone-500 font-bold">
                Enter your details to sign up to your account.
              </h5>
            </div>
          </div>

          <form className="space-y-5 mt-3">
            <div className="space-y-4">
              <div className="*:not-first:mt-2 ">
                <Label htmlFor={`${id}-email`} className="text-white flex">
                  Email :
                </Label>
                <Input
                  id={`${id}-email`}
                  placeholder="Enter your email"
                  type="email"
                  required
                />
              </div>
              <div className="*:not-first:mt-2 ">
                <Label htmlFor={`${id}-password`} className="text-white flex">
                  Password :
                </Label>
                <Input
                  id={`${id}-password`}
                  placeholder="Enter your password"
                  type="password"
                  required
                />
              </div>
              <div className="*:not-first:mt-2">
                <Label
                  htmlFor={`${id}-confirm-password`}
                  className="text-white flex"
                >
                  Confirm Password :
                </Label>
                <Input
                  id={`${id}-password`}
                  placeholder="Enter your confirm password"
                  type="password"
                  required
                />
              </div>
            </div>

            <Button type="button" className="w-full cursor-pointer font-bold">
              Sign up
            </Button>
          </form>
          <p className="text-center text-xs text-white">
            Alredy have an account?{" "}
            <Link className="underline hover:no-underline" href="/login">
              Sign in
            </Link>
            .
          </p>
        </div>
      </div>
    </ThreeDMarqueeDemoSecond>
  );
}
