<template>
  <div>
    <div v-if="isLoading">
      <a-spin class="center-container" />
    </div>
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>เพิ่มบันทึกช่วยจำ</span>
      </template>
      <a>
        <a-icon
          class="icons"
          type="plus-circle"
          theme="twoTone"
          two-tone-color="#1677ff"
          @click="handleAddNote()"
      /></a>
    </a-tooltip>
    <a-tabs @change="tabChange">
      <a-tab-pane
        v-for="menu in menuArr"
        :key="menu.id"
        :tab="menu.categoryType"
      >
        <template #tab>
          {{ menu.categoryType }}
        </template>
        <a-row :gutter="[16, 16]">
          <a-col
            v-for="dataItem in dataItems"
            :key="dataItem.id"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
          >
            <a-card
              hoverable
              :style="{
                width: '100%',
                height: '100%',
              }"
            >
              <template slot="actions">
                <a-icon
                  type="heart"
                  theme="twoTone"
                  :two-tone-color="dataItem.loveFlag === true ? '#eb2f96' : ''"
                  @click="handleLoveFlag(dataItem)"
                />
                <a-icon
                  key="search"
                  type="search"
                  @click="showNote(dataItem)"
                />
                <a-icon
                  key="edit"
                  type="edit"
                  @click="handleEdit(dataItem, 'edit')"
                />
                <a-icon
                  key="delete"
                  type="delete"
                  @click="handleDelete(dataItem)"
                />
              </template>

              <a-card-meta :title="dataItem.title">
                <template #description>
                  <p>{{ dataItem.body.substr(0, 10) }}...</p>
                  <p class="date-text">
                    {{
                      $moment(dataItem.createdAt).format('dddd, MMMM Do YYYY')
                    }}
                  </p>
                </template>
              </a-card-meta>
            </a-card>
          </a-col>
        </a-row>
      </a-tab-pane>
    </a-tabs>
    <AddNote
      :visible="modalEditVisible"
      :active-flag="flagAddOrUpdate"
      :item-edit="itemEdit"
      @cancel="emitCancel"
      @ok="emitOk"
    />
    <ShowNote
      :visible="showDetailVisible"
      :note="itemData"
      @cancel="emitCancelNote"
    />
  </div>
</template>

<script>
import AddNote from '@/components/Modal/Note/AddNote.vue'
import ShowNote from '@/components/Modal/Note/DetailNote.vue'
export default {
  components: {
    AddNote,
    ShowNote,
  },
  middleware: 'auth',
  props: {},
  data() {
    return {
      dataItems: [],
      modalEditVisible: false,
      showDetailVisible: false,
      flagAddOrUpdate: '',
      menuArr: [],
      currentTab: 1,
      itemEdit: {},
      itemData: {},
      isLoading: false,
    }
  },
  mounted() {
    this.getHeaderMenu()
  },
  async created() {
    await this.callApi()
  },
  methods: {
    handleAddNote() {
      this.flagAddOrUpdate = 'add'
      this.modalEditVisible = true
    },
    async getHeaderMenu() {
      const api = '/categorynote'
      await this.$axios.get(api).then((res) => {
        this.menuArr = res.data
      })
    },
    async tabChange(key) {
      this.currentTab = await key
      this.callApi()
    },
    async callApi() {
      this.isLoading = true
      let api = ''
      if (this.currentTab === 1) {
        api = await '/note'
      } else {
        api = await `/note/type/${this.currentTab}`
      }
      await this.$axios
        .get(api)
        .then(async (res) => {
          this.dataItems = await res.data
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    handleEdit(v) {
      this.flagAddOrUpdate = 'edit'
      this.modalEditVisible = true
      this.itemEdit = v
    },
    emitCancel() {
      this.modalEditVisible = false
    },
    emitOk() {
      this.modalEditVisible = false
      this.callApi()
    },
    async handleDelete(v) {
      const api = `/note/${v.id}`
      await this.$axios
        .delete(api)
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
          this.callApi()
        })
    },
    showNote(v) {
      this.itemData = v
      this.showDetailVisible = true
    },
    emitCancelNote() {
      this.itemData = {}
      this.showDetailVisible = false
    },
    async handleLoveFlag(v) {
      v.loveFlag = !v.loveFlag
      const api = `/note/${v.id}`

      await this.$axios
        .patch(api, v)
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
        .finally(() => {})
    },
  },
}
</script>
<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
.date-text {
  font-size: 10px;
  color: black;
}
.icons {
  margin-top: 6px;
  margin-left: 10px;
  font-size: 24px;
}
</style>
