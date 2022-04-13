import Api from "..";
import { VIEW_WATER_USERS, SEARCH_METERS, ADD_METER_READING, VIEW_METER_READINGS, VIEW_USER_DETAILS, GET_CHARGE_CODES, ADD_OFFLINE_READING, COMPARE_AND_SAVE } from "../ApiConstants";

export function viewWaterUsersAPI(body) {    
  return Api(
    VIEW_WATER_USERS,
    null,
    "post",
    body
  );
}
export function searchMetersAPI(body) {    
  return Api(
    SEARCH_METERS,
    null,
    "post",
    body
  );
}
export function addMeterReadingAPI(body) {    
  return Api(
    ADD_METER_READING,
    null,
    "post",
    body
  );
}
export function addOfflineReadingAPI(body) {  
  // console.log("api addOfflineReadingAPI : ", ADD_OFFLINE_READING + " body : " + JSON.stringify(body));
  return Api(
    ADD_OFFLINE_READING,
    null,
    "post",
    body
  );
}
export function compareAndSaveReadingAPI(body) {  
  // console.log("api compareAndSaveReadingAPI : ", COMPARE_AND_SAVE + " body : " + JSON.stringify(body));
  return Api(
    COMPARE_AND_SAVE,
    null,
    "post",
    body
  );
}
export function viewMeterReadingsAPI(body) {    
  return Api(
    VIEW_METER_READINGS,
    null,
    "post",
    body
  );
}
export function viewUserDetailsAPI(body) {    
  return Api(
    VIEW_USER_DETAILS,
    null,
    "post",
    body
  );
}
export function getChargeCodesDetailsAPI(body) {    
  return Api(
    GET_CHARGE_CODES,
    null,
    "post",
    body
  );
}