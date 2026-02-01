import React, { useState } from 'react';
import TextInput from '../Form/TextInput';
import lendLogo from '../../assets/icons/lend-Logo.svg';
import notificationIcon from '../../assets/icons/notification.svg';
import dropdownIcon from '../../assets/icons/dropdown.svg';
import searchIcon from '../../assets/icons/search.svg';
import profileImg from '../../assets/images/profileimg.png';
import './dashboardNav.scss';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../../redux/slices/usersSlice';

type Props = {
  onMenuToggle: () => void;
};

const DashboardNav: React.FC<Props> = ({ onMenuToggle }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const searchTerm = useSelector((state: RootState) => state.users.searchTerm);

  return (
    <nav className="dashboard-nav">
      <div className="dashboard-nav__inner">

        {/* LEFT */}
        <div className="dashboard-nav__left">
          <button className="dashboard-nav__menu" onClick={onMenuToggle}>
            ☰
          </button>

          <img src={lendLogo} alt="logo" className="dashboard-nav__logo" />

          {/* Desktop search */}
          <div className="dashboard-nav__search-wrapper desktop-only">
            <TextInput
              name="search"
              type="search"
              placeholder="Search for anything"
              inputClassName="dashboard-nav__search-input"
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
            <div className="dashboard-nav__search-action">
              <img src={searchIcon} alt="search" />
            </div>
          </div>
        </div>

        {/* RIGHT DESKTOP */}
        <div className="dashboard-nav__right desktop-only">
          <h3 className="dashboard-nav__docs">Docs</h3>
          <img
            src={notificationIcon}
            alt="notification"
            className="dashboard-nav__icon"
          />

          <div className="dashboard-nav__profile">
            <div className="dashboard-nav__avatar">
              <img src={profileImg} alt="profile" />
            </div>
            <p className="dashboard-nav__username">Ayodeji</p>
            <img
              src={dropdownIcon}
              alt="dropdown"
              className="dashboard-nav__dropdown"
            />
          </div>
        </div>

        {/* MOBILE RIGHT */}
        <div className="dashboard-nav__mobile-right mobile-only">
          <div className="dashboard-nav__avatar">
            <img src={profileImg} alt="profile" />
          </div>

          <button
            className="dashboard-nav__mobile-dots"
            onClick={() => setShowMobileMenu((prev) => !prev)}
          >
            ⋮
          </button>

          {showMobileMenu && (
            <div className="dashboard-nav__mobile-dropdown">
              <p>Docs</p>
              <div className="dropdown-item">
                <img src={notificationIcon} alt="notification" />
                <span>Notifications</span>
              </div>
              <div className="dropdown-item">
                <span>Ayodeji</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;
