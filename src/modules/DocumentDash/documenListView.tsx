import React, { FunctionComponent } from 'react';
import { get } from 'lodash';
import AgentData from './agentData';

interface DocumentListViewProps {
  data?: any[];
  date: string;
  day: string;
}

const DocumentListView: FunctionComponent<DocumentListViewProps> = (props) => {
  const { date, data, day } = props;
  return (
    <div className="flex w-full px-6 pb-5">
      <div className="border-b border-gray-300 flex-grow">
        <div className="flex pb-5">
          <div className="w-[132px] ">
            <label
              className={`text-xs font-bold ${
                day === 'Today' ? 'text-black' : 'text-gray-600'
              }`}
            >
              {day}
            </label>
            <br />
            <label
              className={`text-xs font-bold ${
                day === 'Today' ? 'text-black' : 'text-gray-600'
              }`}
            >
              {date}
            </label>
          </div>
          <div className="flex flex-wrap pr-6 space-y-2.5 w-[calc(100%-132px)]">
            {data?.map((item, index) => (
              <AgentData
                key={index}
                circleColor={get(item, 'agent.color')}
                agentData={get(item, 'response.data.content', '')}
                svg="Options.svg"
                size={24}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentListView;
