import React, { FunctionComponent } from 'react';
import { Disclosure } from '@headlessui/react';
import { mergeCls } from '@/utils/helper';
import InlineSvg from '@/components/inline-svg';

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  options: Array<Option>;
  className?: string;
  panelClass?: string;
  optionClass?: string;
  color?: string;
  circleColor?: string;
  onChange?: (value: any) => void;
}

const Index: FunctionComponent<DropdownProps> = (props) => {
  const {
    label,
    options,
    onChange,
    className,
    panelClass,
    optionClass,
    color,
    circleColor
  } = props;

  return (
    <Disclosure
      as="div"
      // className="-mx-3"
    >
      {({ open }) => (
        <>
          <Disclosure.Button
            className={mergeCls(
              className,
              'flex w-full items-center justify-between text-base font-medium leading-7'
            )}
          >
            {circleColor && (
              <InlineSvg
                className={mergeCls(['text-center mr-3'])}
                src="/assets/svg/circle.svg"
                width={16}
                height={16}
                color={circleColor}
              />
            )}

            {label}
            <InlineSvg
              className={mergeCls([open ? 'rotate-180' : '', 'text-center'])}
              src="/assets/svg/arrow.svg"
              width={25}
              height={25}
              color={color}
            />
          </Disclosure.Button>
          <Disclosure.Panel
            className={mergeCls([panelClass, 'mt-2 space-y-2'])}
          >
            {options.map((item) => (
              <Disclosure.Button
                key={item.label}
                as="a"
                onClick={(item) => onChange && onChange(item)}
                className={mergeCls(
                  optionClass,
                  'block rounded-lg text-sm font-semibold leading-7'
                )}
              >
                {item.label}
              </Disclosure.Button>
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

Index.defaultProps = {
  color: '#ffffff',
  onChange: () => void 0,
  className: 'hover:bg-gray-50 rounded-lg py-2 pl-3 pr-3.5',
  panelClass: 'bg-gray-100',
  optionClass: 'hover:bg-gray-50 text-black py-2 pl-6 pr-3'
};

export default Index;
