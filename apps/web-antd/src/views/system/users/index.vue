<script lang="ts" setup>
import type { Recordable } from '@vben/types';

import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { User } from '#/api/system/users/model';

import { Page, useVbenDrawer } from '@vben/common-ui';
import { preferences } from '@vben/preferences';

import { Avatar, Button, message, Space } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { userList } from '#/api/system/users';
import { TableSwitch } from '#/components/table';

import { columns, querySchema } from './data';
import userDrawer from './user-drawer.vue';

const [UserDrawer, userDrawerApi] = useVbenDrawer({
  // 连接抽离的组件
  connectedComponent: userDrawer,
});

function handleEdit(row: Recordable<any>) {
  userDrawerApi.setData({ id: row.userId });
  userDrawerApi.open();
}

// 搜索表单
const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  // 提交函数
  handleSubmit: onSubmit,
  schema: querySchema(),
  // 控制表单是否显示折叠按钮
  showCollapseButton: true,
  submitButtonOptions: {
    content: '查询',
  },
  // 按下回车时是否提交表单
  submitOnEnter: false,
};

// 搜索表单提交按钮
function onSubmit(values: Record<string, any>) {
  message.success({
    content: `form values: ${JSON.stringify(values)}`,
  });
}

const gridOptions: VxeGridProps<User> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }) => {
        return await userList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
        });
      },
    },
  },
};

const [Grid] = useVbenVxeGrid({ formOptions, gridOptions });
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #avatar="{ row }">
        <!-- 可能要判断空字符串情况 所以没有使用?? -->
        <Avatar :src="row.avatar || preferences.app.defaultAvatar" />
      </template>

      <template #status="{ row }">
        <!-- <TableSwitch v-model="row.status" :api="() => userStatusChange(row)" :disabled="row.userId === 1 || !hasAccessByCodes(['system:user:edit'])
          " :reload="() => tableApi.query()" /> -->
        <!-- TODO 绑定TableSwitch相关api -->
        <TableSwitch v-model="row.status" />
      </template>

      <template #action="{ row }">
        <Space>
          <Button
            ghost
            size="small"
            type="primary"
            @click.stop="handleEdit(row)"
          >
            编辑
          </Button>
          <Button danger ghost size="small">删除</Button>
        </Space>
      </template>
    </Grid>
    <UserDrawer />
  </Page>
</template>
