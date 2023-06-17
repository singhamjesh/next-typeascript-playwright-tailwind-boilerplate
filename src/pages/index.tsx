import React, { useEffect, useState } from 'react';
import { get, isEmpty } from 'lodash';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { toast } from 'react-toastify';
import { mergeCls } from '@/utils/helper';
import { withBaseLayout } from '@/modules/Layouts/base-layout';
import { calculateDay, formatDate, isValidUrl } from '@/utils/helper';
import Header from '@/modules/Header';
import Sidebar from '@/modules/Sidebar';
import PasteUrl from '@/modules/DocumentDash/pasteurl';
import Queue from '@/modules/DocumentDash/queue';
import InlineSvg from '@/components/inline-svg';
import DocumentListView from '@/modules/DocumentDash/documenListView';
import DocumentCardView from '@/modules/DocumentDash/documentCardView';
import { callAgent, getAgentData, getAgents } from '@/reducers/agent';

function Index(props: any) {
  const { getAgentData, callAgent, agentData, getAgents, agents } = props;
  const [queueTextBoxValue, setTextBoxOnChangeValue] = useState('');
  const [agent, setAgent] = useState(agents[0]);
  const [viewMode, setViewMode] = useState('list');

  useEffect(() => {
    getAgentData({ status: 'completed' });
    getAgents();
  }, [getAgentData, getAgents]);

  const handleListViewClick = () => {
    setViewMode('list');
  };

  const handleCardViewClick = () => {
    setViewMode('card');
  };

  const queueTextBoxHandler = (ele: any) => {
    const value = get(ele, 'target.value', '');
    setTextBoxOnChangeValue(value);
  };

  const agentSelectHandler = (value: any) => {
    setAgent(value);
  };

  const agentCallHandler = () => {
    if (!isValidUrl(queueTextBoxValue)) {
      toast.error('Invalid url. Please enter a valid web URL!');
      return false;
    }
    if (isEmpty(agent)) {
      toast.error('You are not selected any agent. Please select agent!');
      return false;
    }

    /* Call API */
    callAgent({ url: queueTextBoxValue, agent });
  };

  return (
    <main className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 max-w-[1512px] m-auto">
        <Sidebar getAgentData={getAgentData} />
        <div className="flex-1 overflow-y-auto w-[calc(100vw-264px)]">
          <PasteUrl
            textBoxOnchange={queueTextBoxHandler}
            agentDdOnchange={agentSelectHandler}
            agentFormSubmit={agentCallHandler}
            agents={agents}
          />
          <Queue />
          <hr className="my-3 border-gray-300" />

          <div className="flex justify-between items-center px-6 pb-8">
            <h1 className="text-xl font-bold ">Your Documents</h1>
            <div className="flex space-x-5">
              <InlineSvg
                className={mergeCls(['cursor-pointer'])}
                src={`/assets/svg/List.svg`}
                width={22}
                height={22}
                color={viewMode === 'list' ? '#111111' : '#A8A29E'}
                onClick={handleListViewClick}
              />
              <InlineSvg
                className={mergeCls(['cursor-pointer'])}
                src={`/assets/svg/Cards.svg`}
                width={22}
                height={22}
                color={viewMode === 'card' ? '#111111' : '#A8A29E'}
                onClick={handleCardViewClick}
              />
            </div>
          </div>

          {agentData.map((item: any, index: any) => {
            const formattedDate = formatDate(item.date, `Do MMM`);
            const day = calculateDay(item.date);
            if (viewMode === 'list') {
              return (
                <DocumentListView
                  key={index}
                  date={formattedDate}
                  day={day}
                  data={item.rows}
                />
              );
            } else {
              return (
                <DocumentCardView
                  key={item.date}
                  date={formattedDate}
                  day={day}
                  data={item.rows}
                />
              );
            }
          })}
        </div>
      </div>
    </main>
  );
}

const mapStateToProps = (state: any) => ({
  agentData: state.agent.agentData,
  agents: state.agent.agents
});

const mapDispatchToProps = (dispatch: any) => ({
  callAgent: (payload: any) => dispatch(callAgent(payload)),
  getAgentData: (payload: any) => dispatch(getAgentData(payload)),
  getAgents: () => dispatch(getAgents())
});

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale))
    }
  };
}

export default withBaseLayout(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(Index)),
  {
    title: 'TITLE',
    description: 'DESCRIPTION'
  }
);
