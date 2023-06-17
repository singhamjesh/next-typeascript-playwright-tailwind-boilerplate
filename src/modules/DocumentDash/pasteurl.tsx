import React from 'react';
import FloatingInput from '@/components/form-elements/floating-input';
import Button from '@/components/button';
import SelectInput from '@/components/form-elements/select-input';

const UrlGenerator = ({
  textBoxOnchange,
  agentDdOnchange,
  agentFormSubmit,
  agents
}: any) => {
  const agentOption = agents.map((item: any) => {
    return {
      value: item,
      label: item.label,
      color: item.color
    };
  });
  return (
    <div className="flex mb-6 px-4 pt-6">
      <div className="flex-grow">
        <div className="relative z-0">
          <FloatingInput
            input={{
              onChange: textBoxOnchange
            }}
            label="Paste Url"
            className="w-full h-10 text-base text-gray-600 border-0 border-b border-gray-300"
          />
        </div>
      </div>
      <div className="ml-6 flex h-10">
        <SelectInput
          options={agentOption}
          className="w-40 h-10 rounded-md font-small text-sm border-gray-400 justify-between bg-white text-black"
          optionClass="hover:bg-gray-100 p-3"
          panelClass="text-sm bg-white border border-black"
          color="#111111"
          onChange={agentDdOnchange}
        />
        <Button
          type="submit"
          className="h-10 ml-3 mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={agentFormSubmit}
        >
          Queue
        </Button>
      </div>
    </div>
  );
};

export default UrlGenerator;
