export default {
  navItem: {
    label: 'Sessions',
  },

  list: {
    title: 'Sessions',
    loading: 'Loading sessions',
    numFound: `{{count}} session found`,
    numFound_plural: `{{count}} sessions found`,

    filterForm: {
      excluded: {
        label: 'Without',
      },

      inclusive: {
        label: 'Including',
      },

      exclusive: {
        label: 'Only',
      },

      inProgress: {
        label: 'completed sessions',
      },

      all: {
        label: 'All',
      },

      started: {
        label: 'Started',
      },

      prompted: {
        label: 'Prompted',
      },

      suspended: {
        label: 'Suspended',
      },

      failed: {
        label: 'Failed',
      },

      completed: {
        label: 'Completed',
      },

      sessions: {
        label: 'sessions',
      },
    },

    columns: {
      sessionID: 'SessionID',
      workflowID: 'WorkflowID',
      status: 'Status',
      eventType: 'Event type',
      createdAt: 'Created At',
      actions: '',
    },
  },

  editor: {
    title: 'Session',

    info: {
      title: 'Basic information',

      id: 'ID',
      workflowID: 'WorkflowID',
      resourceType: 'Resource type',
      eventType: 'Event type',

      status: 'Status',
      error: 'Error',

      delete: 'Delete',
      deletedAt: 'Deleted at',

      completedAt: 'Completed at',

      createdAt: 'Created at',
      createdByUserID: 'Created by - ID',
      createdByUserName: 'Created by - Name',
    },
  },
}
