const BaseUrl = "https://api.alorotbe.com/";
export const GetData = (url: string) => {
  return fetch(BaseUrl + url, {
    mode: "cors",
    method: "GET",
  }).then((res) => res.json());
};
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyIiwibmJmIjoxNjI2ODkxNDAyLCJleHAiOjE2Mjc0OTYyMDIsImlhdCI6MTYyNjg5MTQwMn0.AGsHKfn86ArO3ZslsZHgQtEv1ZWMDQ4PYuo7GSRE7Fg";
export const PostData = (url: string, body: any) => {
  return fetch(BaseUrl + url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(body),
  }).then((res) => {
    if (res.status < 400) return res.json();
    return Promise.reject();
  });
};
