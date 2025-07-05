const ROUTES =  {
    //Auth
    OWNER_LOGIN: '/owner/login',
    MANAGER_LOGIN: '/manager/login',
    UNAUTHORIZED: '/unauthorized',

    //Owner
    OWNER_HOME: '/owner/market',
    OWNER_USER_MANAGEMENT: '/owner/user-management',
    OWNER_VIEW_REQUESTS: '/owner/requests',
    OWNER_LOGS: '/owner/logs',
    OWNER_CHANGE_PASSWORD: '/owner/change-password',
    OWNER_UPDATE_PROFILE: '/owner/update-profile',
    OWNER_CREATE_PRODUCT: '/owner/manage-product',

    //Manager
    MANAGER_HOME: '/manager/market',
    MANAGER_CREATE_REQUEST: '/manager/create-request',
    MANAGER_CHANGE_PASSWORD: '/manager/change-password',
    MANAGER_UPDATE_PROFILE: '/manager/update-profile',
}

export default ROUTES;