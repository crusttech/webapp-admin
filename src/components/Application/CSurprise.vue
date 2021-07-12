<template>
  <div class="w-100 mt-3">
    <b-container class="mw-100">
      <b-row class="mb-5">
        <b-col cols="3">
          <aside class="h-100">
            <p
              class="font-weight-bold ml-3"
            >
              Catalogue
            </p>
            <ul
              v-for="(value, key, index) in components"
              :key="index"
              style="list-style: none"
            >
              <li
                v-if="index !== Object.keys(components).length - 1"
                class="ml-list mt-0"
              >
                {{ value.name }}
              </li>
            </ul>
          </aside>
        </b-col>
        <b-col cols="8">
          <c-application-editor-info
            :application="application"
            :processing="info.processing"
            :success="info.success"
            :can-create="canCreate"
            @submit="onInfoSubmit"
            @delete="onDelete"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h3>Preset Controls</h3>
          <ul
            v-for="(value, key) in [application, info]"
            :key="key"
            style="list-style-type: none"
            class="m-ul"
          >
            <li
              v-for="(v, k) in value"
              :key="k"
            >
              <label>{{ k }}:</label>
              <span
                class="text-secondary"
              >
                {{ v }}
              </span>
            </li>
          </ul>
          <label>canCreate:</label>
          <span class="text-secondary"> {{ canCreate }}</span>
        </b-col>
        <b-col>
          <h3>Controls</h3>
          <ul
            v-for="(value, key) in [application, info]"
            :key="key"
            style="list-style-type: none"
            class="m-ul"
          >
            <li
              v-for="(v, k) in value"
              :key="k"
            >
              <label>{{ k }}:</label>
              <span
                class="text-secondary"
              >
                {{ v }}
              </span>
            </li>
          </ul>
          <label>canCreate:</label>
          <span class="text-secondary"> {{ canCreate }}</span>
        </b-col>
      </b-row>
    </b-container>
  </div>
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
      components: this.$options.components,
    }
  },

  computed: {
    app: {
      get () {
        return [this.application]
      },

      set (a) {
        this.$emit('update:application', a)
      },
    },
  },

  created () {
    console.log(this.data)
  },

  methods: {
    onInfoSubmit (application) {
      console.log('triggerred onInfoSubmit')
      console.log(application)
    },
    onDelete () {
      console.log('triggerred onDelete')
    },
    editApp (a) {
      console.log(a)
      // this.$set(r, 'dirty', true)
    },
  },
}
</script>

<style scoped>
.ml-list {
  margin-left: -10px;
}

.m-ul {
  margin-left: -40px;
  margin-bottom: -3px;
}
</style>
