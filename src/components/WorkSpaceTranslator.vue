<template>
  <div id="translator-area">
    <div class="card">
      <div class="card-header text-left">Thông tin</div>
      <div class="card-body text-left">
        <p class="card-text">Tiêu đề:
          <EditText v-model="novel_title"/>
        </p>
        <p class="card-text">Vol:
          <EditText v-model="novel_volume"/>
        </p>
        <p class="card-text">Chap:
          <EditText v-model="novel_chapter"/>
        </p>
      </div>
    </div>
    <div class="card">
      <div class="card-header text-left">Bản dịch</div>
      <div class="card-body">
        <template v-if="novel_content&&novel_content.length>0">
          <div
            class="row border align-items-center p-1"
            v-for="(paragraph, index) in novel_content"
            :key="'paragraph-'+index"
            :id="'paragraph-'+index"
          >
            <div class="col-5" @keyup.enter="breakSource(index)">
              <AutosizeTextarea
                class="form-control"
                :id="'p-source-'+index"
                v-model="paragraph.source"
              />
            </div>
            <div class="col-1">
              <button class="btn btn-info" title="Copy text">
                <font-awesome-icon icon="copy"/>
              </button>
              <button class="btn btn-info" @click="autoTranslate(index)" title="Translate text">
                <font-awesome-icon icon="magic" flip="horizontal"/>
              </button>
            </div>
            <div class="col-5">
              <AutosizeTextarea
                class="form-control"
                :id="'p-destination-'+index"
                v-model="paragraph.translator"
              />
            </div>
            <div class="col-1">
              <button class="btn btn-success" title="Add paragraph">
                <font-awesome-icon icon="plus"/>
              </button>
              <button class="btn btn-danger" title="Remove paragraph">
                <font-awesome-icon icon="minus"/>
              </button>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="row">
            <div class="col">
              <button class="btn btn-success" title="Add paragraph">
                <font-awesome-icon icon="plus"/>
              </button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import AutosizeTextarea from "@/helpers/AutosizeTextarea.vue";
import EditText from "@/helpers/EditText.vue";
var translate = require("yandex-translate")(process.env.VUE_APP_YANDEX_API_KEY);
export default {
  props: {
    title: String,
    volume: String,
    chapter: String,
    content: Array
  },
  data() {
    return {
      novel_title: this.title,
      novel_volume: this.volume,
      novel_chapter: this.chapter,
      novel_content: this.content.map(x => ({ ...x }))
    };
  },
  watch: {
    novel_title: function() {
      this.$emit("updateTitle", this.novel_title);
    },
    novel_volume: function() {
      this.$emit("updateVolume", this.novel_volume);
    },
    novel_chapter: function() {
      this.$emit("updateChapter", this.novel_chapter);
    },
    novel_content: {
      handler: function() {
        this.$emit("updateContent", this.novel_content);
      },
      deep: true
    }
  },
  methods: {
    autoTranslate: function(id) {
      translate.translate(
        this.novel_content[id].source,
        { from: "en", to: "vi" },
        function(err, res) {
          if (res && res.text) {
            this.novel_content[id].translator = res.text[0];
          }
        }.bind(this)
      );
    },
    breakSource: function(id) {
      //break paragraph
      let arr = this.novel_content[id].source
        .split("\n")
        .map((x, key) => {
          return {
            source: x,
            translator: key > 0 ? "" : this.novel_content[id].translator
          };
        })
        .filter(x => !(/^\s*$/.test(x.source) || x.source == ""));
      this.novel_content.splice(id, 1, ...arr);
    }
  },
  components: {
    AutosizeTextarea,
    EditText
  }
};
</script>


