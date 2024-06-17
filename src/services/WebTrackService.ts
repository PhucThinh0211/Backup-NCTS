import { getEnvVars } from '@/enviroment';
import { RequestOptions } from './types';
import HttpClient from './HttpClient';

const { apiUrl } = getEnvVars();

export interface AwbResponse {
  flightno: string | null;
  flidate: string;
  attime: string | null;
  route: string | null;
  pieces: number;
  cweight: number;
  shipper: string | null;
  nature: string | null;
  status: string | null;
  remark: string | null;
  consignee: string | null;
  customs_status: string | null;
}

class WebTrackController {
  public Get = {
    getCarriers: (options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/web-track/carries`, options);
    },
    lookupAwb: (options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/web-track/lookup-awb`, options);
    },
    lookupFlights: (options?: RequestOptions) => {
      return HttpClient.get(
        `${apiUrl}/api/app/web-track/lookup-flights`,
        options
      );
    },
  };
}

export const WebTrackService = new WebTrackController();
