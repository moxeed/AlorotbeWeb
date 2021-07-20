const BaseUrl = "https://api.alorotbe.com/";
export const GetData = (url: string) => {
  return fetch(BaseUrl + url, {
    method: "GET",
  }).then((res) => res.json());
};

export const PostData = (url: string, body: any) => {
  return fetch(BaseUrl + url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => {
    if (res.status < 400) return res.json();
    return Promise.reject();
  });
};
