import React, { FunctionComponent } from 'react';
import { mergeCls } from '@/utils/helper';

const Textarea: FunctionComponent<any> = (props) => {
  const { id, input, row, className, placeholder, label } = props;

  return (
    <div className="w-full text-left">
      {label && <h5 className="mb-2 mt-px">{label}</h5>}
      <textarea
        {...input}
        className={mergeCls([
          className,
          'peer block min-h-[auto] w-full leading-[1.6] outline-none border-dark-900 border-2 rounded-lg'
        ])}
        id={id}
        rows={row}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};

Textarea.defaultProps = {
  id: 'default-textarea',
  row: 3,
  input: {
    name: 'default-textarea'
  },
  className: 'bg-light-900 p-2',
  placeholder: 'Enter text'
};

export default Textarea;
