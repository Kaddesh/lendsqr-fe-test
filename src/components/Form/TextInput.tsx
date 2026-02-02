import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  label?: string;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  register?: UseFormRegisterReturn;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  placeholder?: string;
  right?: React.ReactNode;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  rightClassName?: string;
};

const TextInput: React.FC<Props> = ({
  label,
  name,
  type = 'text',
  register,
  value,
  onChange,
  error,
  placeholder,
  right,
  className,
  inputClassName,
  labelClassName,
  errorClassName,
  rightClassName,
}) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className={labelClassName}>
          {label}
        </label>
      )}

      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={inputClassName}
        {...register}
        value={value}
        onChange={onChange}
      />

      {right && <div className={rightClassName}>{right}</div>}
      {error && <p className={errorClassName}>{error}</p>}
    </div>
  );
};


export default TextInput;
