<template>
  <div class="w-100 mt-3">
    <b-container class="mw-100">
      <b-row class="mb-5">
        <b-col cols="3">
          <aside class="h-100">
            <h4
              class="font-weight-bold"
            >
              Component Catalogue
            </h4>
            <ul
              v-for="(value, key, index) in components"
              :key="index"
              style="list-style: none"
            >
              <li
                v-if="index !== Object.keys(components).length - 1"
                class="ml-list h5 mt-0"
              >
                - {{ value.name }}
              </li>
            </ul>
          </aside>
        </b-col>
        <b-col
          v-if="!isEmptyFormPopulated && !isFullFormPopulated"
          cols="8"
        >
          <c-application-editor-info
            :application="appData.application"
            :processing="appData.info.processing"
            :success="appData.info.success"
            :can-create="appData.otherProperties.canCreate"
            @submit="onInfoSubmit"
            @delete="onDelete"
          />
        </b-col>
        <b-col
          v-if="isEmptyFormPopulated && !isFullFormPopulated"
          cols="8"
        >
          <c-application-editor-info
            :application="emptyForm.application"
            :processing="emptyForm.info.processing"
            :success="emptyForm.info.success"
            :can-create="emptyForm.otherProperties.canCreate"
            @submit="onInfoSubmit"
            @delete="onDelete"
          />
        </b-col>
        <b-col
          v-if="isFullFormPopulated && !isEmptyFormPopulated"
          cols="8"
        >
          <c-application-editor-info
            :application="fullForm.application"
            :processing="fullForm.info.processing"
            :success="fullForm.info.success"
            :can-create="fullForm.otherProperties.canCreate"
            @submit="onInfoSubmit"
            @delete="onDelete"
          />
        </b-col>
      </b-row>
      <b-row
        class="mw-50"
      >
        <b-col
          cols="3"
        />
        <b-col>
          <h3>Pre-set Controls</h3>
          <h5
            class="forms mb-1"
            @click="populateEmptyForm"
          >
            - Generate Empty Form
          </h5>
          <div
            v-if="isEmptyFormPopulated"
            class="form-container pl-3 pt-2"
          >
            <ul
              v-for="(value, key) in emptyForm"
              :key="key"
              class="m-ul h5"
            >
              <h5>{{ key }}: {</h5>
              <li
                v-for="(v, k, i) in value"
                :key="i"
              >
                <div
                  v-if="!isPropertyClicked"
                >
                  <label
                    class="pl-2"
                  >
                    {{ k }}:
                  </label>
                  <span
                    class="text-secondary"
                    @click="editProperty"
                  >
                    {{ v }}
                  </span>
                </div>
                <div
                  v-else
                >
                  <div
                    v-if="typeof(v) === 'boolean'"
                  >
                    <label
                      class="h5"
                    >
                      {{ k }}:
                    </label>
                    <button
                      class="btn btn-light text-white ml-2 mb-2"
                      style="background-color: rgb(175, 175, 175)"
                      :value="v"
                      @click="update(value, k, v)"
                    >
                      {{ v }}
                    </button>
                  </div>
                  <div
                    v-else
                  >
                    <label
                      class="h5"
                    >
                      {{ k }}:
                    </label>
                    <input
                      class="ml-2 pl-1"
                      :value="v"
                      @input="update(value, k, $event.target.value)"
                    >
                  </div>
                </div>
              </li>
              <h5>}</h5>
            </ul>
          </div>
          <h5
            class="forms mb-1"
            @click="populateFullForm"
          >
            - Generate Full Form
          </h5>
          <div
            v-if="isFullFormPopulated"
            class="form-container pl-3 pt-2 mb-3"
          >
            <ul
              v-for="(value, key) in fullForm"
              :key="key"
              class="m-ul h5"
            >
              <h5>{{ key }}: {</h5>
              <li
                v-for="(v, k, i) in value"
                :key="i"
              >
                <div
                  v-if="!isPropertyClicked"
                >
                  <label
                    class="pl-2"
                  >
                    {{ k }}:
                  </label>
                  <span
                    class="text-secondary"
                    @click="editProperty"
                  >
                    {{ v }}
                  </span>
                </div>
                <div
                  v-else
                >
                  <div
                    v-if="typeof(v) === 'boolean'"
                  >
                    <label
                      class="h5"
                    >
                      {{ k }}:
                    </label>
                    <button
                      class="btn btn-light text-white ml-2 mb-2"
                      style="background-color: rgb(175, 175, 175)"
                      :value="v"
                      @click="update(value, k, v)"
                    >
                      {{ v }}
                    </button>
                  </div>
                  <div
                    v-else
                  >
                    <label
                      class="h5"
                    >
                      {{ k }}:
                    </label>
                    <input
                      class="ml-2 pl-1"
                      :value="v"
                      @input="update(value, k, $event.target.value)"
                    >
                  </div>
                </div>
              </li>
              <h5>}</h5>
            </ul>
          </div>
        </b-col>
        <b-col>
          <h3>Controls</h3>
          <div
            v-if="!isEmptyFormPopulated && !isFullFormPopulated"
          >
            <ul
              v-for="(value, key) in appData"
              :key="key"
              style="list-style: none"
              class="m-ul"
            >
              <h5>{{ key }}: {</h5>
              <li
                v-for="(v, k) in value"
                :key="k"
                class="mb-1 pl-2"
              >
                <div
                  v-if="typeof(v) === 'boolean'"
                >
                  <label
                    class="h5"
                  >
                    {{ k }}:
                  </label>
                  <button
                    class="btn btn-light text-white ml-2 mb-2"
                    style="background-color: rgb(175, 175, 175)"
                    :value="v"
                    @click="update(value, k, v)"
                  >
                    {{ v }}
                  </button>
                </div>
                <div
                  v-else
                >
                  <label
                    class="h5"
                  >
                    {{ k }}:
                  </label>
                  <input
                    class="ml-2 pl-1"
                    :value="v"
                    @input="update(value, k, $event.target.value)"
                  >
                </div>
              </li>
              <h5>}</h5>
            </ul>
          </div>
          <div
            v-if="isEmptyFormPopulated && !isFullFormPopulated"
          >
            <ul
              v-for="(value, key) in emptyForm"
              :key="key"
              style="list-style: none"
              class="m-ul"
            >
              <h5>{{ key }}: {</h5>
              <li
                v-for="(v, k) in value"
                :key="k"
                class="mb-1 pl-2"
              >
                <div
                  v-if="typeof(v) === 'boolean'"
                >
                  <label
                    class="h5"
                  >
                    {{ k }}:
                  </label>
                  <button
                    class="btn btn-light text-white ml-2 mb-2"
                    style="background-color: rgb(175, 175, 175)"
                    :value="v"
                    @click="update(value, k, v)"
                  >
                    {{ v }}
                  </button>
                </div>
                <div
                  v-else
                >
                  <label
                    class="h5"
                  >
                    {{ k }}:
                  </label>
                  <input
                    class="ml-2 pl-1"
                    :value="v"
                    @input="update(value, k, $event.target.value)"
                  >
                </div>
              </li>
              <h5>}</h5>
            </ul>
          </div>
          <div
            v-if="isFullFormPopulated && !isEmptyFormPopulated"
          >
            <ul
              v-for="(value, key) in fullForm"
              :key="key"
              style="list-style: none"
              class="m-ul"
            >
              <h5>{{ key }}: {</h5>
              <li
                v-for="(v, k) in value"
                :key="k"
                class="mb-1 pl-2"
              >
                <div
                  v-if="typeof(v) === 'boolean'"
                >
                  <label
                    class="h5"
                  >
                    {{ k }}:
                  </label>
                  <button
                    class="btn btn-light text-white ml-2 mb-2"
                    style="background-color: rgb(175, 175, 175)"
                    :value="v"
                    @click="update(value, k, v)"
                  >
                    {{ v }}
                  </button>
                </div>
                <div
                  v-else
                >
                  <label
                    class="h5"
                  >
                    {{ k }}:
                  </label>
                  <input
                    class="ml-2 pl-1"
                    :value="v"
                    @input="update(value, k, $event.target.value)"
                  >
                </div>
              </li>
              <h5>}</h5>
            </ul>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CApplicationEditorInfo from '../CApplicationEditorInfo.vue'
