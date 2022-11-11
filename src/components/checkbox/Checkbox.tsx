import React, { FC } from "react";
import IconCheckbox from "../icon-checkbox/icon-checkbox";

interface CheckBoxProps {
  id: string;
  label: string;
  hideLabel?: boolean;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  onChecked?: (value: boolean) => void;
  ariaLabel?: string;
}

const CheckBox: FC<CheckBoxProps> = ({
  id,
  label,
  hideLabel,
  className,
  selected,
  onChecked,
  disabled,
  ariaLabel
}) => {
  const checkboxChecked = (checked: boolean) => {
    if (onChecked) {
      onChecked(checked);
    }
  };

  return (
    <div className={`checkbox ${className || ""}`}>
      <input
        id={id}
        data-cy={id}
        className="checkbox__input"
        onChange={(e) => {
          checkboxChecked(e.target.checked);
        }}
        checked={selected}
        type="checkbox"
        aria-label={ariaLabel}
        disabled={disabled}
      />
      <label className="checkbox__label" htmlFor={id}>
        <span className="checkbox__icon">
          <IconCheckbox />
        </span>
        <span
          className={`checkbox__text text-small-caption color-secondary-gray ${
            hideLabel ? "checkbox__text--hide-visually" : ""
          }`}
        >
          {label}
        </span>
      </label>
    </div>
  );
};

export default CheckBox;
