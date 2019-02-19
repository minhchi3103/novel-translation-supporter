<template>
  <div class="work-space">
    <Translator/>
  </div>
</template>

<script>
// @ is an alias to /src
import Translator from '@/components/Translator.vue'
export default {
  name: 'WorkSpace',
  components: {
    Translator
  }
}
</script>
