<script lang="ts" setup>
import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep } from '@vben/utils';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { findUserInfo, userAdd, userUpdate } from '#/api/system/users';

import { drawerSchema } from './data';

const data = ref();

const isUpdate = ref(false);
const title = computed(() => {
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

const [BaseForm, formApi] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  // 垂直布局，label和input在不同行，值为vertical
  // 水平布局，label和input在同一行
  layout: 'horizontal',
  schema: drawerSchema(),
  wrapperClass: 'grid-cols-1',
  showDefaultActions: false, // 不显示表单默认操作按钮
});

const [Drawer, drawerApi] = useVbenDrawer({
  onCancel: handleCancel,
  onConfirm: handleConfirm,
  async onOpenChange(isOpen: boolean) {
    if (!isOpen) {
      // 需要重置岗位选择
      formApi.updateSchema([
        {
          componentProps: { options: [], placeholder: '请先选择部门' },
          fieldName: 'postIds',
        },
      ]);
      return null;
    }
    const { id } = drawerApi.getData() as { id?: number | string };
    isUpdate.value = !!id;
    // 更新 && 赋值
    const { user, posts, roles } = await findUserInfo(id);

    const postOptions = (posts ?? []).map((item) => ({
      label: item.postName,
      value: item.postId,
    }));
    formApi.updateSchema([
      {
        componentProps: {
          // title用于选中后回填到输入框 默认为label
          optionLabelProp: 'title',
          options: roles.map((item) => ({
            // TODO
            // label: genRoleOptionlabel(item),
            // title用于选中后回填到输入框 默认为label
            title: item.roleName,
            value: item.roleId,
          })),
        },
        fieldName: 'roleIds',
      },
      {
        componentProps: {
          options: postOptions,
        },
        fieldName: 'postIds',
      },
    ]);

    if (user) {
      formApi.setValues(user);
      data.value = user;
    } else {
      message.warning('用户信息未找到');
    }
  },
});

async function handleConfirm() {
  const { valid } = await formApi.validate();
  if (!valid) {
    return;
  }
  const data = cloneDeep(await formApi.getValues());
  await (isUpdate.value ? userUpdate(data) : userAdd(data));
  await handleCancel();
}

async function handleCancel() {
  drawerApi.close();
  await formApi.resetForm();
}
</script>

<template>
  <Drawer :close-on-click-modal="false" :title="title">
    <div class="flex-col-center">外部传递数据： {{ data }}</div>
    <BaseForm />
  </Drawer>
</template>
