<template>
  <div class="work-space">
    <button
      class="btn btn-primary"
      @click="load_mode='new-translation'"
    >New</button>
    <button
      class="btn btn-primary"
      @click="load_mode='load-old-json-version'"
    >Load Old Version</button>
    <button
      class="btn btn-primary"
      @click="load_mode='load-local-storage'"
    >Load From Web Storage</button>
    <button class="btn btn-primary" @click="saveToLocalStorage">Save to Local</button>
    <button class="btn btn-primary">Save as...</button>
    <button class="btn btn-primary" @click="copyTranslatedText">Copy</button>
    <transition name="bounce">
      <WorkSpaceLoadFromJsonOldVersion v-if="load_mode=='load-old-json-version'" @close="loadDataObject"/>
      <WorkSpaceLoadFromLocalStorage v-if="load_mode=='load-local-storage'" @close="loadDataObject"/>
      <WorkSpaceNewTranslation v-if="load_mode=='new-translation'" @close="loadDataObject"/>
      <WorkSpaceTranslator v-if="load_mode==''"
      :novel_title="novel_title"
      :novel_volume="novel_volume"
      :novel_chapter="novel_chapter"
      :novel_content="novel_content"
      @updateTitle="updateTitle"
      @updateVolume="updateVolume"
      @updateChapter="updateChapter"
      @updateContent="updateContent"
    />
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import WorkSpaceTranslator from "@/components/WorkSpaceTranslator.vue";
import WorkSpaceNewTranslation from "@/components/WorkSpaceNewTranslation.vue";
import WorkSpaceLoadFromJsonOldVersion from "@/components/WorkSpaceLoadFromJsonOldVersion.vue";
import WorkSpaceLoadFromLocalStorage from "@/components/WorkSpaceLoadFromLocalStorage.vue";
import copyTextToClipboard from 'copy-text-to-clipboard'
export default {
  name: "WorkSpace",
  components: {
    WorkSpaceTranslator,
    WorkSpaceLoadFromJsonOldVersion,
    WorkSpaceLoadFromLocalStorage,
    WorkSpaceNewTranslation
  },
  metaInfo: {
    title: "Công cụ dịch thuật"
  },
  data() {
    return {
      novel_title: "",
      novel_volume: "",
      novel_chapter: "",
      novel_content: [],
      load_mode: "",
    };
  },
  methods: {
    loadDataObject: function(obj) {
      if (obj) {
        this.novel_title = obj.novel_title;
        this.novel_volume = obj.novel_volume;
        this.novel_chapter = obj.novel_chapter;
        this.novel_content = obj.novel_content;
      }
      this.load_mode = "";
    },
    saveToLocalStorage: function() {
      let name =
        "TRANS_" +
        this.novel_title +
        "_" +
        this.novel_volume +
        "_" +
        this.novel_chapter;
      let objStorage = {
        novel_title: this.novel_title,
        novel_volume: this.novel_volume,
        novel_chapter: this.novel_chapter,
        novel_content: this.novel_content
      };
      localStorage.setItem(name, JSON.stringify(objStorage));
    },
    updateTitle: function(str) {
      this.novel_title=str;
    },
    updateVolume: function(str) {
      this.novel_volume=str;
    },
    updateChapter: function(str) {
      this.novel_chapter=str;
    },
    updateContent: function(obj) {
      this.novel_content=obj;
    },
    copyTranslatedText: function(){
      copyTextToClipboard(this.novel_content.map(x=>x.translator).join("\n"));
    }
  }
};
</script>
<style lang="scss" scoped>
.bounce-enter-active {
  animation: bounce-in 0.3s;
}
.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  20% {
    transform: scale(0.2);
  }
  40% {
    transform: scale(0.4);
  }
  60% {
    transform: scale(0.6);
  }
  80% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}
</style>

