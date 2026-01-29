import React from 'react';
import TextInput from '../Form/TextInput'
import { FiChevronDown, FiCalendar } from 'react-icons/fi';
import './FilterModal.scss';


type Props = {
  onClose?: () => void;
  onReset?: () => void;
  onFilter?: () => void;
};

const FilterModal: React.FC<Props> = ({ onReset, onFilter }) => {
  return (
    <div className="filter-modal-overlay">
      <div className="filter-modal">

        <TextInput
          label="Organization"
          name="organization"
          placeholder="Select"
          className="form-group"
          inputClassName="form-input"
          labelClassName="form-label"
          right={<FiChevronDown />}
          rightClassName="input-icon"
        />

        <TextInput
          label="Username"
          name="username"
          placeholder="User"
          className="form-group"
          inputClassName="form-input"
          labelClassName="form-label"
        />

        <TextInput
          label="Email"
          name="email"
          type="email"
          placeholder="Email"
          className="form-group"
          inputClassName="form-input"
          labelClassName="form-label"
        />

        <TextInput
          label="Date"
          name="date"
          placeholder="Date"
          className="form-group"
          inputClassName="form-input"
          labelClassName="form-label"
          right={<FiCalendar />}
          rightClassName="input-icon clickable"
        />

        <TextInput
          label="Phone Number"
          name="phone"
          placeholder="Phone Number"
          className="form-group"
          inputClassName="form-input"
          labelClassName="form-label"
        />

        <TextInput
          label="Status"
          name="status"
          placeholder="Select"
          className="form-group"
          inputClassName="form-input"
          labelClassName="form-label"
          right={<FiChevronDown />}
          rightClassName="input-icon"
        />

        <div className="filter-modal__actions">
          <button className="btn btn--outline" onClick={onReset}>
            Reset
          </button>
          <button className="btn btn--primary" onClick={onFilter}>
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
