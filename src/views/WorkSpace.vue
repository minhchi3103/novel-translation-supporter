<template>
  <div class="work-space">
    <WorkSpaceTranslator v-if="false"/>
    <WorkSpaceLoadFromJsonOldVersion/>

  </div>
</template>

<script>
// @ is an alias to /src
import WorkSpaceTranslator from "@/components/WorkSpaceTranslator.vue"
import WorkSpaceLoadFromJsonOldVersion from "@/components/WorkSpaceLoadFromJsonOldVersion.vue"
import func from './vue-temp/vue-editor-bridge'
export default {
  name: "WorkSpace",
  components: {
    WorkSpaceTranslator,
    WorkSpaceLoadFromJsonOldVersion
  },
  metaInfo: {
      title: 'Công cụ dịch thuật',
    },
  data(){
    return {
      translationData:Object,
    }
  },
  methods:{
  }
};
</script>
