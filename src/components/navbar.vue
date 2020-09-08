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
            <b-navbar-nav class="ml-auto">
               
                <b-nav-item-dropdown right>
                    <!-- Using 'button-content' slot -->
                    <template v-slot:button-content>
                     <b-navbar-brand to="/settings">
                        <b-avatar class="" size="2em"  :text="userProfile.name | initial" :src="userProfile.avatar"></b-avatar>
                    </b-navbar-brand>
                    </template>
                       <b-dropdown-item @click="logout()">Logout</b-dropdown-item>
                </b-nav-item-dropdown>
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