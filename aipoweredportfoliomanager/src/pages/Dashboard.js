import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import RevenueChart from '../components/RevenueChart';
import EmailList from '../components/EmailList';
import StatusCard from '../components/StatusCard';
import ToDoList from '../components/ToDoList';
import MeetingCard from '../components/MeetingCard';
import './Dashboard.css';

const Dashboard = () => (
  <div className="container">
    <Sidebar />
    <main className="main-content">
      <Header />
      <section className="stats-cards">
        <StatCard icon="🏦" amount="$143,624" label="Your bank balance" />
        <StatCard icon="📂" amount="12" label="Uncategorized transactions" />
        <StatCard icon="👥" amount="7" label="Employees working today" />
        <StatCard icon="💳" amount="$3,287.49" label="This week's card spending" />
      </section>
      <section className="secondary">
        <div className="left-panel">
          <div className="small-card">
            <p>New clients</p>
            <h2>54 <span className="percent positive">+18.7%</span></h2>
          </div>
          <div className="small-card">
            <p>Invoices overdue</p>
            <h2>6 <span className="percent negative">+2.7%</span></h2>
          </div>
          <RevenueChart />
          <EmailList />
        </div>
        <div className="right-panel">
          <StatusCard />
          <ToDoList />
          <MeetingCard />
        </div>
      </section>
    </main>
  </div>
);

export default Dashboard;
