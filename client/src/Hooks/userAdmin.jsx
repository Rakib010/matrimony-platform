import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin, isPending } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: user?.email && !loading, 
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user?.email}`);
      //console.log(res.data);
      return res.data?.admin;
    },
  });
  return [isAdmin, isPending];
};

export default useAdmin;
