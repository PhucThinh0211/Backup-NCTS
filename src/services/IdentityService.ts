import { getEnvVars } from '@/enviroment';
import HttpClient from './HttpClient';
import { RequestOptions } from './types';
import { PagingResponse } from '@/common';

const { identityUrl, apiUrl, oAuthConfig } = getEnvVars();

export interface ILoginInput {
  username: string;
  password: string;
  remember: boolean;
  captchaId?: string;
  captcha?: string;
}

export interface IRole {
  id: string;
  name: string;
  isDefault: boolean;
  isStatic: boolean;
  isPublic: boolean;
  concurrencyStamp: string;
  extraProperties: IExtraProperties;
}
export interface RolesPagingResponse extends PagingResponse {
  items: IRole[];
}

interface IExtraProperties {
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
}

export interface CreateRoleDto {
  name: string;
  isDefault: boolean;
  isPublic: boolean;
}

export interface UpdateRoleDto extends CreateRoleDto {
  concurrencyStamp: string;
}

export interface PermissionQueryParams {
  providerName: string;
  providerKey: string;
}

export interface PermissionRequestResult {
  entityDisplayName: string;
  groups: PermissionGroupResult[];
}

export interface PermissionGroupResult {
  displayName: string;
  displayNameKey: string;
  displayNameResource: string;
  name: string;
  permissions: PermissionResult[];
  numOfGranted?: number;
  isGrantAllPermissions?: boolean;
}

export interface PermissionResult {
  allowedProviders: any[];
  displayName: string;
  grantedProviders: PermissionQueryParams[];
  isGranted: boolean;
  name: string;
  parentName: string | null;
}

export interface UpdatePermissionDto {
  permissions: {
    name: string;
    isGranted: boolean;
  }[];
}

export interface UserResponse {
  concurrencyStamp: string;
  creationTime: string;
  creatorId: any | null;
  deleterId: any | null;
  deletionTime: string | null;
  email: string;
  emailConfirmed: boolean;
  entityVersion: number;
  extraProperties: any; // {}
  id: string;
  isActive: boolean;
  isDeleted: boolean;
  lastModificationTime: string;
  lastModifierId: any | null;
  lockoutEnabled: boolean;
  lockoutEnd: any | null;
  name: string;
  phoneNumber: string | null;
  phoneNumberConfirmed: boolean;
  surname: string | null;
  tenantId: string | null;
  userName: string;
}

export interface PagingUsersResponse {
  items: UserResponse[];
  totalCount: number;
}

export interface CreateUserInput {
  userName: string;
  name?: string;
  surname?: string;
  email: string;
  phoneNumber?: string;
  isActive: boolean;
  lockoutEnabled: boolean;
  roleNames: string[];
  password: string;
}

const getLoginData = (inputValues: any) => {
  const formData: any = {
    grant_type: 'password',
    scope: inputValues?.remember ? oAuthConfig.scopeOffline : oAuthConfig.scope,
    client_id: oAuthConfig.clientId,
    ...inputValues,
  };

  // if (oAuthConfig.clientSecret)
  //   formData['client_secret'] = oAuthConfig.clientSecret;

  // prettier-ignore
  return Object.entries(formData).map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`).join('&');
};

export const login = (inputValues: any) => {
  const loginData = getLoginData(inputValues);
  return HttpClient.post(`${identityUrl}/connect/token`, loginData, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
};

class IdentityServiceController {
  public Get = {
    fetchAllRoles: () => {
      return HttpClient.get(`${apiUrl}/api/identity/roles/all`);
    },
    fetchUserRoles: (userId: string) => {
      return HttpClient.get(`${apiUrl}/api/identity/users/${userId}/roles`);
    },
    fetchAllPermissions: (options?: RequestOptions) => {
      return HttpClient.get(
        `${apiUrl}/api/permission-management/permissions`,
        options
      );
    },
    // prettier-ignore
    fetchUsers: (options?: RequestOptions) => {
      let getUsersUrl = `${apiUrl}/api/identity/users`;
      return HttpClient.get(`${getUsersUrl}`, options);
    },
    fetchUserById: (userId: string) => {
      return HttpClient.get(`${apiUrl}/api/identity/users/${userId}`);
    },
    fetchAssignableRoles: () => {
      return HttpClient.get(`${apiUrl}/api/identity/users/assignable-roles`);
    },
  };

  public Post = {
    createRole: (input: CreateRoleDto) => {
      return HttpClient.post(`${apiUrl}/api/identity/roles`, input);
    },
    createUser: (input: CreateUserInput) => {
      return HttpClient.post(`${apiUrl}/api/identity/users`, input);
    },
  };

  public Put = {
    updateRole: (id: string, input: UpdateRoleDto) => {
      return HttpClient.put(`${apiUrl}/api/identity/roles/${id}`, input);
    },
    updatePermission: (
      input: UpdatePermissionDto,
      options?: RequestOptions
    ) => {
      return HttpClient.put(
        `${apiUrl}/api/permission-management/permissions`,
        input,
        options
      );
    },
    updateUser: (id: string, body: any, options?: RequestOptions) => {
      return HttpClient.put(
        `${apiUrl}/api/identity/users/${id}`,
        body,
        options
      );
    },
  };

  public Delete = {
    deleteRole: (id: string) => {
      return HttpClient.delete(`${apiUrl}/api/identity/roles/${id}`);
    },
    removeUser: (id: string, options?: RequestOptions) => {
      return HttpClient.delete(`${apiUrl}/api/identity/users/${id}`, options);
    },
  };
}

export const IdentityService = new IdentityServiceController();
