<template>
    <div class="mt-4">

      <b-row>
        <b-col cols="4">
          <b-img-lazy fluid-grow rounded :src="userProfile.avatar"  blank-color="#cfd8dc" blank-width="1024" blank-height="768"></b-img-lazy>
        </b-col>
        <b-col>
            Willkommen <strong>{{userProfile.name}}</strong>
            <div>
              <b-btn variant="link" @click="logout()">Logout</b-btn>
            </div>
        </b-col>
      </b-row>

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