import { Role } from "../../middlewave/auth.js";


export const endpoint ={
    create:[Role.Admin,Role.SuperAdmin,Role.User],
    getall:[Role.Admin,Role.SuperAdmin],
    get:[Role.Admin,Role.SuperAdmin,Role.User],
    changeStatus:[Role.Admin,Role.SuperAdmin]
}
