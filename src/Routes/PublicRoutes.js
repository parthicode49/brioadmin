import ChangePassword from "../components/Authentication/ChangePassword";
import ForgotPasswordForm from "../components/Authentication/ForgotPasswordForm";
import SignInForm from "../components/Authentication/SignInForm";
import SignInForm2 from "../components/Authentication/SignInForm2";

export const PublicRoutes = [
    { path: `/`, Component: <SignInForm2 /> },
    { path: `/changepassword`, Component: <ChangePassword /> },
    { path: `/forgotpassword`, Component: <ForgotPasswordForm /> },
    // { path: `/userlogin`, Component: <EmployeeLogin /> },
    // { path: `/vendorlogin`, Component: <VendorLogin/> },
    // { path: `/registration`, Component: <Registration/> },
    // { path: `/auth/*`, Component: <LinkLoginEmp/> },
]