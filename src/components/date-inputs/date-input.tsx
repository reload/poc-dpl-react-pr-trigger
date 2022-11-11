import React, { FC } from "react";

interface DateInputProps {
  label: string;
  minDateInput?: string;
  id: string;
  value: string;
  onChange: (date: string) => void;
}

const DateInput: FC<DateInputProps> = ({
  label,
  id,
  value,
  onChange,
  minDateInput
}) => {
  // cannot set from/to to yesterday or yesteryear
  const minDate = minDateInput || new Date().toISOString().split("T")[0];

  return (
    <div className="datepicker">
      <label htmlFor={id} className="text-body-medium-regular">
        {label}
      </label>
      <input
        type="date"
        onChange={({ target }) => onChange(target.value)}
        name={id}
        value={value}
        id={id}
        className="datepicker-input"
        min={minDate}
      />
    </div>
  );
};

export default DateInput;
