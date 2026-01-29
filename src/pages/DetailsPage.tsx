import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserCard from '../components/card/userCard';
import UserDetails from '../components/card/UserDetails/UserDetails';
import { User, UserProfile } from '../types/index';
import { fetchUserById, fetchUserProfileById } from '../services/api';

const DetailsPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (!userId) return;
      setLoading(true);

      const fetchedUser = await fetchUserById(userId);
      console.log('This is user:', fetchedUser);
      const fetchedProfile = await fetchUserProfileById(userId);

      setUser(fetchedUser);
      setProfile(fetchedProfile);
      setLoading(false);
    };

    loadUser();
  }, [userId]);

  if (loading) return <p>Loading profile...</p>;
  if (!user || !profile) return <p>User not found</p>;

  return (
    <div className='detailpage '>
      <UserCard user={user} profile={profile} />
      <UserDetails profile={profile} />
    </div>
  );
};

export default DetailsPage;
