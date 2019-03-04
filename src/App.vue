<template>
  <div id="app" class="contaier-fluid">
    <NavBar class="sticky-top"/>
    <router-view/>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue"
import "bootstrap";
export default {
  name: "App",
  components:{
    NavBar
  },
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Translator tool Developed by Shinryak",
    // all titles will be injected into this template
    titleTemplate: "%s | Translator tool Developed by Shinryak"
  }
};
</script>
<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap.scss";
@import "../node_modules/vuejs-dialog/dist/vuejs-dialog.min.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
