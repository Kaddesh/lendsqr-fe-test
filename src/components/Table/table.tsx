import { useState, useRef, useEffect } from "react";
import { User } from "../../types";
import filterIcon from "../../assets/icons/filter-button.svg";
import moreVerticalIcon from "../../assets/icons/more-vertical.svg";
import "./table.scss";
import FilterModal from "../Modal/filterModal";
import UserActionModal from "../Modal/userActionModal";
import { useNavigate } from "react-router-dom";
import tableHeaders from "../../constants/tableConfig";

interface TableProps {
  users: User[];
}

const Table: React.FC<TableProps> = ({ users }) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [activeFilterKey, setActiveFilterKey] = useState<string | null>(null);

  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const filterRefs = useRef<Record<string, HTMLDivElement | null>>({});
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

      if (
        activeFilterKey &&
        filterRefs.current[activeFilterKey] &&
        !filterRefs.current[activeFilterKey]?.contains(event.target as Node)
      ) {
        setActiveFilterKey(null);
      }
    };

    document.addEventListener("click",  handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openMenuId, activeFilterKey]);

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
      {/* ================= DESKTOP / TABLET TABLE ================= */}
      <table className="users-table desktop-table">
        <thead>
          <tr>
            {tableHeaders.map(({ label, key, filterable }) => (
              <th key={key}>
                <div
                  className="filter-container"
                  ref={(el) => (filterRefs.current[key] = el)}
                >
                  <div className="table-header">
                    <span>{label}</span>
                    {filterable && (
                      <img
                        src={filterIcon}
                        alt="filter"
                        className="header-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveFilterKey(activeFilterKey === key ? null : key);
                        }}
                      />
                    )}
                  </div>

                  {activeFilterKey === key && (
                    <FilterModal onClose={() => setActiveFilterKey(null)} />
                  )}
                </div>
              </th>
            ))}
            <th />
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
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === user.id ? null : user.id);
                      }}
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
      </table>

      {/*  MOBILE CARDS  */}
      <div className="mobile-cards">
        {users.map((user) => {
          const statusColors = getStatusColor(user.status);

          return (
            <div className="user-card" key={user.id}>
              <div className="user-card__header">
                <div>
                  <h4>{`${user.firstName} ${user.lastName}`}</h4>
                  <p>{user.email}</p>
                </div>

                <div
                  className="user-card__wrapper"
                  ref={(el) => (menuRefs.current[user.id] = el)}
                >
                  <button
                    className="user-card__button"
                    onClick={() =>
                      setOpenMenuId(openMenuId === user.id ? null : user.id)
                    }
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
              </div>

              <div className="user-card__row">
                <span>Organization:</span>
                <span>{user.company}</span>
              </div>

              <div className="user-card__row">
                <span>Phone:</span>
                <span>{user.phone}</span>
              </div>

              <div className="user-card__row">
                <span>Status:</span>
                <span
                  className="status-badge"
                  style={{
                    backgroundColor: statusColors.bg,
                    color: statusColors.text,
                  }}
                >
                  {user.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Table;
