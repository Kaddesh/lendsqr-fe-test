import React, { useState } from 'react';
import { sidebarConfig } from '../../constants/sidebarConfig';
import briefcase from '../../assets/icons/briefcase.svg'
import { FiX } from 'react-icons/fi';
import './Sidebar.scss';
import SidebarItem from './SidebarItem';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const [selectedOrganization, setSelectedOrganization] =
    useState('Select Organization');

  const organizations = [
    'Acme Corporation',
    'Tech Ventures',
    'Global Industries',
    'Innovation Labs',
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      {/*  TOP SECTION  */}
      <div className="sidebar-top-section">
        <div className="org-switcher-wrapper">
          <button
            className="sidebar-item org-switcher"
            onClick={() => setShowOrgDropdown((p) => !p)}
          >
            <img src={briefcase} className="sidebar-item-icon" />
            <span className="sidebar-item-label">{selectedOrganization}</span>
            <span className="org-switcher-arrow">▼</span>
          </button>

          {showOrgDropdown && (
            <div className="org-dropdown">
              {organizations.map((org) => (
                <button
                  key={org}
                  className="org-dropdown-item"
                  onClick={() => {
                    setSelectedOrganization(org);
                    setShowOrgDropdown(false);
                  }}
                >
                  {org}
                </button>
              ))}
            </div>
          )}
        </div>

        {sidebarConfig.topSection.map((item) => (
          <SidebarItem key={item.id} {...item} />
        ))}
      </div>

      {/*  MAIN SECTIONS  */}
      <div className="sidebar-main-sections">
        {sidebarConfig.sections.map((section) => (
          <div className="sidebar-section" key={section.title}>
            <h3 className="sidebar-section-title">{section.title}</h3>

            <div className="sidebar-section-items">
              {section.items.map((item) => (
                <SidebarItem key={item.id} {...item} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {onClose && (
        <button className="sidebar-close-btn" onClick={onClose}>
          <FiX size={30} />
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
