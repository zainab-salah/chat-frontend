import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const colors = ["bg-yellow-300", "bg-purple-300", "bg-pink-300", "bg-blue-300"];