import Configuration from "@/models/Configuration";
import { ErrorMessages } from "@/constants/checkErrorsMessages";
import User from "@/models/User";
import { UserRoles } from "@/constants/userRoles";

const { INTERNAL_SERVER_ERROR } = ErrorMessages;

const _getConfigRoles = async () => {
  try {
    const rolesConfiguration = await Configuration.findOne({ name: "roles" });
    const configRoles = rolesConfiguration.value as string[];
    return configRoles;
  } catch {
    throw new Error(INTERNAL_SERVER_ERROR);
  }
};

export const checkHasValidRole = async (role: string) => {
  if (role === UserRoles.ADMIN) {
    throw new Error(`${role} role is not allowed`);
  }
  const configRoles = await _getConfigRoles();
  if (role && !configRoles?.includes(role)) {
    throw new Error(`${role} is not a valid role`);
  }
};

export const checkEmailExists = async (email: string) => {
  const userWithEmail = await User.findOne({ email });
  if (userWithEmail) {
    throw new Error(`The email ${email} is already registered`);
  }
};

export const checkUsernameExists = async (username: string) => {
  const userWithUsername = await User.findOne({ username });
  if (userWithUsername) {
    throw new Error(`The username ${username} is not available`);
  }
};
