const tokenName = "@T#SG$!2";

const SetToken = (token: string) => localStorage.setItem(tokenName, token);
const GetToken = () => localStorage.getItem(tokenName);
const SignOut = () => localStorage.removeItem(tokenName);
export { SetToken, GetToken, SignOut };
