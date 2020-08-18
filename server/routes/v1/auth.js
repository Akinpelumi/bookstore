import { Router } from 'express';
import { AuthController } from '../../controllers/v1';
import { UserMiddleware, OrganizationMiddleware } from '../../middleware';

const { userSignup, organizationSignup, signin } = AuthController;
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

const router = Router();

router.post('/user/signup', userSignUpValidator, usrSignUpEmailValidator, usrSignUpPhoneNumberValidator, userSignup);
router.post('/user/login', validateUsrLoginInfo, signin);
router.post('/organization/signup', organizationSignUpValidator, orgSignUpEmailValidator, orgSignUpPhoneNumberValidator, organizationSignup);
router.post('/organization/login', validateOrgLoginInfo, signin);

export default router;
