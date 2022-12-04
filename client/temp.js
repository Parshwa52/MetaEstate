import * as PushAPI from "@pushprotocol/restapi";
const notifications = await PushAPI.user.getFeeds({
  spam: true,
  user: "eip155:5:0xC43B6B6f173A5205F444C216bF7CA6aF54F307EF", // user address in CAIP
  env: "staging",
});
console.log(notifications);
