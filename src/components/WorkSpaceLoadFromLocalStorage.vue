<template>
  <div id="local-storage-loader">
    <div class="card">
      <div class="card-header text-left">
        Load From Local Storage
        <button
          type="button"
          class="close"
          aria-label="Close"
          @click="close"
        >
          <font-awesome-icon icon="times"/>
        </button>
      </div>
      <div class="card-body">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col-1">#</th>
              <th scope="col-6">Tên truyện</th>
              <th scope="col-2">Volume</th>
              <th scope="col-2">Chapter</th>
              <th scope="col-1"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in trans_list"
              :key="'novel-'+index"
              @click="loadTranslationData(index)"
              title="Nhấp vào để load bản dịch"
            >
              <td scope="row">{{index+1}}</td>
              <td>{{item.novel_title}}</td>
              <td>{{item.novel_volume}}</td>
              <td class="text-left">{{item.novel_chapter}}</td>
              <td>
                <button class="btn btn-danger" @click.stop="deleteTranslation(index)">
                  <font-awesome-icon icon="times"/>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      trans_list: [],
      translation_obj: null
    };
  },
  created() {
    this.loadTransList();
  },
  methods: {
    loadTransList: function() {
      this.trans_list = Object.keys(localStorage)
        .filter(x => x.startsWith("TRANS_"))
        .map(x => {
          let tmp = x.split("_");
          return {
            key: x,
            novel_title: tmp[1],
            novel_volume: tmp[2],
            novel_chapter: tmp[3]
          };
        });
    },
    loadTranslationData: function(id) {
      this.translation_obj = JSON.parse(localStorage[this.trans_list[id].key]);
      this.closeAndLoad();
    },
    deleteTranslation: function(id) {
      this.$dialog
        .confirm("Bạn thực sự muốn xóa bản dịch này?", {okText:"Xác nhận", cancelText:"Hủy"})
        .then(function() {
          localStorage.removeItem(this.trans_list[id].key);
          this.trans_list.splice(id, 1);
        }.bind(this))
        .catch(function(){});
    },
    close: function() {
      this.translation_obj = null;
      this.$emit("close", this.translation_obj);
    },
    closeAndLoad: function() {
      this.$emit("close", this.translation_obj);
      this.translation_obj = null;
    }
  }
};
</script>
<style scoped>
table > tbody > tr {
  cursor: pointer;
}
</style>
