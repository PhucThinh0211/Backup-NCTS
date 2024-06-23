import { createSelector } from "@reduxjs/toolkit";

import { defaultPagingParams } from "@/common/define";
import { RootState } from "@/store/types";

export const getCompanyState = (state: RootState) => state.adminSetting;

export function getEmailSetting() {
  return createSelector([getCompanyState], (state) => state.emailSetting);
}
