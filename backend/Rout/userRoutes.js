import express from "express";

import { GetUserprofile, authUser, deleteUser, getUsers, getuserbyid, registerUser, updateUserprofile, updateUsers } from "../controler/userControler.js";
import { adminMidleware, protect } from "../midlewares/authMidleware.js";

const router = express.Router();

router.route('/user/login').post(authUser);
router.route('/user').post(registerUser)
router.route('/user/profile').get(protect, GetUserprofile);
router.route('/user/profile').put(protect, updateUserprofile);

//adminroutes
router.route('/admin/users').get(protect, adminMidleware, getUsers)
router.route('/admin/user/:id')
    .delete(protect, adminMidleware, deleteUser)
    .get(protect, adminMidleware, getuserbyid)
    .put(protect, adminMidleware, updateUsers)





export default router