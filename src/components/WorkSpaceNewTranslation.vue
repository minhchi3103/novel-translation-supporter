<template>
  <div class="card text-left">
    <div class="card-header">
      Tạo mới
      <button type="button" class="close" aria-label="Close" @click="close">
        <font-awesome-icon icon="times"/>
      </button>
    </div>
    <div class="card-body">
      <p>Tiêu đề:
        <EditText v-model="novel_title"/>
      </p>
      <p>Vol:
        <EditText v-model="novel_volume"/>
      </p>
      <p>Chap:
        <EditText v-model="novel_chapter"/>
      </p>
      <div class="form-group mx-1">
        <label for="text-input">Nội dung</label>
        <textarea class="form-control" id="text-input" rows="5" v-model="text_raw"></textarea>
      </div>
      <div class="form-check">
        <input
          type="checkbox"
          class="form-check-input"
          id="text-remove-blank-paragraph"
          v-model="remove_blank_paragraph"
        >
        <label class="form-check-label" for="text-remove-blank-paragraph">Tự động xóa dòng trống</label>
      </div>
      <button class="btn btn-success" @click="closeAndLoad">Load</button>
    </div>
  </div>
</template>
<script>
import EditText from "@/helpers/EditText.vue";
export default {
  components: {
    EditText
  },
  data() {
    return {
      novel_title: "",
      novel_volume: "",
      novel_chapter: "",
      novel_content: [],
      text_raw: "",
      remove_blank_paragraph: true
    };
  },
  watch: {
    /**
     * Split raw text to array of paragraph structure ({source: String, translator: String})
     * Filter blank paragraph if remove_blank_paragraph === true
     * paragraph is blank if it have no char or only space char (regex only space char:/^\s*$/)
     */
    text_raw: function() {
      this.novel_content = this.text_raw.split("\n").map(x => {
        return {
          source: x,
          translator: ""
        };
      });
      if (this.remove_blank_paragraph)
        this.novel_content = this.novel_content.filter(
          x => !(/^\s*$/.test(x.source) || x.source == "")
        );
    }
  },
  methods: {
    closeAndLoad: function() {
      let translation_obj = Object;
      translation_obj.novel_title = this.novel_title;
      translation_obj.novel_volume = this.novel_volume;
      translation_obj.novel_chapter = this.novel_chapter;
      translation_obj.novel_content = this.novel_content;
      this.$emit("close", translation_obj);
    },
    close: function() {
      let translation_obj = null;
      this.$emit("close", translation_obj);
    }
  }
};
</script>
