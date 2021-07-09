<template>
  <c-application-editor-info
    class="my-5 mx-auto h-50 w-50"
    :application="application"
    :processing="info.processing"
    :success="info.success"
    :can-create="canCreate"
    @submit="onInfoSubmit"
    @delete="onDelete"
  />
</template>

<script>
import CApplicationEditorInfo from './CApplicationEditorInfo.vue'

const appData = {
  applicationID: '234900176853008386',
  canDeleteApplication: true,
  canGrant: true,
  canUpdateApplication: true,
  createdAt: '2021-06-09T12:03:36Z',
  enabled: true,
  name: 'Low Code',
  ownerID: 0,
  unify: {
    config: '',
    icon: '/applications/low-code-platform.png',
    iconID: '0',
    listed: true,
    logo: '/applications/low-code-platform.png',
    logoID: '0',
    name: 'Low Code',
    pinned: false,
    url: '/compose',
  },
  weight: 1,
}

export default {
  name: 'CSurprise',
  components: {
    CApplicationEditorInfo,
  },

  data () {
    return {
      application: this.$route.params.application || appData,
      info: this.$route.params.info || { processing: false, success: false },
      canCreate: this.$route.params.canCreate || false,
    }
  },

  methods: {
    onInfoSubmit (application) {
      console.log('triggerred onInfoSubmit')
      console.log(application)
    },
    onDelete () {
      console.log('triggerred onDelete')
    },
  },
}
</script>
