import React from 'react'
import TextInput from '../../components/Form/TextInput';
import lendLogo from '../../assets/icons/lend-Logo.svg'
import notificationIcon from '../../assets/icons/notification.svg'
import dropdownIcon from '../../assets/icons/dropdown.svg'
import searchIcon from '../../assets/icons/search.svg'
import profileImg from '../../assets/images/profileimg.png'
import './dashboardNav.scss'

const DashboardNav: React.FC = () => {
  return (
    <nav className="dashboard-nav">
      <div className="dashboard-nav__inner">
        <div className="dashboard-nav__left">
          <div className="dashboard-nav__logo">
            <img src={lendLogo} alt="lend-logo" />
          </div>

          <div className="dashboard-nav__search-wrapper">
            <TextInput
              name="search"
              type="search"
              placeholder="Search for anything"
              inputClassName="dashboard-nav__search-input"
            />
            <div className="dashboard-nav__search-action">
              <img src={searchIcon} alt="search-icon" />
            </div>
          </div>
        </div>

        <div className="dashboard-nav__right">
          <h3 className="dashboard-nav__docs">Docs</h3>
          <img src={notificationIcon} alt="notification" className="dashboard-nav__icon" />
          <div className="dashboard-nav__profile">
            <div className="dashboard-nav__avatar">
              <img src={profileImg} alt="profile" />
            </div>
            <p className="dashboard-nav__username">Ayodeji</p>
            <img src={dropdownIcon} alt="dropdown" className="dashboard-nav__dropdown" />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default DashboardNav
