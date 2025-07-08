


import Sidebar from './components/Sidebar';
import '../styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main">
        <h1>Dashboard!</h1>
        <p>You have successfully logged in.</p>
        <div style={{ marginTop: '2rem' }}>
          {/* User Management Table and Permissions Panel */}
          <div>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>User Management</h2>
            <div>
              {/* UserManagement component */}
              {/* @ts-ignore */}
              {require('./UserManagement').default && React.createElement(require('./UserManagement').default)}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
