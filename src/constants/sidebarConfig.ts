import { SidebarConfig } from "../types/sidebar";
import homeIcon from '../assets/icons/home.svg';
import briefcaseIcon from '../assets/icons/briefcase.svg';

import sackIcon from '../assets/icons/sack.svg';
import handshakeIcon from '../assets/icons/handshake.svg';
import piggyBankIcon from '../assets/icons/piggy-bank.svg';
import loanRequestIcon from '../assets/icons/loan-request.svg';
import userCheckIcon from '../assets/icons/user-check.svg';
import userTimesIcon from '../assets/icons/user-times.svg';
import savingProductIcon from '../assets/icons/saving-product.svg';
import coinsIcon from '../assets/icons/coins.svg';
import transactionIcon from '../assets/icons/icon.svg';
import serviceIcon from '../assets/icons/service.svg';
import serviceAccountIcon from '../assets/icons/service-account.svg';
import settlementIcon from '../assets/icons/settlement.svg';
import chartsIcon from '../assets/icons/charts.svg';
import preferencesIcon from '../assets/icons/preferences.svg';
import feesPricingIcon from '../assets/icons/fees-pricingg.svg';
import auditIcon from '../assets/icons/audit.svg';
import user1 from '../assets/icons/users 1.svg'
import userfriends from '../assets/icons/user-friends 1.svg'



/**
 * Sidebar Configuration
 * Define all navigation items with their icons and paths
 */
export const sidebarConfig: SidebarConfig = {
  topSection: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: homeIcon,
    },
  ],
  sections: [
    {
      title: 'CUSTOMERS',
      items: [
        {
          id: 'users',
          label: 'Users',
          path: '/users',
          icon: userfriends,
        },
        {
          id: 'guarantors',
          label: 'Guarantors',
          path: '/guarantors',
          icon: user1,
        },
        {
          id: 'loans',
          label: 'Loans',
          path: '/loans',
          icon: sackIcon,
        },
        {
          id: 'decision-models',
          label: 'Decision Models',
          path: '/decision-models',
          icon: handshakeIcon,
        },
        {
          id: 'savings',
          label: 'Savings',
          path: '/savings',
          icon: piggyBankIcon,
        },
        {
          id: 'loan-requests',
          label: 'Loan Requests',
          path: '/loan-requests',
          icon: loanRequestIcon,
        },
        {
          id: 'whitelist',
          label: 'WhiteList',
          path: '/whitelist',
          icon: userCheckIcon,
        },
        {
          id: 'karma',
          label: 'Karma',
          path: '/karma',
          icon: userTimesIcon,
        },
      ],
    },
    {
      title: 'BUSINESSES',
      items: [
        {
          id: 'organization',
          label: 'Organization',
          path: '/organization',
          icon: briefcaseIcon,
        },
        {
          id: 'loan-products',
          label: 'Loan Products',
          path: '/loan-products',
          icon: loanRequestIcon,
        },
        {
          id: 'savings-products',
          label: 'Savings Products',
          path: '/savings-products',
          icon: savingProductIcon,
        },
        {
          id: 'fees-charges',
          label: 'Fees and Charges',
          path: '/fees-charges',
          icon: coinsIcon,
        },
        {
          id: 'transactions',
          label: 'Transactions',
          path: '/transactions',
          icon: transactionIcon,
        },
        {
          id: 'services',
          label: 'Services',
          path: '/services',
          icon: serviceIcon,
        },
        {
          id: 'service-account',
          label: 'Service Account',
          path: '/service-account',
          icon: serviceAccountIcon,
        },
        {
          id: 'settlements',
          label: 'Settlements',
          path: '/settlements',
          icon: settlementIcon,
        },
        {
          id: 'reports',
          label: 'Reports',
          path: '/reports',
          icon: chartsIcon,
        },
      ],
    },
    {
      title: 'SETTINGS',
      items: [
        {
          id: 'preferences',
          label: 'Preferences',
          path: '/preferences',
          icon: preferencesIcon,
        },
        {
          id: 'fees-pricing',
          label: 'Fees and Pricing',
          path: '/fees-pricing',
          icon: feesPricingIcon,
        },
        {
          id: 'audit-logs',
          label: 'Audit Logs',
          path: '/audit-logs',
          icon: auditIcon,
        },
      ],
    },
  ],
};