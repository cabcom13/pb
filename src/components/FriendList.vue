<template>
    <div class="mt-4">

<div>
<b-avatar class="mr-3"></b-avatar>
Test Tester
<hr />
</div>

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
   
  },
  filters: {
    
    initial(val){
      return  `${val.charAt(0)}`
    }
  }
}
</script>