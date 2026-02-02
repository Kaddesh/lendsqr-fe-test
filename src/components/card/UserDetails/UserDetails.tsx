import React from 'react'
import '../UserDetails/userDetails.scss';
import { UserProfile } from '../../../types';

interface UserDetailsProps {
  profile: UserProfile;
}

// Type-safe helper: converts an object’s keys to label/value pairs
const formatFields = <T extends Record<string, string | number>>(obj: T): [string, string][] => {
  return (Object.entries(obj) as [keyof T, string | number][])
    .map(([key, value]) => [
      // Convert camelCase to human-readable labels
      String(key)
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase()),
      String(value),
    ]);
};

const UserDetails: React.FC<UserDetailsProps> = ({ profile }) => {
  if (!profile) return <p>No profile found</p>;

  const sections = [
    { title: 'Personal Information', fields: formatFields(profile.personalInfo) },
    { title: 'Education & Employment', fields: formatFields(profile.educationEmployment) },
    { title: 'Socials', fields: formatFields(profile.socials) },
    { title: 'Guarantor', fields: formatFields(profile.guarantor) },
    { title: 'Bank Information', fields: formatFields(profile.bank) },
  ];

  return (
    <div className="details">
      {sections.map((section) => (
        <React.Fragment key={section.title}>
          <h4>{section.title}</h4>
          <div className="grid">
            {section.fields.map(([label, value]) => (
              <div className="item" key={label}>
                <span>{label}</span>
                <p>{value}</p>
              </div>
            ))}
          </div>
          <hr />
        </React.Fragment>
      ))}
    </div>
  );
};

export default UserDetails;
