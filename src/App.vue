<template>
  <div id="app" >
    <NavBar v-if="showNav"></NavBar>
   <b-container fluid  class="container-nogutter">
      <router-view/>
   </b-container>
   <nav class="navbar bottom navbar-light bg-light shadow">
     <b-container fluid>
        <small> &copy; PrayBook 2020</small>
     </b-container>
  
  </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NavBar from '@/components/navbar'
export default {
  components: {

    NavBar
  },
  computed: {
    ...mapState(['userProfile']),
    showNav() {
      return Object.keys(this.userProfile).length > 1
    },
     webShareApiSupported() {
    return navigator.share
  }
  },
  methods: {

  }
}
</script>
<style lang="scss" >
@import url('https://fonts.googleapis.com/css2?family=Meera+Inimai&display=swap');
body, html{
  font-family: 'Meera Inimai', sans-serif;
  background: #F0F2F5!important;
  min-height:100vh;
  font-size:1em;
}
.btn-primary.disabled, .btn-primary:disabled {
    background-color: #8e24aa!important;
    border-color: #8e24aa!important;
}
.text-info{
  color:--info!important;
}
.btn-info {
    color: #fff;
    background-color: #ab47bc!important;
    border-color: #ab47bc!important;
}
:root {
    --blue: #8e24aa!important;
    --indigo: #6610f2;
    --purple: #6f42c1;
    --pink: #e83e8c;
    --red: #dc3545;
    --orange: #fd7e14;
    --yellow: #ffc107;
    --green: #28a745;
    --teal: #20c997;
    --cyan: #ab47bc!important;
    --white: #fff;
    --gray: #6c757d;
    --gray-dark: #343a40;
    --primary: #8e24aa!important;
    --secondary: #6c757d;
    --success: #28a745;
    --info: #ab47bc!important;
    --warning: #ffc107;
    --danger: #dc3545;
    --light: #f8f9fa;
    --dark: #343a40;

}
.container-nogutter {
      
      
      overflow: hidden!important;
      @media (max-width: 575.98px) {
        padding:0!important;
      }
     @media (min-width: 768px) and (max-width: 991.98px) {
          margin:0 15px!important;
      }
}


</style>