import data from './formData'

export default {
  name: 'CC3',
  components: {
    CApplicationEditorInfo,
  },

  data () {
    return {
      emptyForm: data.emptyForm,
      fullForm: data.fullForm,
      appData: data.appData,
      components: this.$options.components,
      isEmptyFormPopulated: false,
      isFullFormPopulated: false,
      isPropertyClicked: false,
    }
  },

  methods: {
    update (objectName, propertyName, value) {
      if (typeof (value) === 'boolean') {
        value = !value
      }

      this.$set(objectName, propertyName, value)
    },
    editProperty () {
      this.isPropertyClicked = !this.isPropertyClicked
    },
    populateEmptyForm () {
      this.isEmptyFormPopulated = !this.isEmptyFormPopulated

      if (this.isFullFormPopulated) {
        this.isFullFormPopulated = !this.isFullFormPopulated
      }
    },
    populateFullForm () {
      this.isFullFormPopulated = !this.isFullFormPopulated

      if (this.isEmptyFormPopulated) {
        this.isEmptyFormPopulated = !this.isEmptyFormPopulated
      }
    },
    onInfoSubmit (application) {
    },
    onDelete () {
    },
  },
}
</script>

<style scoped lang="scss">
.ml-list {
  margin-left: -30px;
}

.forms:hover,
.form-container {
  background-color: rgb(231, 231, 231);
}

.form,
.form-container {
  border-radius: 5px;
}

.forms {
  cursor: pointer;
  padding: 5px 0 5px 5px;
}

.form-container {
  border-radius: 5px;
  margin-bottom: 5px;

  .m-ul {
    list-style-type: none;
    margin-left: -40px;
    margin-bottom: -3px;
  }
}
</style>
