import { configureAuth } from '@hilla/react-auth';
import { UserInfoService } from 'Frontend/generated/endpoints';

// tag::snippet[]
// Configure auth to use `UserInfoService.getUserInfo` and map to custom roles
const auth = configureAuth(UserInfoService.getUserInfo, {
  getRoles: (userInfo) => userInfo.authorities,
});
// end::snippet[]

// Export auth provider and useAuth hook, which are automatically
// typed to the result of `UserInfoService.getUserInfo`
export const useAuth = auth.useAuth;
export const AuthProvider = auth.AuthProvider;
