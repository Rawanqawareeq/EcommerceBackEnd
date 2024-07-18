import { Role } from "../../middlewave/auth.js";

export const endPoint ={
    Create:[Role.Admin,Role.SuperAdmin],
    getAll:[Role.Admin,Role.SuperAdmin],
    getDetails:[Role.Admin,Role.SuperAdmin,Role.User],
    update:[Role.Admin,Role.SuperAdmin],
    delete:[Role.Admin,Role.SuperAdmin],
}