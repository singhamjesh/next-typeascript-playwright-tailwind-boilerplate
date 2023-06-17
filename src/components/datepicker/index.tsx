import { FunctionComponent, useState, useEffect } from 'react';
import Datetime from 'react-datetime';
import { mergeCls } from '@/utils/helper';

/* Button interface */
interface ButtonPros {
  onChange?: (data: any) => void;
}

/**
 * Date picker component
 * @param {*} props
 * @returns
 */
const Index: FunctionComponent<ButtonPros> = (props) => {
  const { onChange } = props;
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (onChange) {
      onChange(selectedDate);
    }
  }, [selectedDate, onChange]);

  const renderDay = (props: any, currentDate: any, selectedDate: any) => {
    const isSame = currentDate.isSame(selectedDate, 'day');

    return (
      <td
        {...props}
        onClick={() => setSelectedDate(currentDate.toDate())}
        className={mergeCls([
          'text-sm p-[5px] rounded-full hover:bg-primary-900 hover:text-white',
          isSame ? 'bg-primary-900 text-white' : ''
        ])}
      >
        {currentDate.date()}
      </td>
    );
  };

  return (
    <div className="w-full">
      <Datetime
        className="w-full text-sm"
        input={false}
        timeFormat={false}
        renderDay={renderDay}
        value={selectedDate}
      />
    </div>
  );
};

Index.defaultProps = {
  onChange: () => void 0
};

export default Index;
