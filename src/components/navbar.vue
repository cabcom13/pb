<template>
    <b-navbar toggleable="lg" type="dark" style="background-color:#8e24aa">
        <b-container fluid>
            <b-navbar-brand to="/"><strong>Pray</strong>book</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item to="/">Startseite</b-nav-item>
                <b-nav-item to="/settings" >Einstellungen</b-nav-item>
            </b-navbar-nav>
            </b-collapse>
        </b-container>
    </b-navbar>
</template>
<script>
import { mapState, store } from 'vuex'

export default {
  components: {

  },
  computed: {
    ...mapState(['userProfile'])
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  },
  filters: {
    
    initial(val){
      return  `${val.charAt(0)}`
    }
  }
}
</script>