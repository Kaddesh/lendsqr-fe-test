import React from 'react';
import SidebarItem from './SidebarItem';
import { SidebarItem as ISidebarItem } from '../../types/sidebar';
import './Sidebar.scss';

interface SidebarSectionProps {
  title: string;
  items: ISidebarItem[];
}

export const SidebarSection = ({ title, items }: SidebarSectionProps) => {
  return (
    <div className="sidebar-section">
      <h3 className="sidebar-section-title">{title}</h3>
      <div className="sidebar-section-items">
        {items.map((item) => (
          <SidebarItem
            key={item.id}
            id={item.id}
            label={item.label}
            path={item.path}
            icon={item.icon}
            badge={item.badge}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarSection;
