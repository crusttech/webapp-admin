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

export default {
  name: 'CSurprise',
  components: {
    CApplicationEditorInfo,
  },

  data () {
    return {
      passedData: this.$route.params,
      application: this.$route.params.application,
      info: this.$route.params.info,
      canCreate: this.$route.params.canCreate,
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
