import { useEffect, useState } from 'react';
import '../userDetail/DetailsPage.scss';
import { useParams, useNavigate } from 'react-router-dom';
import UserCard from '../../components/card/userCard';
import UserDetails from '../../components/card/UserDetails/UserDetails';
import { User, UserProfile } from '../../types';
import { fetchUserById, fetchUserProfileById } from '../../services/api';
import ArrowLeft from '../../assets/icons/arrow-left.svg'

const DetailsPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const fetchedUser = await fetchUserById(userId);
        const fetchedProfile = await fetchUserProfileById(userId);

        setUser(fetchedUser);
        setProfile(fetchedProfile);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  if (loading) return <p>Loading profile...</p>;
  if (!user || !profile) return <p>User not found</p>;

  return (
    <div className="detailpage-container">
      <div className='detailpage-content'>
      {/* Back */}
      <div className="back-row" onClick={() => navigate('/users')}>
        <img src={ArrowLeft} alt="arrow-left" className='back-row__arrow' />
        <span>Back to Users</span>
      </div>

      {/* Header */}
      <div className="details-header">
        <h2>User Details</h2>

        <div className="actions">
          <button className="btn blacklist">Blacklist User</button>
          <button className="btn activate">Activate User</button>
        </div>
      </div>
</div>
      {/* Cards */}
      <UserCard user={user} profile={profile} />
      <UserDetails profile={profile} />
    
    </div>
  );
};

export default DetailsPage;
