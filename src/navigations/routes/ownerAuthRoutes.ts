import { lazy } from 'react';
import ROUTES from './routes';

const OwnerLogin =  lazy(() => import('../../pages/owner/auth/login'));

const authRoutes = [
    {path: ROUTES.OWNER_LOGIN, element: OwnerLogin},
]

export default authRoutes;