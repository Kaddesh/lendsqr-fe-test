import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import DashboardCard from "../../components/card/dashboardCard";
import usersIcon from "../../assets/icons/user.svg";
import activeUserIcon from "../../assets/icons/active-user.svg";
import usersWithLoanIcon from "../../assets/icons/userW-loan.svg";
import usersWithSavingsIcon from "../../assets/icons/usersW-savings.svg";
import Table from "../../components/Table/table";
import Pagination from "../../components/Pagination/Pagination";
import { fetchUsers } from "../../services/api";
import { User } from "../../types";

export const DashboardPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const result = await fetchUsers(currentPage, itemsPerPage);
        setUsers(result.data);
        setTotalItems(result.total);
      } catch (error) {
        console.error("Error loading users:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [currentPage, itemsPerPage]);

  const handleUserClick = (userId: string) => {
    console.log("View user details:", userId);
    // Navigate to user details page if needed
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        
        <h1>Users</h1>
        <div className="dashboard-cards">
          <DashboardCard
            iconSrc={usersIcon}
            iconBgColor="DF18FF"
            content="Users"
            number="2,453"
          />
          <DashboardCard
            iconSrc={activeUserIcon}
            iconBgColor="5718FF"
            content="Active User"
            number="2,453"
          />
          <DashboardCard
            iconSrc={usersWithLoanIcon}
            iconBgColor="F55F44"
            content="users with Loans"
            number="12,453"
          />
          <DashboardCard
            iconSrc={usersWithSavingsIcon}
            iconBgColor="FF3366"
            content="users with Savings"
            number="102,453"
          />
        </div>
        {loading ? (
          <div className="loading">Loading users...</div>
        ) : (
          <>
            <Table users={users} onUserClick={handleUserClick} />
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
