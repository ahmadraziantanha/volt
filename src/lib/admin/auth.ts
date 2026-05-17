import "server-only";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "volt-admin";
export const ADMIN_COOKIE_VALUE = "ok";

export function isAdminAuthed(): boolean {
  return cookies().get(ADMIN_COOKIE_NAME)?.value === ADMIN_COOKIE_VALUE;
}
