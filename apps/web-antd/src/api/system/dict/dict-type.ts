import type { DictType } from './dict-type-model';

import type { ID, PageQuery, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { requestClient } from '#/api/request';

enum Api {
  dictOptionSelectList = '/system/dict/type/optionselect',
  dictTypeExport = '/system/dict/type/export',
  dictTypeList = '/system/dict/type/list',
  dictTypeRefreshCache = '/system/dict/type/refreshCache',
  root = '/system/dict/type',
}

/**
 * 获取字典类型列表
 * @param params 请求参数
 * @returns list
 */
export function dictTypeList(params?: PageQuery) {
  return requestClient.get<PageResult<DictType>>(Api.dictTypeList, { params });
}

/**
 * 导出字典类型列表
 * @param data 表单参数
 * @returns blob
 */
export function dictTypeExport(data: any) {
  return commonExport(Api.dictTypeExport, data);
}

// TODO 待合并功能
// /**
//  * 删除字典类型
//  * @param dictIds 字典类型id数组
//  * @returns void
//  */
// export function dictTypeRemove(dictIds: IDS) {
//   return requestClient.deleteWithMsg<void>(`${Api.root}/${dictIds}`);
// }

// /**
//  * 刷新字典缓存
//  * @returns void
//  */
// export function refreshDictTypeCache() {
//   return requestClient.deleteWithMsg<void>(Api.dictTypeRefreshCache);
// }

// /**
//  * 新增
//  * @param data 表单参数
//  * @returns void
//  */
// export function dictTypeAdd(data: any) {
//   return requestClient.postWithMsg<void>(Api.root, data);
// }

// /**
//  * 修改
//  * @param data 表单参数
//  * @returns void
//  */
// export function dictTypeUpdate(data: any) {
//   return requestClient.putWithMsg<void>(Api.root, data);
// }

/**
 * 查询详情
 * @param dictId 字典类型id
 * @returns 信息
 */
export function dictTypeInfo(dictId: ID) {
  return requestClient.get<DictType>(`${Api.root}/${dictId}`);
}

/**
 * 下拉框  返回值和list一样
 * @returns options
 */
export function dictOptionSelectList() {
  return requestClient.get<DictType[]>(Api.dictOptionSelectList);
}
