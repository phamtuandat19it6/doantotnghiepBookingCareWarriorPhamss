export const adminMenu = [
    { //Quản lí người dùng
        name: 'menu.admin.manage-user',
         menus: [
            {
                name: 'menu.admin.manage-doctor', link: '/system/user-doctor',
                subMenus: [
                    { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                    { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                    // { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
                ]
            },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
            {
                name: 'menu.admin.manage-admin', link: '/system/user-admin',
            },
            {
                name: 'menu.admin.crud', link: '/system/user-manage',
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux',
            },
        ]
    },
    { //Quản lí phòng khám
        name: 'menu.admin.clinic',
         menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic',

            },

        ]
    },
    { //Quản lí chuyên khoa
        name: 'menu.admin.specialty',
         menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty',

            },

        ]
    },
    { //Quản lí cẩm nang
        name: 'menu.admin.handbook',
         menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook',

            },

        ]
    },
];