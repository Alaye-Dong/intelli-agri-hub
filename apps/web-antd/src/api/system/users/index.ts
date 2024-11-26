import type { User, UserInfoResponse } from './model';

import type { ID, IDS, PageQuery, PageResult } from '#/api/common';

import { requestClient } from '#/api/request';

enum API {
  root = '/system/user',
  userAdd = '/system/user/add',
  userInfo = '/system/user/get',
  userList = '/system/user/list',
  userRemove = '/system/user/remove',
  userUpdate = '/system/user/update',
}

/**
 * 获取用户列表
 * @param params
 * @returns User
 */
export function userList(params?: PageQuery) {
  return requestClient.get<PageResult<User>>(API.userList, { params });
}

/**
 * 可以不传ID  返回部门和角色options 需要获得原始数据
 * 不传ID时一定要带最后的/
 * @param userId 用户ID
 * @returns 用户信息
 */
export function findUserInfo(userId?: ID) {
  const url = userId ? `${API.userInfo}/${userId}` : API.userInfo;
  return requestClient.get<UserInfoResponse>(url);
}

/**
 * 新增用户
 * @param data data
 * @returns void
 */
export function userAdd(data: any) {
  return requestClient.post<null>(API.userAdd, data);
}

/**
 * 更新用户
 * @param data data
 * @returns void
 */
export function userUpdate(data: any) {
  return requestClient.put<null>(API.userUpdate, data);
}

/**
 * 删除用户
 * @param userIds 用户ID数组
 * @returns void
 */
export function userRemove(userIds: IDS) {
  return requestClient.delete<null>(`${API.userRemove}/${userIds}`);
}
