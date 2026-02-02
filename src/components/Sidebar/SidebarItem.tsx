import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.scss';

interface SidebarItemProps {
  id: string;
  label: string;
  path?: string;
  icon: React.ReactNode;
  badge?: number;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  path,
  icon,
  badge,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = path && location.pathname === path;

  return (
    <button
      className={`sidebar-item ${isActive ? 'active' : ''}`}
      onClick={() => path && navigate(path)}
    >
      <div className="sidebar-item-content">
        <div className="sidebar-item-icon">
          <img src={icon as string} alt={label} />
        </div>

        <span className="sidebar-item-label">{label}</span>

        {badge !== undefined && (
          <span className="sidebar-item-badge">{badge}</span>
        )}
      </div>
    </button>
  );
};

export default SidebarItem;
