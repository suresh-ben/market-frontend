import { lazy } from 'react';
import ROUTES from './routes';

const Home =  lazy(() => import('../../pages/owner/home'));
const CreateProduct =  lazy(() => import('../../pages/owner/product-management'));
const Logs =  lazy(() => import('../../pages/owner/logs'));
const ViewPequests =  lazy(() => import('../../pages/owner/view-requests'));
const UserManagement =  lazy(() => import('../../pages/owner/user-management'));
const ChangePassword =  lazy(() => import('../../pages/owner/auth/change-password'));
const UpdateProfile =  lazy(() => import('../../pages/owner/auth/update-profile'));

const ownerRoutes = [
    {path: ROUTES.OWNER_HOME, element: Home},
    {path: ROUTES.OWNER_CREATE_PRODUCT, element: CreateProduct},
    {path: ROUTES.OWNER_LOGS, element: Logs},
    {path: ROUTES.OWNER_VIEW_REQUESTS, element: ViewPequests},
    {path: ROUTES.OWNER_USER_MANAGEMENT, element: UserManagement},
    {path: ROUTES.OWNER_CHANGE_PASSWORD, element: ChangePassword},
    {path: ROUTES.OWNER_UPDATE_PROFILE, element: UpdateProfile},
]

export default ownerRoutes;