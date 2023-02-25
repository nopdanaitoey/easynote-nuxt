<template>
  <a-modal
    :visible="visible"
    class="login-container"
    :title="form.title"
    @cancel="hideModal"
  >
    <template #footer>
      <a-icon
        v-if="i > 0"
        key="undo"
        type="undo"
        :style="{ color: '#B6E2A1', fontSize: '24px', float: 'left' }"
        @click="handleUndo()"
      />
      <a-icon
        v-if="formHistory.length > 0 || formHistory.length <= i"
        key="redo"
        type="redo"
        :style="{ color: '#FF9F9F', fontSize: '24px', float: 'right' }"
        @click="handleRedo()"
      />

      <p class="date-text">
        {{ $moment(form.createdAt).format('dddd, MMMM Do YYYY') }}
      </p>
    </template>
    <div>
      <div class="login-wrapper">{{ form.body }}</div>
    </div>
  </a-modal>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    note: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form: {},
      formHistory: [],
      formBackup: {},
      i: 0,
    }
  },
  watch: {
    async visible(v) {
      if (v) {
        await this.handleQuery()
      }
    },
  },
  methods: {
    hideModal() {
      this.i = 0
      this.$emit('cancel')
    },
    handleQuery() {
      this.form = this.note
      const api = `history/${this.note.id}`
      this.$axios.get(api).then((res) => {
        this.formHistory = res.data
      })
    },
    handleRedo() {
      this.formBackup = this.form
      if (this.formHistory.length > this.i) {
        this.form = this.formHistory[this.i]
        this.i++
      }
    },
    handleUndo() {
      this.i = 0
      this.form = this.formBackup
    },
  },
}
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.login-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
}

.login-card {
  width: 100%;
}
.date-text {
  font-size: 10px;
  color: black;

  text-align: center;
}
.login-title {
  text-align: center;
}

.login-button {
  width: 100%;
}
</style>
