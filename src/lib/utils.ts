import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

export function parseMlangString(input: string, lang: string) {
  const regex = new RegExp(`{mlang\\s${lang}}(.*?){mlang}`, "g");
  const match = regex.exec(input);

  return match ? match[1] : input;
}

export const convertVTTTimeToSeconds = (time: string) => {
  const [m, s] = time.split(":"); // Split into minutes and seconds
  const seconds = parseFloat(s.replace(".", "")) / 1000; // Handle milliseconds
  return parseInt(m) * 60 + seconds; // Convert to total seconds
};

// Base roles for Add/Edit and Delete permissions
export interface RolePermissions {
  addEditRoles: string[];
  deleteRoles: string[];
}

// Base roles for Add/Edit and Delete
const rolePermissions: RolePermissions = {
  addEditRoles: [
    "manager",
    "editingteacher",
    "mitarbeiter",
    "teacher",
    "dozent",
  ],
  deleteRoles: ["manager", "mitarbeiter"],
};

export function canAddEdit(roles: string[]): boolean {
  if (!Array.isArray(roles) || roles.some((role) => typeof role !== "string")) {
    throw new Error("Invalid roles array provided");
  }
  return roles.some((role) => rolePermissions.addEditRoles.includes(role))
}
export function canDelete(roles: string[]): boolean {
  if (!Array.isArray(roles) || roles.some((role) => typeof role !== "string")) {
    throw new Error("Invalid roles array provided");
  }
  return roles.some((role) => rolePermissions.deleteRoles.includes(role));
}
