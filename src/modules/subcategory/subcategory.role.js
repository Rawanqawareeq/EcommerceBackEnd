import { Role } from "../../middlewave/auth.js";

export const endpoint ={
    create:[Role.Admin,Role.SuperAdmin],
}
