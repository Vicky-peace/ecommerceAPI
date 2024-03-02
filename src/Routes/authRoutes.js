import { register } from "../Controllers/authController.js";

const authRoutes = (app) =>{
    app.route('/auth/register')
    .post(register)
}

export default authRoutes;