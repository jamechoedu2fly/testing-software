import express from 'express';
import { loginController, registerController, updateProfileController } from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

//register
router.post("/register", registerController);

//login
router.post("/login", loginController);

// user route
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({
        ok: true
    })
})

// for admin
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({
        ok: true
    })
})

//update profile
router.put("/profile", requireSignIn, updateProfileController);

export default router;