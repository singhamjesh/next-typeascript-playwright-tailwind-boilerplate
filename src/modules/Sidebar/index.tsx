import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { formatDate } from '@/utils/helper';
import DatePicker from '@/components/datepicker';

const Sidebar = ({ getAgentData }: any) => {
  const onChangeHandler = (value: any) => {
    const date = formatDate(value, `YYYY-MM-DD`);
    getAgentData({ status: 'completed', generateDate: date });
  };

  return (
    <div className="w-64 border-r h-full flex flex-col">
      <DatePicker onChange={onChangeHandler} />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  email: state.auth.email,
  token: state.auth.token
});

export default connect(mapStateToProps)(withRouter(Sidebar));
