import React, { FunctionComponent } from 'react';
import { get } from 'lodash';
import AgentData from './agentData';

interface DocumentCardViewProps {
  data: any[];
  date: string;
  day: string;
}

const DocumentCardView: FunctionComponent<DocumentCardViewProps> = (props) => {
  const { date, data, day } = props;
  return (
    <div className="flex w-full px-6 pb-5">
      <div className="border-b border-gray-300 flex-grow">
        <div className="flex pb-5">
          <div className="w-[92px]">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pr-6 w-[calc(100%-92px)]">
            {data.map((item, index) => (
              <div key={index} className="col-span-1">
                <div className="bg-white border border-gray-300 rounded-xl h-[88px] p-3">
                  <AgentData
                    circleColor="#5379FF"
                    agentData={get(item, 'response.data.content', '')}
                    svg="Options.svg"
                    size={24}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentCardView;
