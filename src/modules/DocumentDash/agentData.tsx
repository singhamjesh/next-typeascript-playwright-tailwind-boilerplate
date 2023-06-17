import React, { FunctionComponent } from 'react';
import { mergeCls } from '@/utils/helper';
import InlineSvg from '@/components/inline-svg';

interface AgentDataProps {
  circleColor: string;
  agentData: string;
  svg: string;
  size: number;
  iconOnclick?: () => void;
}

const AgentData: FunctionComponent<AgentDataProps> = ({
  iconOnclick,
  circleColor,
  agentData,
  svg,
  size
}) => {
  return (
    <div className="flex w-full">
      <div className="w-[25px] ">
        <InlineSvg
          className={mergeCls(['text-center'])}
          src="/assets/svg/circle.svg"
          width={16}
          height={16}
          color={circleColor}
        />
      </div>
      <div className="w-[calc(100%-50px)]">
        <label className="text-xs font-medium text-black line-clamp-4">
          {agentData}
        </label>
      </div>
      <div className="w-[25px] flex justify-end">
        <InlineSvg
          className={mergeCls(['text-center cursor-pointer'])}
          src={`/assets/svg/${svg}`}
          width={size}
          height={size}
          onClick={iconOnclick}
        />
      </div>
    </div>
  );
};

export default AgentData;
