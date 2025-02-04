import useAuth from "../../../Hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();
  return (
    <div className="text-3xl p-5">
      <span>Hi,Welcome : </span>
      {user?.displayName ? user?.displayName : "Back"}
    </div>
  );
};

export default UserHome;
