import { GetToken } from "./Identity";

const BaseUrl = "https://api.alorotbe.com/";
export const GetData = (url: string) => {
  return fetch(BaseUrl + url, {
    mode: "cors",
    method: "GET",
  }).then((res) => res.json());
};

export const PostData = (url: string, body: any) => {
  return fetch(BaseUrl + url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + GetToken(),
    },
    body: JSON.stringify(body),
  }).then((res) => {
    debugger;
    if (res.status < 400) return res.json();
    return Promise.reject();
  });
};
