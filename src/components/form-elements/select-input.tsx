import { FunctionComponent, useState, useEffect } from 'react';
import { mergeCls, truncateString } from '@/utils/helper';
import InlineSvg from '@/components/inline-svg';

interface Option {
  label: string;
  value: string;
  color: string;
}

interface SelectInputProps {
  options: Array<Option>;
  className?: string;
  panelClass?: string;
  optionClass?: string;
  color?: string;
  onChange?: (value: any) => void;
}

const SelectInput: FunctionComponent<SelectInputProps> = (props) => {
  const { options, onChange, className, panelClass, optionClass, color } =
    props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  useEffect(() => {
    if (options.length > 0) {
      setSelectedOption(options[0]);
    }
  }, [options]);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option.value);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        className={mergeCls(
          className,
          'z-10 border rounded-md p-3 text-left flex items-center'
        )}
        onClick={handleToggleDropdown}
      >
        <span className="items-center">
          {selectedOption && (
            <InlineSvg
              className={mergeCls(['text-center mr-1 inline-block'])}
              src="/assets/svg/circle.svg"
              width={16}
              height={16}
              color={selectedOption.color}
            />
          )}
          {selectedOption ? truncateString(selectedOption.label, 12) : ''}
        </span>
        <InlineSvg
          className={mergeCls([
            isOpen ? 'rotate-180' : '',
            'text-center inline-block ml-1'
          ])}
          src="/assets/svg/arrow.svg"
          width={18}
          height={18}
          color={color}
        />
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-full rounded-md shadow-lg z-20">
          <ul
            className={mergeCls(
              panelClass,
              'py-1 overflow-auto rounded-md shadow-xs max-h-60'
            )}
          >
            {options.map((option) => (
              <li
                key={option.value}
                className={mergeCls(
                  optionClass,
                  'cursor-default select-none relative flex items-center'
                )}
                onClick={() => handleOptionSelect(option)}
              >
                <InlineSvg
                  className={mergeCls(['text-center mr-1 inline-block'])}
                  src="/assets/svg/circle.svg"
                  width={16}
                  height={16}
                  color={option.color}
                />
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

SelectInput.defaultProps = {
  color: '#111111',
  onChange: () => void 0,
  className:
    'w-40 rounded-md font-medium text-sm border-gray-400 justify-between bg-white text-black',
  panelClass: 'text-sm bg-white',
  optionClass: 'hover:bg-gray-100 p-3'
};

export default SelectInput;
