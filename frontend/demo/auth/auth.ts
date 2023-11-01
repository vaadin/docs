import { configureAuth } from '@hilla/react-auth';
import { UserInfoService } from 'Frontend/generated/endpoints';

// Configure auth to use `UserInfoService.getUserInfo`
const auth = configureAuth(UserInfoService.getUserInfo, {
  getRoles: (userInfo: any) => (userInfo as any).authorities as readonly string[],
});

// Export auth provider and useAuth hook, which are automatically
// typed to the result of `UserInfoService.getUserInfo`
export const useAuth = auth.useAuth;
export const AuthProvider = auth.AuthProvider;
