import { FiEye } from 'react-icons/fi';
import { HiOutlineUser, HiOutlineUserRemove } from 'react-icons/hi';
import './UserActionModal.scss';

type Props = {
  onClose?: () => void;
  onView?: () => void;
  onBlacklist?: () => void;
  onActivate?: () => void;
};

const UserActionModal: React.FC<Props> = ({
  onView,
  onBlacklist,
  onActivate,
}) => {
  return (
    <div className="user-action-modal">
      <button className="action-item" onClick={onView}>
        <FiEye />
        <span>View Details</span>
      </button>

      <button className="action-item" onClick={onBlacklist}>
        <HiOutlineUserRemove />
        <span>Blacklist User</span>
      </button>

      <button className="action-item" onClick={onActivate}>
        <HiOutlineUser />
        <span>Activate User</span>
      </button>
    </div>
  );
};

export default UserActionModal;
