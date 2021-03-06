<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="$t('title')"
    />

    <c-system-editor-auth
      :settings="getAuth"
      :processing="auth.processing"
      :success="auth.success"
      :can-manage="canManage"
      @submit="onAuthSubmit"
    />

    <c-system-editor-external
      class="mt-3"
      :external="settings"
      :processing="external.processing"
      :success="external.success"
      :can-manage="canManage"
      @submit="onExternalSubmit"
    />
  </b-container>
</template>
<script>
import editorHelpers from 'corteza-webapp-admin/src/mixins/editorHelpers'
import CSystemEditorAuth from 'corteza-webapp-admin/src/components/Settings/System/CSystemEditorAuth'
import CSystemEditorExternal from 'corteza-webapp-admin/src/components/Settings/System/CSystemEditorExternal'

export default {
  i18nOptions: {
    namespaces: [ 'system.settings' ],
    keyPrefix: 'editor',
  },

  components: {
    CSystemEditorAuth,
    CSystemEditorExternal,
  },

  mixins: [
    editorHelpers,
  ],

  data () {
    return {
      settings: [],

      canManage: false,

      auth: {
        processing: false,
        success: false,
      },

      external: {
        processing: false,
        success: false,
      },
    }
  },

  computed: {
    getAuth () {
      if (this.settings.length > 0) {
        return this.settings.reduce((map, obj) => {
          const { name, value } = obj
          const split = name.split('.')
          if (split[0] === 'auth' && split[1] !== 'external') {
            map[name] = value
          }
          return map
        }, {})
      }
      return {}
    },
  },

  created () {
    this.fetchSettings()
  },

  methods: {
    fetchSettings () {
      this.incLoader()

      this.$SystemAPI.settingsList()
        .then(settings => {
          this.settings = settings

          this.$SystemAPI.permissionsEffective()
            .then(rules => {
              this.canManage = rules.find(({ resource, operation, allow }) => resource === 'system' && operation === 'settings.manage').allow
            })
        })
        .catch(err => {
          this.stdReject(err)
          this.$router.push({ name: 'dashboard' })
        })
        .finally(() => {
          this.decLoader()
        })
    },

    onAuthSubmit (auth) {
      this.auth.processing = true

      const values = Object.entries(auth).map(([name, value]) => {
        return { name, value }
      })

      this.$SystemAPI.settingsUpdate({ values })
        .then(() => {
          this.animateSuccess('auth')
        })
        .catch(this.stdReject)
        .finally(() => {
          this.auth.processing = false
        })
    },

    onExternalSubmit (external) {
      this.external.processing = true

      this.$SystemAPI.settingsUpdate({ values: external })
        .then(() => {
          this.animateSuccess('external')
        })
        .catch(this.stdReject)
        .finally(() => {
          this.external.processing = false
        })
    },
  },
}
</script>
