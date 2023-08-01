import { UserRoles } from "@/constants/userRoles";

export const isValidUserRole = (role: UserRoles) => {
  return role && Object.values(UserRoles).includes(role);
};
