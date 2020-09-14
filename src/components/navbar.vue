<template>
<div>
    <b-navbar toggleable="lg" type="dark" style="background-color:#8e24aa">
        <b-container fluid>
            <b-navbar-brand to="/"><strong>Pray</strong>book</b-navbar-brand>     
             <b-dropdown id="mainmenu_dropdown" text="Dropdown Button" class="m-md-2" variant="link"  no-caret dropleft>
              <template v-slot:button-content >
                <i class="fa fa-2x fa-ellipsis-v" aria-hidden="true"></i>
              </template>
              <b-dropdown-item to="/"><i class="fa fa-home mr-2" aria-hidden="true"></i> Startseite</b-dropdown-item>
              <b-dropdown-item to="/settings"><i class="fa fa-cogs mr-2" aria-hidden="true"></i> Einstellungen</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item><i class="fa fa-sign-out mr-2" aria-hidden="true"></i> Ausloggen</b-dropdown-item>

            </b-dropdown>     
        </b-container>
    </b-navbar>


</div>
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

<style scoped>
#mainmenu_dropdown{
  color:#fff!important;
}
#mainmenu_dropdown button .fa{
  color:#fff!important;
}
</style>>

