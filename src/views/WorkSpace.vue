<template>
  <div class="work-space">
    <button
      class="btn btn-primary"
      @click="show_load_json_old_version=!show_load_json_old_version"
    >Load Old Version</button>
    <transition name="bounce">
      <WorkSpaceLoadFromJsonOldVersion v-if="show_load_json_old_version" @close="loadDataObject"/>
    </transition>

    <WorkSpaceTranslator
      :novel_title="novel_title"
      :novel_volume="novel_volume"
      :novel_chapter="novel_chapter"
      :novel_content="novel_content"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import WorkSpaceTranslator from "@/components/WorkSpaceTranslator.vue";
import WorkSpaceLoadFromJsonOldVersion from "@/components/WorkSpaceLoadFromJsonOldVersion.vue";
export default {
  name: "WorkSpace",
  components: {
    WorkSpaceTranslator,
    WorkSpaceLoadFromJsonOldVersion
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
      show_load_json_old_version: false
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
      this.show_load_json_old_version=false;
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

