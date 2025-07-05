import { lazy } from 'react';
import ROUTES from './routes';

const ManagerLogin =  lazy(() => import('../../pages/country-manager/auth/login'));

const authRoutes = [
    {path: ROUTES.MANAGER_LOGIN, element: ManagerLogin},
]

export default authRoutes;