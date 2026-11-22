import { configureAuth } from '@vaadin/hilla-react-auth';
import { UserInfoService } from 'Frontend/generated/endpoints';

const auth = configureAuth(UserInfoService.getUserInfo);

export const useAuth = auth.useAuth;
export const AuthProvider = auth.AuthProvider;
