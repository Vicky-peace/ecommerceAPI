import { register,login } from "../Controllers/authController.js";

const authRoutes = (app) =>{
    app.route('/auth/register')
    .post(register)

    app.route("/auth/login")
    .post(login)
}

export default authRoutes;