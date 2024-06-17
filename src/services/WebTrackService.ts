import { getEnvVars } from "@/enviroment";
import { RequestOptions } from "./types";
import HttpClient from "./HttpClient";

const {apiUrl} = getEnvVars();

class WebTrackController {
  public Get = {
    getCarriers: (options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/web-track/carries`, options);
    },
    lookupAwb: (options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/web-track/lookup-awb`, options);
    },
    lookupFlights: (options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/web-track/lookup-flights`, options);
    }
  }
}

export const WebTrackService = new WebTrackController();