import {AxiosRequestConfig} from "axios";

export interface HttpClientConfig extends AxiosRequestConfig {
	loading?: boolean,
	needToken?: boolean,
	checkLogin?: boolean
}