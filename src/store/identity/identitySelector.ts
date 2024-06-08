import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../types';

const getIdentity = (state: RootState) => state.identity;

export function createRolesSelector() {
  return createSelector([getIdentity], (state) => state.roles);
}

export function createPermissionGroupsSelector() {
  return createSelector([getIdentity], (state) => state.permissions?.groups);
}

export function createRoleSelectedSelector() {
  return createSelector([getIdentity], (state) => state.roleSelected);
}

export function createUsersSelector() {
  return createSelector([getIdentity], (state) => state.users);
}

export function createUserSelectedSelector() {
  return createSelector([getIdentity], (state) => state.userSelected);
}

export function createAssignableRolesSelector() {
  return createSelector([getIdentity], (state) => state.assignableRoles);
}

export function createUserRolesSelector() {
  return createSelector([getIdentity], (state) => state.userRoles);
}

export function createErrorMessageSelector() {
  return createSelector([getIdentity], (state) => state.errorMessage);
}
