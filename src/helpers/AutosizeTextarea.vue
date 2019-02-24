<template>
  <textarea @blur="updateContent" :value="value" :name="name" :rows="rows"/>
</template>
<script>
import autosize from "autosize";
export default {
  props: {
    name: {
      default: ""
    },
    value: {
      default: ""
    },
    rows: {
      default: 2
    },
    placeholder: {
      default: ""
    }
  },
  mounted() {
    autosize(this.$el);
  },
  watch: {
    value: function() {
      this.$nextTick(
        function() {
          autosize.update(this.$el);
        }.bind(this)
      );
    }
  },
  methods: {
    updateContent() {
      this.$emit("input", this.$el.value);
    }
  }
};
</script>