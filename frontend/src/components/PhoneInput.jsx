import React from 'react';
import { usePhoneValidation } from '../hooks/usePhoneValidation';
import { getCountryList } from '../utils/phoneValidation';

interface PhoneInputProps {
  phone: string;
  country: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  phone,
  country,
  onChange,
  className = ''
}) => {
  const { isValid, formattedNumber } = usePhoneValidation({ phone, country });
  const countries = getCountryList();

  return (
    <div className="relative">
      <input
        type="tel"
        name="phone"
        value={formattedNumber}
        onChange={onChange}
        className={`${className} ${!isValid && phone ? 'border-red-500' : ''}`}
        placeholder="Phone Number"
      />
      {!isValid && phone && (
        <p className="text-red-500 text-sm mt-1">Please enter a valid phone number</p>
      )}
      <datalist id="countries">
        {countries.map((c) => (
          <option key={c.code} value={c.name}>
            {c.name} ({c.dialCode})
          </option>
        ))}
      </datalist>
    </div>
  );
};