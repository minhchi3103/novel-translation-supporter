<template>
  <div id="json-loader">
    <div class="card">
      <div class="card-header text-left">Load From Json old version</div>
      <div class="card-body">
        <input type="file" accept=".json" ref="fileInput" @change="loadDataFromJson">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      translation_obj: Object
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
      this.translation_obj.novel_name = obj.info.title;
      this.translation_obj.novel_volume = "";
      this.translation_obj.novel_chapter = obj.info.chapter;
      this.translation_obj.content = [];
      obj.content.forEach(item => {
        if (!item.isDeleted)
          this.translation_obj.content.push({
            source: item.src,
            translator: item.dest
          });
      });
    }
  }
};
</script>
