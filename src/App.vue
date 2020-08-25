<template>
  <div id="app" >
    <NavBar v-if="showNav"></NavBar>
    <b-container>
    <router-view/>
    </b-container>
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
      shareViaWebShare() {
        navigator.share({
          title: 'Title to be shared',
          text: 'Text to be shared',
          url: 'URL to be shared'
        })
      }
  }
}
</script>
<style>
body, html{
  background:rgba(21,21,21,.03)!important;
  min-height:100vh;
}
.btn-primary.disabled, .btn-primary:disabled {
    background-color: #8e24aa!important;
    border-color: #8e24aa!important;
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
</style>
