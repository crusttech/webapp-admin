const emptyForm = {
  application: {
    applicationID: '0',
    createdAt: '0000-00-00T00:00:00Z',
    enabled: false,
    name: '',
  },
  info: {
    processing: false,
    success: false,
  },
  otherProperties: {
    canCreate: false,
  },
}

const fullForm = {
  application: {
    applicationID: '234900176853008386',
    createdAt: '2021-06-09T12:03:36Z',
    enabled: true,
    name: 'Low Code',
  },
  info: {
    processing: false,
    success: false,
  },
  otherProperties: {
    canCreate: true,
  },
}

const appData = {
  // can hide delete button
  application: {
    // can hide delete button
    applicationID: '234900176853008386',
    createdAt: '2021-06-09T12:03:36Z',
    enabled: false,
    name: 'Low Code',
  },
  info: {
    processing: false,
    success: false,
  },
  otherProperties: {
    // for submit button
    canCreate: true,
  },
}

export default {
  appData,
  emptyForm,
  fullForm,
}
