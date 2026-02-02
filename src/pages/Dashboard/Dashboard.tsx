import { useEffect } from "react";
import "../Dashboard/Dashboard.scss";
import DashboardCard from "../../components/card/dashboardCard";
import usersIcon from "../../assets/icons/user.svg";
import activeUserIcon from "../../assets/icons/active-user.svg";
import usersWithLoanIcon from "../../assets/icons/userW-loan.svg";
import usersWithSavingsIcon from "../../assets/icons/usersW-savings.svg";
import Table from "../../components/Table/table";
import Pagination from "../../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchUsersAsync,
  setCurrentPage,
  setPageSize,
} from "../../redux/slices/usersSlice";

export const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    data: users,
    loading,
    currentPage,
    pageSize,
    total,
  } = useSelector((state: RootState) => state.users);

  const { filters, searchTerm } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(
      fetchUsersAsync({
        page: currentPage,
        pageSize,
        filters,
        searchTerm
      }),
    );
  }, [dispatch, currentPage, pageSize, filters, searchTerm]);


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
            <Table
              users={users}
              
            />
            <Pagination
              currentPage={currentPage}
              totalItems={total}
              itemsPerPage={pageSize}
              onPageChange={(page) => dispatch(setCurrentPage(page))}
              onItemsPerPageChange={(size) => dispatch(setPageSize(size))}
            />{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
