// src/utils/authz.ts
import { User } from '@/contexts/AuthContext'; // ajusta si tu tipo está en otro archivo

export function hasAnyRole(user: User | null, allowed: string[]) {
  if (!user) return false;
  // Soporta user.role (string) y user.roles (string[])
  const roles = Array.isArray((user as any).roles) ? (user as any).roles : [user.role].filter(Boolean);
  return roles.some((r: string) => allowed.includes(r));
}
