import NetworkOps, { FetchResponse } from '../../network/NetworkOps';
import Urls from '../../network/Urls';
import * as actionTypes from './constants';
import { setShowToast, setLoading } from './../common/actions';

export const postSignup = async(data: any) => {
    const response: FetchResponse = await NetworkOps.postToJson(Urls.signup, data);
    console.log('res', response);
    if(response.status === 200) {
      return {success: true};
    }
    return {success: false, message: response.message};
};

export const checkEmailId = async(email: string) => {
  const response: FetchResponse = await NetworkOps.get(Urls.checkEmailId + `?email=${email}`);
  console.log('res', response);
  if(response.status_code === 200) {
    return {success: true, message: response.message};
  }
  return {success: false, message: response.message};
};

export const checkMobileNumber = async(mobile: string | number) => {
  const response: FetchResponse = await NetworkOps.get(Urls.checkMobileNumber + `?mobileNumber=${mobile}`);
  console.log('res', response);
  if(response.status_code === 200) {
    return {success: true, message: response.message};
  }
  return {success: false, message: response.message};
};

export const verifyOtp = async(data: object) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.postToJson(Urls.verifyOTP, data);
  setLoading(false);
  if(response.status_code === 200) {
    return {success: true, message: response.message};
  }
  setShowToast(true, response.message);
  return {success: false}
};

export const createPassword = async(passwordInfo: object) => {
  const response: FetchResponse = await NetworkOps.postToJson(Urls.createPassword, passwordInfo);
  console.log('res', response);
  if(response.status_code === 200) {
    return {success: true, message: response.message};
  }
  return {success: false, message: response.message};
};

export const callTradeList = () => ({type: actionTypes.CALL_TRADE_LIST})