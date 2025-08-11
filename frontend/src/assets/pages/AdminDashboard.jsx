import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <div>AdminDashboard {user && user.name}</div>
    </>
  );
};

export default AdminDashboard;
