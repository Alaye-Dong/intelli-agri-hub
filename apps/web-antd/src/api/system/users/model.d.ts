export interface Role {
  roleId: string;
  roleName: string;
  roleKey: string;
  roleSort: number;
  dataScope: string;
  menuCheckStrictly?: boolean;
  deptCheckStrictly?: boolean;
  status: string;
  remark: string;
  createTime?: string;
  flag: boolean;
  superAdmin: boolean;
}

export interface User {
  userId: string; // 用户ID
  tenantId: string; // 租户ID
  deptId: number; // 部门ID
  userName: string; // 用户名
  nickName: string; // 昵称
  userType: string; // 用户类型
  email: string; // 电子邮箱
  phonenumber: string; // 电话号码
  sex: string; // 性别
  avatar?: string; // 头像（可选）
  status: string; // 用户状态
  loginIp: string; // 最后登录IP
  loginDate: string; // 最后登录日期
  remark: string; // 备注
  createTime: string; // 创建时间
  dept: Dept; // 所属部门信息
  roles: Role[]; // 用户角色列表
  roleIds?: string[]; // 角色ID列表（可选）
  postIds?: number[]; // 岗位ID列表（可选）
  roleId: string; // 主要角色ID
}
