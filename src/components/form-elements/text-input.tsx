import React, { FunctionComponent } from 'react';
import { mergeCls } from '@/utils/helper';

const TextInput: FunctionComponent<any> = (props) => {
  const {
    input,
    disabled,
    className,
    leftIconClass,
    rightIconClass,
    rightIcon,
    leftIcon,
    placeholder,
    label
  } = props;

  return (
    <>
      {label && (
        <label
          className="mb-3 mt-px inline-block pl-[0.15rem] text-base font-bold"
          htmlFor={input}
        >
          {label}
        </label>
      )}

      <div className="relative flex w-full flex-nowrap items-stretch">
        {leftIcon && (
          <span
            className={mergeCls([
              leftIconClass,
              'flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200'
            ])}
            id="addon-wrapping"
          >
            {leftIcon}
          </span>
        )}
        <input
          {...input}
          type="text"
          placeholder={placeholder}
          disabled={disabled}
          className={mergeCls([
            className,
            disabled && 'cursor-not-allowed',
            'bg-light-900 p-2 peer block min-h-[auto] w-full leading-[1.6] outline-none border-dark-900 border-2 rounded-lg'
          ])}
          aria-label="Username"
          aria-describedby="addon-wrapping"
        />
        {rightIcon && (
          <span
            className={mergeCls([
              rightIconClass,
              'flex items-center whitespace-nowrap rounded-r border border-l-0 border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200'
            ])}
            id="addon-wrapping"
          >
            {rightIcon}
          </span>
        )}
      </div>
    </>
  );
};

TextInput.defaultProps = {
  label: '',
  className: '',
  leftIconClass: '',
  rightIconClass: '',
  rightIcon: null,
  leftIcon: null,
  placeholder: 'Enter text',
  disabled: false
};

export default TextInput;
