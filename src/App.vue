<template>
<v-app id="inspire">
        <router-view/>
  </v-app>
</template>

<script>

  export default {
    
   
  }
</script>

<style>
  .v-overlay__scrim {
      -webkit-backdrop-filter: blur(1px);
      backdrop-filter: blur(1px);
  }
  .v-overlay--active {
      -webkit-backdrop-filter: blur(5px);
      backdrop-filter: blur(5px);
  }
</style>