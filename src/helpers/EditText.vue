<template>
  <input v-if="editable==true" type="text" :value="value" @blur="updateAndExit">
  <font v-else>
    {{value}}
    <font-awesome-icon icon="edit" @click="editable=true" :title="title"/>
  </font>
</template>
<script>
export default {
  props: {
    value: {
      default: "",
      required: false
    },
    title: {
      default: "edit",
      required: false
    }
  },
  data() {
    return {
      editable: false
    };
  },
  watch: {
    editable: function() {
      if (this.editable == true) {
        this.$nextTick(
          function() {
            this.$el.focus();
          }.bind(this)
        );
      }
    }
  },
  methods: {
    updateAndExit: function() {
      this.editable = false;
      this.$emit("input", this.$el.value);
    }
  }
};
</script>
<style scoped>
svg {
  cursor: pointer;
}
</style>
