import HttpClient from "./HttpClient";
import { RequestOptions } from "./types";
import { PagingResponse } from "@/common/define";
import { getEnvVars } from "@/enviroment";

const { apiUrl } = getEnvVars();

export interface EmailSettingResponse {
  smtpHost: string;
  smtpPort: number;
  smtpUserName: string;
  smtpPassword: string;
  smtpDomain: string;
  smtpEnableSsl: boolean;
  smtpUseDefaultCredentials: boolean;
  defaultFromAddress: string;
  defaultFromDisplayName: string;
}

export interface CreateUpdateEmailSettingPayload {
  smtpHost?: string;
  smtpPort: number;
  smtpUserName?: string;
  smtpPassword?: string;
  smtpDomain?: string;
  smtpEnableSsl: boolean;
  smtpUseDefaultCredentials: boolean;
  defaultFromAddress: string;
  defaultFromDisplayName: string;
}

class EmailSettingController {
  public Get = {
    getEmailSetting: (options?: RequestOptions) => {
      return HttpClient.get(
        `${apiUrl}/api/setting-management/emailing`,
        options
      );
    },
  };

  public Post = {
    createEmailSetting: (
      input: CreateUpdateEmailSettingPayload,
      options?: RequestOptions
    ) => {
      return HttpClient.post(
        `${apiUrl}/api/setting-management/emailing`,
        input,
        options
      );
    },
  };

  public Put = {};

  public Delete = {};
}

export const EmailSettingService = new EmailSettingController();
