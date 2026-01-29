import React from 'react';
import '../card/userCard.scss';
import { User, UserProfile } from '../../types';

interface UserCardProps {
  user: User;
  profile: UserProfile;
}

const UserCard: React.FC<UserCardProps> = ({ user, profile }) => {
  return (
    <div className="user-card">
      <div className="row">
        <div className="avatar">
          <img src={user.avatar} alt={user.firstName} />
        </div>

        <div className="name-block">
          <h3>{profile.personalInfo.fullName}</h3>
          <p>{profile.userCode}</p>
        </div>

        <div className="divider" />

        <div className="rating">
          <span>User’s Tier</span>
          <div>{'⭐'.repeat(profile.rating)}</div>
        </div>

        <div className="divider" />

        <div className="bank">
          <h4>{profile.accountBalance}</h4>
          <p>
            {profile.bank.accountNumber} / {profile.bank.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;