import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { mergeCls } from '@/utils/helper';
import InlineSvg from '@/components/inline-svg';
import { getAgentQueue, removeAgent } from '@/reducers/agent';
import AgentData from './agentData';

function Index({ agentQueue, getAgentQueue, removeAgent }: any) {
  useEffect(() => {
    getAgentQueue();
  }, [getAgentQueue]);

  const removeQueueHandler = (item: any) => {
    removeAgent({ _id: item._id });
  };

  return (
    <div className="flex w-full px-6">
      <div className="w-[120px]">
        <label className="text-sm font-bold text-black">Queue</label>
      </div>
      <div className="flex flex-wrap space-y-2.5 w-[calc(100%-120px)]">
        {agentQueue.map((item: any, index: number) => (
          <div key={String(index)} className="flex w-full">
            <div
              key={index}
              className="w-[120px] text-center flex items-center"
            >
              <InlineSvg
                className={mergeCls([
                  'text-center mr-3',
                  item.status === 'inprogress' ? 'animate-spin' : ''
                ])}
                src={`/assets/svg/${
                  item.status === 'inprogress'
                    ? 'loader.svg'
                    : 'warning-circle.svg'
                }`}
                width={16}
                height={16}
                color={item.status === 'inprogress' ? '#111111' : '#dc2626'}
              />
              <label className="text-xs font-medium text-black capitalize">
                {item.status}
              </label>
            </div>
            <div className="w-[calc(100%-120px)]">
              <AgentData
                circleColor={get(item, 'agent.color')}
                agentData={item.url}
                svg="close.svg"
                size={12}
                iconOnclick={() => removeQueueHandler(item)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  agentQueue: state.agent.agentQueue
});

const mapDispatchToProps = (dispatch: any) => ({
  getAgentQueue: () => dispatch(getAgentQueue()),
  removeAgent: (payload: any) => dispatch(removeAgent(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
