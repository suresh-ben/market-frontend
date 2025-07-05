import { Suspense } from "react";
import {  BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import useManagerAuth from "../hooks/useManagerAuth";
import useOwnerAuth from "../hooks/useOwnerAuth";

import ownerAuthRoutes from "./routes/ownerAuthRoutes";
import managerAuthRoutes from "./routes/managerAuthRoutes";
import managerRoutes from "./routes/managerRoutes";
import ownerRoutes from "./routes/ownerRoutes";

import PersistOwnerLogin from "./components/PersistOwnerLogin";
import PersistManagerLogin from "./components/PersistManagerLogin";

import { AUTH_STATUS } from "../config/constants";
import ROUTES from "./routes/routes";

import PageNotFound from './components/PageNotFound';

const NavigationManager = () => {

    const { authData: ownerAuthData } = useOwnerAuth();
    const { authData: managerAuthData } = useManagerAuth();

    //isLoggedIn is true when status success and even in loading state: loading will be handled in Wrapper.js with a loading animation
    const ownerAuthSts = ownerAuthData.status;
    const managerAuthSts = managerAuthData.status;

    return (
        <Router>
            <Suspense fallback={<div />}>
                <Routes>
                    {/* Owner Auth Routes - Anyone can Access without login requirment and should restrict access once they are logged*/}
                    <Route element={<PersistOwnerLogin />}>
                        {
                            ownerAuthRoutes?.map((route, ind) => {
                                return <Route key={ind} path={route.path} element={
                                    //already loggedIn, navigate to home
                                    (ownerAuthSts === AUTH_STATUS.SUCCESS && <Navigate to={ROUTES.OWNER_HOME} replace/>) ||
                                    (ownerAuthSts === AUTH_STATUS.FAILED && <route.element />)
                                } />
                            })
                        }
                    </Route>

                    {/* Manager Auth Routes - Anyone can Access without login requirment and should restrict access once they are logged*/}
                    <Route element={<PersistManagerLogin />}>
                        {
                            managerAuthRoutes?.map((route, ind) => {
                                return <Route key={ind} path={route.path} element={
                                    //already loggedIn, navigate to home
                                    (managerAuthSts === AUTH_STATUS.SUCCESS && <Navigate to={ROUTES.MANAGER_HOME} replace/>) ||
                                    (managerAuthSts === AUTH_STATUS.FAILED && <route.element />)
                                } />
                            })
                        }
                    </Route>
                    
                    {/* Restricted routes - Owner Login required*/}
                    <Route element={<PersistOwnerLogin />}>
                        {
                            ownerRoutes?.map((route, ind) => {
                                return <Route key={ind} path={route.path} element={
                                    //navigate to login page if not signed in
                                    (ownerAuthSts === AUTH_STATUS.FAILED &&  <Navigate to={ROUTES.OWNER_LOGIN} replace />) ||
                                    (ownerAuthSts === AUTH_STATUS.SUCCESS && <route.element />)
                                } />
                            })
                        }
                    </Route>

                    {/* Restricted routes - Manager Login required*/}
                    <Route element={<PersistManagerLogin />}>
                        {
                            managerRoutes?.map((route, ind) => {
                                return <Route key={ind} path={route.path} element={
                                    //navigate to login page if not signed in
                                    (managerAuthSts === AUTH_STATUS.FAILED &&  <Navigate to={ROUTES.MANAGER_LOGIN} replace />) ||
                                    (managerAuthSts === AUTH_STATUS.SUCCESS && <route.element />)
                                } />
                            })
                        }
                    </Route>

                    {/* Page not found */}
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default NavigationManager;