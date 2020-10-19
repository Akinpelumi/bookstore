import { Router } from 'express';
import { AuthController } from '../../controllers/v1';
import { UserMiddleware, OrganizationMiddleware, AdminMiddleware } from '../../middleware';

const {
  userSignup,
  organizationSignup,
  userAndOrganizationSignin,
  adminSignin,
  userAccountStatusUpdating,
  organizationAccountStatusUpdating } = AuthController;
const {
  userSignUpValidator,
  validateUsrLoginInfo,
  usrSignUpEmailValidator,
  usrSignUpPhoneNumberValidator
} = UserMiddleware;
const {
  organizationSignUpValidator,
  validateOrgLoginInfo,
  orgSignUpEmailValidator,
  orgSignUpPhoneNumberValidator
} = OrganizationMiddleware;
const {
  validateAdminLoginInfo
} = AdminMiddleware;

const router = Router();

router.post('/user/signup', userSignUpValidator, usrSignUpEmailValidator, usrSignUpPhoneNumberValidator, userSignup);
router.post('/user/login', validateUsrLoginInfo, userAndOrganizationSignin);
router.post('/organization/signup', organizationSignUpValidator, orgSignUpEmailValidator, orgSignUpPhoneNumberValidator, organizationSignup);
router.post('/organization/login', validateOrgLoginInfo, userAndOrganizationSignin);
router.post('/admin/login', validateAdminLoginInfo, adminSignin);
router.get('/user/confirmation', userAccountStatusUpdating);
router.get('/organization/confirmation', organizationAccountStatusUpdating);

export default router;
