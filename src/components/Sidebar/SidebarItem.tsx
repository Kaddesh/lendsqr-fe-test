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

export const SidebarItem = ({ label, path, icon, badge, onClick }: SidebarItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = path && location.pathname === path;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (path) {
      navigate(path);
    }
  };

  return (
    <button
      className={`sidebar-item ${isActive ? 'active' : ''}`}
      onClick={handleClick}
      title={label}
    >
      <div className="sidebar-item-icon">
  <img src={icon as string} alt={label} />
</div>

      <span className="sidebar-item-label">{label}</span>
      {badge !== undefined && <span className="sidebar-item-badge">{badge}</span>}
    </button>
  );
};

export default SidebarItem;
