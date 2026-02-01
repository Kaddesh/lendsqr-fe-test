import React from 'react';
import TextInput from '../Form/TextInput'
import { FiChevronDown, FiCalendar } from 'react-icons/fi';
import './FilterModal.scss';
import { useForm } from 'react-hook-form';
import { UserFilters } from '../../types';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { clearFilters, setFilters } from '../../redux/slices/usersSlice';


type Props = {
  onClose?: () => void;
  onReset?: () => void;
  onFilter?: () => void;
};

const FilterModal: React.FC<Props> = ({onClose}) => {
  const { register, handleSubmit, reset } = useForm<UserFilters>();

const dispatch = useDispatch<AppDispatch>();

const onFilter = (data: UserFilters) => {
  dispatch(setFilters(data));
};

const onReset = () => {
  reset();
  dispatch(clearFilters());
};

  return (
    <div className="filter-modal-overlay" onClick={onClose}>
        <form className="filter-modal" onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onFilter)}>
        <TextInput
          label="Organization"
          name="organization"
          placeholder="Select"
          className="form-group"
          inputClassName="form-input"
          labelClassName="form-label"
          right={<FiChevronDown />}
          rightClassName="input-icon"
          register={register('organization')}
        />

        <TextInput
          label="Username"
          name="username"
          placeholder="User"
          className="form-group"
          inputClassName="form-input"
          labelClassName="form-label"
          register={register('username')}
        />

        <TextInput
          label="Email"
          name="email"
          type="email"
          placeholder="Email"
          className="form-group"
          inputClassName="form-input"
          labelClassName="form-label"
          register={register('email')}
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
          register={register('date')}
        />

        <TextInput
          label="Phone Number"
          name="phone"
          placeholder="Phone Number"
          className="form-group"
          inputClassName="form-input"
          labelClassName="form-label"
          register={register('phone')}
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
          register={register('status')}
        />

        <div className="filter-modal__actions">
          <button className="btn btn--outline" onClick={onReset}>
            Reset
          </button>
          <button className="btn btn--primary" type='submit'>
            Filter
          </button>
        </div>
      </form>
    </div>
    
  );
};

export default FilterModal;
