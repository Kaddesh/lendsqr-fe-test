import React from 'react';
import { useState } from 'react';
import SidebarItem from './SidebarItem';
import SidebarSection from './SidebarSection';
import { SidebarConfig } from '../../types/sidebar';
import './Sidebar.scss';
import { FiX } from 'react-icons/fi';

interface SidebarProps {
  config: SidebarConfig;
  isOpen?: boolean;
  onClose?: () => void;
  
}

export const Sidebar = ({ config, isOpen = true, onClose }: SidebarProps) => {
  const [selectedOrganization, setSelectedOrganization] = useState('Select Organization');
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);

  const organizations = [
    'Acme Corporation',
    'Tech Ventures',
    'Global Industries',
    'Innovation Labs',
  ];

  const handleOrgSelect = (org: string) => {
    setSelectedOrganization(org);
    setShowOrgDropdown(false);
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-content">
        {/* Top Section - Organization Switcher and Dashboard */}
        <div className="sidebar-top-section">
          <div className="org-switcher-wrapper">
            <button
              className="sidebar-item org-switcher"
              onClick={() => setShowOrgDropdown(!showOrgDropdown)}
            >
              <div className="sidebar-item-icon">🏢</div>
              <div className="org-switcher-content">
                <span className="sidebar-item-label">{selectedOrganization}</span>
                <span className="org-switcher-arrow">▼</span>
              </div>
            </button>

            {showOrgDropdown && (
              <div className="org-dropdown">
                {organizations.map((org) => (
                  <button
                    key={org}
                    className="org-dropdown-item"
                    onClick={() => handleOrgSelect(org)}
                  >
                    {org}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="sidebar-top-divider" />

          {config.topSection.map((item) => (
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

        {/* Main Sections */}
        <div className="sidebar-main-sections">
          {config.sections.map((section, index) => (
            <SidebarSection key={index} title={section.title} items={section.items} />
          ))}
        </div>
      </div>

      {/* Close button for mobile */}
      {onClose && (
        <button className="sidebar-close-btn" onClick={onClose}>
          <FiX size={30} />
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
