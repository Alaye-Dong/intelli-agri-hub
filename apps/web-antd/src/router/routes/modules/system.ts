import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:settings-2',
      order: -1,
      title: '系统管理',
    },
    name: 'System',
    path: '/',
    children: [
      {
        name: 'Users',
        path: '/system/users',
        component: () => import('#/views/system/users/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:users',
          title: '用户管理',
        },
      },
      {
        name: 'Roles',
        path: '/system/roles',
        component: () => import('#/views/system/roles/index.vue'),
        meta: {
          icon: 'lucide:user-cog',
          title: '角色管理',
        },
      },
    ],
  },
];

export default routes;
