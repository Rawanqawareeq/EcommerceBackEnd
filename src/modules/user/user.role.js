import { Role } from "../../middlewave/auth.js";

export const endpoint = {
    getall:[Role.SuperAdmin,Role.Admin],
    userData:[Role.SuperAdmin,Role.Admin,Role.User],
}