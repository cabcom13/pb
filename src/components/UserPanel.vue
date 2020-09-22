<template>
 
        <b-avatar size="lg" :src="userProfile.avatar"  ></b-avatar>
</template>

<script>
import { mapState, store } from 'vuex'

export default {
props: {
  
},
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