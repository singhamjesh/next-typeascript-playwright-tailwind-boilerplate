import React, { FunctionComponent } from 'react';
import { mergeCls } from '@/utils/helper';

const FloatingInput: FunctionComponent<any> = (props) => {
  const { input, className, label } = props;

  return (
    <>
      <input
        {...input}
        type="text"
        className={mergeCls([
          className,
          'block py-2.5 pl-0 bg-transparent appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
        ])}
        placeholder=" "
      />
      {label && (
        <label
          htmlFor="floating_standard"
          className="absolute text-base text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          {label}
        </label>
      )}
    </>
  );
};

FloatingInput.defaultProps = {
  label: '',
  className: ''
};

export default FloatingInput;
