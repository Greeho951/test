const router = require('express').Router();
const upload = require('../../utils/middlewares/upload');
const { authVerify } = require('../../utils/middlewares/authVerify');
const { hasAccess } = require('../../utils/middlewares/hasAccess');
const { ValidSignUp, validPassword, validStatus } = require('../../utils/validations/users');
const {
    signIn,
    signUp,
    userList,
    otpVerify,
    otpReSend,
    passChnage,
    userDetails,
    profileImage,
    statusChnage,
    activeUserList,
    blockedUserList,
    unVerifiedUserList,
} = require('../../controllers/users/users');


/* USER API */
router.post('/sign-in',         signIn);
router.put('/otp-verify',      otpVerify);
router.put('/otp-resend',      otpReSend);
router.post('/sign-up',         ValidSignUp, signUp);
router.put('/password-change',  authVerify, validPassword, passChnage);
router.put('/profile-image',    authVerify, upload.single('profile'), profileImage);

/* ADMIN API */
router.get('/users',            authVerify, hasAccess('can_view_user'), userList);
router.get('/active-users',     authVerify, hasAccess('can_view_user'), activeUserList);
router.get('/blocked-users',    authVerify, hasAccess('can_view_user'), blockedUserList);
router.get('/unverified-users', authVerify, hasAccess('can_view_user'), unVerifiedUserList);
router.put('/user-status/:id',  authVerify, hasAccess('can_edit_user'), validStatus, statusChnage);

/* USER & ADMIN API */
router.get('/user-details/:id', authVerify, userDetails);


module.exports = router;

