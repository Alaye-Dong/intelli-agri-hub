import type { User, UserInfoResponse } from './model';

import type { ID, PageQuery, PageResult } from '#/api/common';

import { requestClient } from '#/api/request';

enum API {
  root = '/system/user',
  userList = '/system/user/list',
}

/**
 *  获取用户列表
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
  const url = userId ? `${API.root}/${userId}` : `${API.root}/`;
  return requestClient.get<UserInfoResponse>(url);
}
