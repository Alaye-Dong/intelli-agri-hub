import type { User } from './model';

import type { PageQuery, PageResult } from '#/api/common';

import { requestClient } from '#/api/request';

enum API {
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
