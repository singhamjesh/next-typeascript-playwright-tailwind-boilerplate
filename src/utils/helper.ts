/* eslint-disable no-useless-escape */
import { get, includes, isEmpty } from 'lodash';
import moment from 'moment';
import classNames from 'classnames';
import blockDomains from './block-domains.json';

/**
 * classNames class merge
 * @param classes - class names
 * @returns {string} - class names joined by space
 */
export const mergeCls = (...classes: any): string => {
  return classNames(...classes);
};

/**
 * This method is calculate user used trails
 * @param {any} user - Logged in User
 * @returns {number} - user remaining trails
 */
export const getRemainingTrails = (user: any) => {
  if (isEmpty(user)) {
    return -1;
  }

  const status = get(user, 'userMeta.paymentInfo.status', false);
  const subscriptionEnd = get(
    user,
    'userMeta.paymentInfo.subscriptionEnd',
    '2001-01-01T09:19:16.000Z'
  );

  if (status === 'active' && moment().isBefore(subscriptionEnd)) {
    return 3;
  }

  return (
    parseInt(get(process, 'env.MaxTrailsAllow', '3')) -
    parseInt(get(user, 'profile.totalTrailUsed', 0))
  );
};

/**
 * Short histories and group history using date
 * @param {any} histories - User histories
 * @returns {array} groupedData
 */
export const sortHistoriesGroupByDate = (histories: any = []) => {
  const groupedData: any = {};
  histories.sort(
    (b: any, a: any) => new Date(a.date).valueOf() - new Date(b.date).valueOf()
  );
  histories.forEach((item: any) => {
    const date = item.date.split('T')[0];
    if (!groupedData[date]) {
      groupedData[date] = [item];
    } else {
      groupedData[date].push(item);
    }
  });

  return isEmpty(groupedData) ? [] : groupedData;
};

/**
 * Formate date like Today, Yesterday using date value
 * @param {any} date - date string
 * @returns {any} formatted date string
 */
export const getFormattedDate = (date: any) => {
  const REFERENCE = moment();
  const TODAY = REFERENCE.clone().startOf('day');
  const YESTERDAY = REFERENCE.clone().subtract(1, 'days').startOf('day');
  if (moment(date).isSame(TODAY, 'd')) {
    return 'Today';
  }
  if (moment(date).isSame(YESTERDAY, 'd')) {
    return 'Yesterday';
  }
  return moment(date).format('DD MMM YYYY');
};

/**
 * Formate date to particular format
 * @param {any} dateStr - date string
 * @param {any} format - format string
 * @returns {any} formatted date string
 */
export const formatDate = (dateStr: any, format: string) => {
  const date = moment(dateStr);
  return date.format(format);
};
/**
 * Calculate day like Today, Yesterday, Tomorrow using date value
 * @param {any} dateStr - date string
 * @returns {any} formatted date string into day
 */
export const calculateDay = (dateStr: any) => {
  const date = moment(dateStr);
  const today = moment();
  const yesterday = moment().subtract(1, 'day');
  const tomorrow = moment().add(1, 'day');

  if (date.isSame(today, 'day')) {
    return 'Today';
  } else if (date.isSame(yesterday, 'day')) {
    return 'Yesterday';
  } else if (date.isSame(tomorrow, 'day')) {
    return 'Tomorrow';
  } else {
    return date.format('dddd');
  }
};
/**
 * Formate time like Now, 10:30 using date value
 * @param {any} date - date string
 * @returns {any} formatted time string
 */
export const getFormattedTime = (date: any) => {
  const REFERENCE = moment();
  const TODAY = REFERENCE.clone().startOf('hour');
  if (moment(date).isSame(TODAY, 'h')) {
    return 'Now';
  }
  return moment(date).format('HH:mm');
};

/**
 * Check whitelist domains
 * @param {string} domain - email domain
 * @returns {boolean} true/false
 */
export const isWhiteListDomain = (domain: string) => {
  if (includes(blockDomains, domain)) {
    return false;
  }
  return true;
};

/**
 * Check email is valid
 * @param {string} email - email
 * @returns {boolean} true/false
 */
export const isValidEmail = (email: string) => {
  if (!email) return false;

  const emailParts = email.split('@');

  if (emailParts.length !== 2) return false;

  const account = emailParts[0];
  const address = emailParts[1];

  if (account.length > 64) return false;
  else if (address.length > 255) return false;

  const domainParts = address.split('.');

  if (
    domainParts.some(function (part) {
      return part.length > 63;
    })
  ) {
    return false;
  }

  // const noOfPlush = email.split('+');
  // if (process.env.NODE_ENV !== 'development' && noOfPlush.length > 0)
  //   return false;

  // if (process.env.NODE_ENV !== 'development' && !isWhiteListDomain(address))
  //   return false;

  const tester =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  return tester.test(email);
};

/**
 * Validate web url
 * @param {string} url - web url
 * @returns {boolean} true/false
 */
export const isValidUrl = (url: string) => {
  const re = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
  return re.test(url);
};

/**
 * This method is responsible to truncate string using max length
 *
 * @param {*} str original string
 * @param {*} maxLength string maximum length
 * @returns {*} str new string
 */
export const truncateString = (str: string, maxLength: number) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength - 3) + '...';
  }
  return str;
};
