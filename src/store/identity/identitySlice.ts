import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CreateRoleDto,
  CreateUserInput,
  IRole,
  PagingUsersResponse,
  PermissionQueryParams,
  PermissionRequestResult,
  RolesPagingResponse,
  UpdatePermissionDto,
  UpdateRoleDto,
  UserResponse,
} from '@/services/IdentityService';
interface identityState {
  errorMessage?: string;
  roles?: RolesPagingResponse;
  roleSelected?: IRole;
  permissions?: PermissionRequestResult;
  users?: PagingUsersResponse;
  userSelected?: UserResponse;
  userRoles: IRole[];
  assignableRoles: IRole[];
}

const initialState: identityState = {
  userRoles: [],
  assignableRoles: [],
};

const identitySlice = createSlice({
  name: 'identity',
  initialState,
  reducers: {
    getAllRoles: (state) => {},
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    setRoleSelected: (state, action: PayloadAction<IRole | undefined>) => {
      state.roleSelected = action.payload;
    },
    createRoleRequest: (state, action: PayloadAction<CreateRoleDto>) => {},
    updateRoleRequest: (
      state,
      action: PayloadAction<{ id: string; input: UpdateRoleDto }>
    ) => {},
    deleteRoleRequest: (state, action: PayloadAction<string>) => {},
    getAllPermissionsRequest: (
      state,
      action: PayloadAction<PermissionQueryParams>
    ) => {},
    setPermissions: (state, action: PayloadAction<PermissionRequestResult>) => {
      const permissions = action.payload;
      permissions.groups?.forEach((group) => {
        group.numOfGranted =
          group.permissions?.filter((x) => x.isGranted)?.length || 0;
        group.isGrantAllPermissions =
          group.numOfGranted === group.permissions?.length;
      });
      state.permissions = permissions;
    },
    // prettier-ignore
    updatePermissionsRequest: (state, action: PayloadAction<{ params: PermissionQueryParams; input: UpdatePermissionDto }>) => {},
    getUsersRequest: (state, action) => {},
    setUsers: (state, action: PayloadAction<PagingUsersResponse>) => {
      state.users = action.payload;
    },
    setUserSelected: (
      state,
      action: PayloadAction<UserResponse | undefined>
    ) => {
      state.userSelected = action.payload;
    },
    getAssignableRolesRequest: (state) => {},
    setAssignableRoles: (state, action) => {
      state.assignableRoles = action.payload;
    },
    getUserRoles: (state, action: PayloadAction<string>) => {},
    setUserRoles: (state, action) => {
      state.userRoles = action.payload;
    },
    createUserRequest: (state, action: PayloadAction<CreateUserInput>) => {},
    updateUserRequest: (state, action) => {},
    removeUserRequest: (state, action: PayloadAction<string>) => {},
    saveUserSuccess: (state) => {},
  },
});

export enum IdentityLoadingEnum {
  fetchAllRoles = 'fetchAllRoles',
  createRole = 'createRole',
  updateRole = 'updateRole',
  deleteRole = 'deleteRole',
  getAllPermissions = 'getAllPermissions',
  updatePermissions = 'updatePermissions',
  getUsers = 'getUsers',
  getAssignableRoles = 'getAssignableRoles',
  getUserRoles = 'getUserRoles',
  createUser = 'createUser',
  updateUser = 'updateUser',
  removeUser = 'removeUser',
}

export enum IdentityModalEnum {
  createUpdateRoleModal = 'createUpdateRoleModal',
  confirmDeleteRoleModal = 'confirmDeleteRoleModal',
  confirmDeleteUserModal = 'confirmDeleteUserModal',
  permissionModal = 'permissionModal',
  userModal = 'userModal',
}

export const usernameAdmin = 'admin';

export const identityActions = identitySlice.actions;
export const identityReducer = identitySlice.reducer;
