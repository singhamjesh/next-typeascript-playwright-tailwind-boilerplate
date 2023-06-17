import React, { FunctionComponent } from 'react';

interface TooltipProps {
  className?: string;
  title?: string;
  children: any;
}

const Tooltip: FunctionComponent<TooltipProps> = (props) => {
  const { title, children, className } = props;
  return (
    <div className="relative ">
      <button
        type="button"
        className={className}
        data-te-toggle="tooltip"
        data-te-html="true"
        data-te-ripple-init
        data-te-ripple-color="light"
        title={title}
      >
        {children}
      </button>
    </div>
  );
};

Tooltip.defaultProps = {
  title: 'lorem Ipsum',
  className: ''
};

export default Tooltip;
