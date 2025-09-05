import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const isSSR = () => typeof window === "undefined";

export const isDevelopmentServer = () => process.env.NODE_ENV === "development";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
