<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { findUserInfo } from '#/api/system/users';

const data = ref();

const [BaseForm, formApi] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  // 提交函数
  handleSubmit: onSubmit,
  // 垂直布局，label和input在不同行，值为vertical
  // 水平布局，label和input在同一行
  layout: 'horizontal',
  schema: [
    {
      // 组件需要在 #/adapter.ts内注册，并加上类型
      component: 'Input',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入用户名',
      },
      // 字段名
      fieldName: 'userName',
      // 界面显示的label
      label: '用户名',
    },
    {
      component: 'InputPassword',
      componentProps: {
        placeholder: '请输入密码',
      },
      fieldName: 'password',
      label: '密码',
    },
  ],
  wrapperClass: 'grid-cols-1',
  showDefaultActions: false, // 不显示表单默认操作按钮
});

const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm() {
    // console.info('onConfirm');
  },
  async onOpenChange(isOpen: boolean) {
    if (isOpen) {
      // data.value = drawerApi.getData<Record<string, any>>();
    }
    const { id } = drawerApi.getData() as { id?: number | string };
    // 更新 && 赋值
    const { user } = await findUserInfo(id);
    if (user) {
      formApi.setValues(user);
      data.value = user;
    } else {
      message.warning('用户信息未找到');
    }
  },
});

function onSubmit(values: Record<string, any>) {
  message.success({
    content: `form values: ${JSON.stringify(values)}`,
  });
}
</script>

<template>
  <Drawer title="数据共享示例">
    <div class="flex-col-center">外部传递数据： {{ data }}</div>
    <BaseForm />
  </Drawer>
</template>
