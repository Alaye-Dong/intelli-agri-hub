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
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter category',
      },
      fieldName: 'category',
      label: 'Category',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter productName',
      },
      fieldName: 'productName',
      label: 'ProductName',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter price',
      },
      fieldName: 'price',
      label: 'Price',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          {
            label: 'Color1',
            value: '1',
          },
          {
            label: 'Color2',
            value: '2',
          },
        ],
        placeholder: '请选择',
      },
      fieldName: 'color',
      label: 'Color',
    },
    {
      component: 'DatePicker',
      fieldName: 'datePicker',
      label: 'Date',
    },
  ],
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
  columns: [
    { type: 'checkbox', width: 60 },
    {
      field: 'userName',
      title: '名称',
      minWidth: 80,
    },
    {
      field: 'nickName',
      title: '昵称',
      minWidth: 130,
    },
    {
      field: 'avatar',
      title: '头像',
      slots: { default: 'avatar' },
      minWidth: 80,
    },
    {
      field: 'deptName',
      title: '部门',
      minWidth: 120,
    },
    {
      field: 'phonenumber',
      title: '手机号',
      formatter({ cellValue }) {
        return cellValue || '暂无';
      },
      minWidth: 120,
    },
    {
      field: 'status',
      title: '状态',
      slots: { default: 'status' },
      minWidth: 100,
    },
    {
      field: 'createTime',
      title: '创建时间',
      minWidth: 150,
    },
    {
      field: 'action',
      fixed: 'right',
      slots: { default: 'action' },
      title: '操作',
      resizable: false,
      width: 180,
    },
  ],
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
