import React, { useState, useRef, useEffect } from "react";
import { User } from "../../types";
import filterIcon from "../../assets/icons/filter-button.svg";
import moreVerticalIcon from "../../assets/icons/more-vertical.svg";
import "./table.scss";
import FilterModal from "../Modal/filterModal";
import UserActionModal from "../Modal/userActionModal";
import { useNavigate } from "react-router-dom";

interface TableProps {
  users: User[];
  onUserClick?: (userId: string) => void;
}

const Table: React.FC<TableProps> = ({ users }) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openMenuId &&
        menuRefs.current[openMenuId] &&
        !menuRefs.current[openMenuId]?.contains(event.target as Node)
      ) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuId]);

  const handleMenuClick = (userId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenMenuId((prev) => (prev === userId ? null : userId));
  };

  const handleViewUser = (userId: string) => {
    setOpenMenuId(null);
    navigate(`/users/${userId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return { bg: "#E8F5E9", text: "#39CD62" };
      case "inactive":
        return { bg: "#F5F5F5", text: "#545F7D" };
      case "pending":
        return { bg: "#FEF3E2", text: "#E9B200" };
      case "blacklisted":
        return { bg: "#FCE8E6", text: "#E4033B" };
      default:
        return { bg: "#F5F5F5", text: "#545F7D" };
    }
  };

  return (
    <div className="table-wrapper">
      <table className="users-table">
        <thead>
          <tr>
            <th>
              <div className="table-header">
                <span>organization</span>
                <img
                  src={filterIcon}
                  alt="sort"
                  className="header-icon"
                  onClick={() => setShowFilterModal(true)}
                />
              </div>
            </th>
            <th>
              <div className="table-header">
                <span>user</span>
                <img
                  src={filterIcon}
                  alt="sort"
                  className="header-icon"
                  onClick={() => setShowFilterModal(true)}
                />
              </div>
            </th>
            <th>
              <div className="table-header">
                <span>email</span>
                <img
                  src={filterIcon}
                  alt="sort"
                  className="header-icon"
                  onClick={() => setShowFilterModal(true)}
                />
              </div>
            </th>
            <th>
              <div className="table-header">
                <span>phone number</span>
                <img
                  src={filterIcon}
                  alt="sort"
                  className="header-icon"
                  onClick={() => setShowFilterModal(true)}
                />
              </div>
            </th>
            <th>
              <div className="table-header">
                <span>date joined</span>
                <img
                  src={filterIcon}
                  alt="sort"
                  className="header-icon"
                  onClick={() => setShowFilterModal(true)}
                />
              </div>
            </th>
            <th>
              <div className="table-header">
                <span>status</span>
                <img
                  src={filterIcon}
                  alt="sort"
                  className="header-icon"
                  onClick={() => setShowFilterModal(true)}
                />
              </div>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const statusColors = getStatusColor(user.status);
            return (
              <tr key={user.id}>
                <td>{user.company}</td>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.joinDate}</td>
                <td>
                  <span
                    className="status-badge"
                    style={{
                      backgroundColor: statusColors.bg,
                      color: statusColors.text,
                    }}
                  >
                    {user.status}
                  </span>
                </td>
                <td>
                  <div
                    className="menu-wrapper"
                    ref={(el) => (menuRefs.current[user.id] = el)}
                  >
                    <button
                      className="menu-button"
                      onClick={(e) => handleMenuClick(user.id, e)}
                    >
                      <img src={moreVerticalIcon} alt="more options" />
                    </button>

                    {openMenuId === user.id && (
                      <UserActionModal
                        onView={() => handleViewUser(user.id)}
                        onClose={() => setOpenMenuId(null)}
                      />
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
        {showFilterModal && (
          <FilterModal
            onClose={() => setShowFilterModal(false)}
            onReset={() => {
              // reset filter logic here
              setShowFilterModal(false);
            }}
            onFilter={() => {
              // apply filter logic here
              setShowFilterModal(false);
            }}
          />
        )}
      </table>
    </div>
  );
};

export default Table;
