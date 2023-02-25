<template>
  <div>
    <div>
      <!-- title="เพิ่มโน๊ตช่วยจำ" -->
      <a-modal :visible="visible" @cancel="hideModal">
        <template #footer>
          <a-button key="submit" type="primary" @click="submitNote">
            บันทึก
          </a-button>
          <a-button key="back" @click="hideModal"> ยกเลิก </a-button>
        </template>
        <template #title>
          <p>
            <a-icon type="snippets" style="margin-right: 6px" />เพิ่มโน๊ตช่วยจำ
          </p>
          <a-radio-group
            v-model="form.noteType"
            @change="handleFormLayoutChange"
          >
            <a-radio-button
              v-for="noteType in noteTypes"
              :key="noteType.id"
              :value="noteType.id"
            >
              {{ noteType.categoryType }}
            </a-radio-button>
          </a-radio-group>
        </template>

        <p>หัวเรื่องช่วยจำ</p>
        <a-input
          v-model="form.title"
          v-decorator="['หัวเรื่องช่วยจำ']"
          placeholder="หัวเรื่องช่วยจำ"
          allow-clear
        >
        </a-input>

        <p style="margin-top: 10px">เนื้อหา</p>

        <a-textarea
          v-model="form.body"
          placeholder="เพิ่มเนื้อหาของคุณกันเลย !"
          allow-clear
          size="large"
          :rows="10"
        >
        </a-textarea>
        <h5
          v-if="activeFlag !== 'add'"
          style="margin-top: 5px; color: gray; font-size: 14px"
        >
          {{ $moment(form.createdAt) }}
        </h5>
      </a-modal>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    activeFlag: {
      type: String,
      default: '',
    },
    itemEdit: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form: {},
      noteTypes: [],
      loading: false,
    }
  },
  watch: {
    visible(v) {
      if (v) {
        this.getHeaderMenu()
        if (this.activeFlag === 'edit') {
          this.form = Object.assign({}, this.form, {
            ...this.itemEdit,
          })
        }
      }
    },
  },
  methods: {
    async getHeaderMenu() {
      const api = '/categorynote'
      await this.$axios.get(api).then((res) => {
        this.noteTypes = res.data.splice(1)
      })
    },
    hideModal() {
      this.clearData()
      this.$emit('cancel')
    },
    okModal() {
      this.clearData()
      this.$emit('ok')
    },
    clearData() {
      this.form = {}
    },
    async addNote() {
      const api = '/note'
      await this.$axios
        .post(api, this.form)
        .then((res) => {
          if (res.data.statusCode === 1) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error('เกิดข้อผิดพลาด กรุณาลองใหม่')
          }
        })
        .catch(() => {
          this.$message.error('เกิดข้อผิดพลาด กรุณาลองใหม่')
        })
        .finally(() => {
          this.okModal()
        })
    },
    async editNote() {
      const api = `/note/${this.form.id}`

      await this.$axios
        .patch(api, this.form)
        .then((res) => {
          if (res.data.statusCode === 1) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error('เกิดข้อผิดพลาด กรุณาลองใหม่')
          }
        })
        .catch(() => {
          this.$message.error('เกิดข้อผิดพลาด กรุณาลองใหม่')
        })
        .finally(() => {
          this.okModal()
        })
    },
    submitNote() {
      if (this.activeFlag === 'add') {
        this.addNote()
      } else {
        this.editNote()
      }
    },
    handleFormLayoutChange(key) {
      this.form = Object.assign({}, this.form, {
        noteType: key.target.value,
        userid: 1,
      })
    },
  },
}
</script>
<style scoped>
p {
  font-size: 15px;
}
</style>
