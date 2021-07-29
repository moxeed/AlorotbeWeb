import { GetToken } from "./Identity";

const BaseUrl = "https://api.alorotbe.com/";

export const GetData = (url: string) => {
  return fetch(BaseUrl + url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + GetToken(),
    },
  }).then((res) => res.json());
};

export const PostData = async (url: string, body: any) => {
  const data = await fetch(BaseUrl + url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + GetToken(),
    },
    body: JSON.stringify(body),
  });

  const json = await data.json();

  if (data.status < 400) return json;
  throw json;
};