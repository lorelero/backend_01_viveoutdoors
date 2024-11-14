

const Dashboard = ({ userType }) => {
  return (
    <div>
      {userType === 'admin' ? (
        <h2>Admin Dashboard</h2>
      ) : (
        <h2>User Dashboard</h2>
      )}
    </div>
  );
};

export default Dashboard;
