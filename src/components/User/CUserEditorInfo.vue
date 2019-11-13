<template>
  <b-card
    class="shadow-sm m-2 p-0"
  >
    <b-form
      @submit.prevent="$emit('submit', user)"
    >
      <b-form-group
        :label="$t('email')"
        label-cols="2"
      >
        <b-form-input
          v-model="user.email"
          required
          type="email"
        />
      </b-form-group>

      <b-form-group
        :label="$t('name')"
        label-cols="2"
      >
        <b-form-input
          v-model="user.name"
          required
        />

        <!--
          include hidden input to enable
          trigger submit event w/ ENTER
        -->
        <input
          type="submit"
          class="d-none"
        >
      </b-form-group>

      <b-form-group
        :label="$t('handle')"
        label-cols="2"
        class="mb-0"
      >
        <b-form-input
          v-model="user.handle"
        />
      </b-form-group>
    </b-form>

    <template #header>
      <h3 class="m-0">
        {{ $t('title') }}
        <b-spinner
          v-if="processing"
          small
          class="float-right"
          type="grow"
        />
        <font-awesome-icon
          v-else-if="success"
          :icon="['fas', 'check']"
          class="text-success float-right"
        />
      </h3>
    </template>

    <template #footer>
      <b-button
        type="submit"
        variant="primary"
        :disabled="processing"
        @click.prevent="$emit('submit', user)"
      >
        {{ $t('submit') }}
      </b-button>

      <confirmation-toggle
        v-if="user && user.userID"
        class="ml-2"
        @confirmed="$emit('delete')"
      >
        {{ $t('delete') }}
      </confirmation-toggle>

      <confirmation-toggle
        v-if="user && user.userID"
        class="ml-2"
        cta-class="secondary"
        @confirmed="$emit('status')"
      >
        {{ getStatus }}
      </confirmation-toggle>
    </template>
  </b-card>
</template>

<script>
import ConfirmationToggle from 'corteza-webapp-admin/src/components/ConfirmationToggle'

export default {
  name: 'CUserEditorInfo',

  i18nOptions: {
    namespaces: [ 'users' ],
    keyPrefix: 'editor.info',
  },

  components: {
    ConfirmationToggle,
  },

  props: {
    user: {
      type: Object,
      required: true,
    },

    processing: {
      type: Boolean,
      value: false,
    },

    success: {
      type: Boolean,
      value: false,
    },
  },

  computed: {
    getStatus () {
      return this.user.suspendedAt ? this.$t('unsuspend') : this.$t('suspend')
    },
  },
}
</script>