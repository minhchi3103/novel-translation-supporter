<template>
  <div id="json-loader">
    <div class="card">
      <div class="card-header text-left">
        Load From Json old version
        <button type="button" class="close" aria-label="Close" @click="close">
          <font-awesome-icon icon="times" />
        </button>
      </div>
      <div class="card-body">
        <input type="file" accept=".json" @change="loadDataFromJson">
        <button class="btn btn-success" @click="closeAndLoad">Load</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      translation_obj: null
    };
  },
  methods: {
    loadDataFromJson: function(event) {
      var input = event.target;
      var reader = new FileReader();
      reader.onload = function() {
        var text = reader.result;
        this.convertToNewVersion(JSON.parse(text));
      }.bind(this);
      reader.readAsText(input.files[0]);
    },
    convertToNewVersion: function(obj) {
      this.translation_obj = new Object();
      this.translation_obj.novel_title = obj.info.title;
      this.translation_obj.novel_volume = "";
      this.translation_obj.novel_chapter = obj.info.chapter;
      this.translation_obj.novel_content = [];
      obj.content.forEach(item => {
        if (!item.isDeleted)
          this.translation_obj.novel_content.push({
            source: item.src,
            translator: item.dest
          });
      });
    },
    closeAndLoad: function() {
      this.$emit("close", this.translation_obj);
      this.translation_obj = null;
    },
    close: function() {
      this.translation_obj = null;
      this.$emit("close", this.translation_obj);
    }
  }
};
</script>
