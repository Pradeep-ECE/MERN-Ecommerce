import axios from "axios";

const apiUrl = `http://localhost:6001/v1/`;
/**
 * Executes an HTTP GET request to the specified URL with optional headers and query parameters.
 *
 * @param {string} url - The URL to which the GET request is sent.
 * @param {Object} headers - Optional headers to include in the request.
 * @param {Object} params - Optional query parameters to include in the request URL.
 * @returns {Promise<any>} - A Promise that resolves with the response data.
 */
export const getMethod = async (url, { headers, withCredentials }, params) => {
  try {
    console.log("Headers=====", headers);
    console.log("Query Params:", params);
    console.log(apiUrl+url+ params);
    

    const response = await axios.get(apiUrl + url, {
      headers: headers,
      params: params ? params : null,
      withCredentials: withCredentials?withCredentials:null,
    });
    return response && response.data;
  } catch (error) {
    console.log(error.response);
    
    throw error;
  }
};
/**
 * Executes an HTTP POST request to the specified URL with optional headers and data payload.
 *
 * @param {string} url - The URL to which the POST request is sent.
 * @param {Object} headers - Optional headers to include in the request.
 * @param {any} data - The data payload to include in the request body.
 * @returns {Promise<any>} - A Promise that resolves with the response data.
 */
export const postMethod = async (url, { headers, withCredentials }, data) => {
  try {
    console.log("post method", apiUrl + `${url}`, data);
    const response = await axios.post(apiUrl + `${url}`, data, {
      headers: headers,
      // ...(data.params && { params: data.params }),
      withCredentials: withCredentials || null,
    });
    console.log("REEEEESSSS", response);

    return response;
  } catch (error) {
    console.log(error.message);

    throw error;
  }
};
/**
 * Executes an HTTP PUT request to the specified URL with optional headers and data payload.
 *
 * @param {string} url - The URL to which the PUT request is sent.
 * @param {Object} headers - Optional headers to include in the request.
 * @param {any} data - The data payload to include in the request body.
 * @returns {Promise<any>} - A Promise that resolves with the response data.
 */
export const putMethod = async (url, { headers, withCredentials }, data) => {
  try {
    const response = await axios.put(apiUrl + `${url}`, data, {
      headers: headers,
      withCredentials: withCredentials || null,
    });
    return response && response.data;
  } catch (error) {
    throw error.response.data;
  }
};
/**
 * Executes an HTTP DELETE request to the specified URL with optional headers.
 *
 * @param {string} url - The URL from which the resource should be deleted.
 * @param {Object} headers - Optional headers to include in the request.
 * @returns {Promise<void>} - A Promise that resolves if the resource is deleted successfully.
 */
export const deleteMethod = async (url, headers, params) => {
  try {
    const response = await axios.delete(apiUrl + `${url}`, {
      headers: headers,
      params: params,
    });
    return response && response.data;
  } catch (error) {
    throw error.response.data;
  }
};
