import { getCustomerById,updateCustomer , changePassword} from "../Controllers/customerController.js";


const customerRoutes = (app) =>{

    app.route("/getCustomer/:CustomerID")
    .get(getCustomerById)
    .put(updateCustomer)

    app.route("/api/customers/changePassword")
    .post(changePassword)
}
export default customerRoutes;