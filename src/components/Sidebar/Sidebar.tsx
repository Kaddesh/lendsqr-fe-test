import { sidebarConfig } from '../../constants/sidebarConfig';
import briefcase from '../../assets/icons/briefcase.svg'
import { FiX } from 'react-icons/fi';
import '../Sidebar/Sidebar.scss';
import SidebarItem from './SidebarItem';
import dropdownarrow from '../../assets/icons/downarrow.svg';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      {/*  TOP SECTION  */}
      <div className="sidebar-top-section">
        <div className="org-switcher-wrapper">
          <button
            className="sidebar-item org-switcher"
          >
            <div className='org-wrap'>
              <img src={briefcase} className="sidebar-item-icon" />
              <span className="sidebar-item-label">Switch Organization</span>
            </div>

            <img src={dropdownarrow} className="org-switcher-arrow"/>
          </button>
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
          <FiX size={20} />
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
