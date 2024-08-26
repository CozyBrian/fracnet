import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn: (...input: ClassValue[]) => string = (...input) => {
  return twMerge(clsx(...input));
};

export function cva<T>(input: T) {
  return input;
}

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function numberWithCommas(x: number | string): string {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
