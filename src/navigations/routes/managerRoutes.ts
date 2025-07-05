import { lazy } from 'react';
import ROUTES from './routes';

const Home =  lazy(() => import('../../pages/country-manager/home'));
const CreateRequest =  lazy(() => import('../../pages/country-manager/create-request'));

const managerRoutes = [
    {path: ROUTES.MANAGER_HOME, element: Home},
    {path: ROUTES.MANAGER_CREATE_REQUEST, element: CreateRequest},
]

export default managerRoutes;