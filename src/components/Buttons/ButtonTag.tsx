import clsx from "clsx";
import React from "react";
import iconCross from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-cross.svg";

type ButtonTagProps = {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  size?: "small" | "large";
  selected?: boolean;
  removable?: boolean;
  dataCy?: string;
};

const ButtonTag = React.forwardRef<HTMLButtonElement, ButtonTagProps>(
  ({ onClick, selected, children, size, removable = false, dataCy }, ref) => {
    const className = clsx(
      "tag",
      selected && "tag--fill",
      size && `tag--${size}`,
      "cursor-pointer"
    );

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={selected}
        className={className}
        onClick={onClick}
        data-cy={dataCy}
      >
        {children}
        {removable && (
          <img className="tag-icon" src={iconCross} alt="close icon" />
        )}
      </button>
    );
  }
);

export default ButtonTag;
