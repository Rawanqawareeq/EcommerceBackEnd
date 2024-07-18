import { Role } from "../../middlewave/auth.js";
export const endpoint = {
    cart :[Role.Admin,Role.SuperAdmin,Role.User],
}
