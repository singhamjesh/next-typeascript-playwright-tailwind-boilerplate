import { FunctionComponent } from 'react';
import { mergeCls } from '@/utils/helper';

/**
 * Handle radio button
 */
const RadioButton: FunctionComponent<any> = (props) => {
  const { input, id, label, className, labelClass, onChange, checked } = props;
  return (
    <div className="inline-block min-h-[1.5rem]">
      <input
        {...input}
        className={mergeCls([
          className,
          `relative appearance-none rounded-full border-solid before:pointer-events-none before:absolute before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:rounded-full after:content-[''] checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:rounded-full checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]`
        ])}
        id={id}
        type="radio"
        onChange={onChange}
        checked={checked}
      />
      {label && (
        <label
          className={mergeCls([
            labelClass,
            'pl-[0.15rem] hover:cursor-pointer'
          ])}
          htmlFor={id}
        >
          {label}
        </label>
      )}
    </div>
  );
};

RadioButton.defaultProps = {
  className:
    'float-left h-5 w-5 mt-0.5 ml-4 mr-1 border-dark-900 border-2 before:h-4 before:w-4 after:h-4 after:w-4 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:border-dark-900 checked:after:border-dark-900 checked:after:bg-primary-900 checked:focus:border-dark-900',
  labelClass:
    'inline-block mt-px mb-2 dark:border-dark-900 dark:checked:border-dark-900 dark:checked:after:border-dark-900 dark:checked:after:bg-primary-900 dark:checked:focus:border-dark-900'
};

export default RadioButton;
