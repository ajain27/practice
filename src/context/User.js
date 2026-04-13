import { useUserContext } from "./Context";

function User() {
  const user = useUserContext();
  return <div>{console.log(user.isSubcribed)}</div>;
}

export default User;
