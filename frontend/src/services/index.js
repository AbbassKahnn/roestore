import axios from "axios";
// GET API CAll
export const GetAPIService = (Url) => {
  return axios.get(Url);
};
// Post API CAll
export const PostAPIService = (Url, payload) => {
  return axios.post(Url, payload);
};
// Put API CAll
export const PutAPIService = (Url, payload) => {
  return axios.put(Url, payload);
};
// Patch API CAll
export const PatchAPIService = (Url, payload) => {
  return axios.patch( Url, payload);
};

// Delete API CAll
export const DeleteAPIService = (Url) => {
  return axios.delete(Url);
};
