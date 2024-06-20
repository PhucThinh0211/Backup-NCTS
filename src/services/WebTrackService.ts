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
export interface FlightLookupResponse {
  carrier: string | null;
  flidate: string;
  aircraft: string | null;
  flightno: string | null;
  flitime: string | null;
  attime: string | null;
  status: string | null;
  route: string | null;
}
export interface FlightLookupPagingResponse {
  data: FlightLookupResponse[];
  total: number;
}
export interface CarrierResponse {
  carrier: string | null;
  code: string | null;
  name: string | null;
}
export interface ClassResponse {
  class: string | null;
  name: string | null;
}
export interface FreightEstimateResponse {
  service: string | null;
  money: number;
  tax: number;
}

class WebTrackController {
  public Get = {
    getCarriers: (options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/web-track/carriers`, options);
    },
    getClassList: (options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/web-track/class-list`, options);
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
  public Post = {
    estimateFreight: (input: any, options?: RequestOptions) => {
      return HttpClient.post(
        `${apiUrl}/api/app/web-track/freight-estimate`,
        input,
        options
      );
    },
  };
}

export const WebTrackService = new WebTrackController();
