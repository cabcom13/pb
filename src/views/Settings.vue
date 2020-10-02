<template>
  <section id="settings">
  <UserPanel 
  @triggerModal="addFile()"
  @addBackgroundImage="addBackgroundImage()"
  :hideTrigger="true"
  :showImageSwitch="true"
  :showUserImage="true"
  />


    <b-container class="pt-5">
    <h3>Hallo, {{userProfile.name}}</h3>
    <input  type="file" size="50" accept="image/*" ref="myfile" style="display:none;" @change="onFileChange">
    <input  type="file" size="50" accept="image/*" ref="mybgfile" style="display:none;" @change="onBackgroundImageChange"> 

    <div v-if="upload_loader.status" class="my-3">
      <small>Upload läuft...</small>
    <b-progress  :value="upload_loader.progress" max="100" show-progress animated></b-progress>
    </div>

    <v-swatches v-model="userProfile.header_textcolor"  :show-border="true" :swatches="swatches" inline shapes="circles" swatch-size="30" background-color="transparent"></v-swatches>

    <b-alert v-if="showSuccess" variant="success" show>Profil update erfolgreich</b-alert>
    <b-alert class="mt-3" :show="upload_loader.text != ''" variant="success">{{upload_loader.text}}</b-alert>
    <b-form  @submit.prevent>
      <div class="mb-3"> 
          <label for="name">Benutzername</label>    
          <b-form-input v-model.trim="name" name="name" :placeholder="userProfile.name" id="name"></b-form-input>
      </div>

      <!-- <div> 
          <label for="title">Title</label>   
          <b-form-input  v-model.trim="title" name="title" :placeholder="userProfile.title" id="name"></b-form-input>
      </div> -->

      <b-btn class="mt-5" variant="info" @click="updateProfile()">Profile speichern</b-btn>
    </b-form>

 <b-btn variant="link" @click="logout()">Logout</b-btn>
    </b-container>
  </section>
</template>

<script>
import { mapState, store } from 'vuex'
import UserPanel from '@/components/UserPanel'
import VSwatches from 'vue-swatches'
// Import the styles too, typically in App.vue or main.js
import 'vue-swatches/dist/vue-swatches.css'


export default {
  components: {UserPanel,VSwatches },
  data() {
    return {
      swatches: [ '#FFFFFF', '#000000'],
      name: '',
      title: '',
      avatar: '',
      backgroundImage: '',
      avatardata:'',
      showSuccess: false,
       userAvatar: undefined,

    }
  },
  computed: {
    ...mapState(['userProfile', 'upload_loader'])
  },
  methods: {
   
    logout() {
      this.$store.dispatch('logout')
    },
    addFile(){
        const elem = this.$refs.myfile
        elem.click()
    },
    addBackgroundImage(){
        const elem = this.$refs.mybgfile
        elem.click()
        
    },
    onBackgroundImageChange(e) {
      const file = e.target.files[0];
      
      if(file){
        this.userProfile.backgroundImage = URL.createObjectURL(file);
        this.backgroundImage = file
        this.$store.dispatch('updateProfileBackgroundImage', file)

      }
    },
    onFileChange(e) {
      const file = e.target.files[0];
      
      if(file){
        this.userProfile.avatar = URL.createObjectURL(file);
        this.avatardata = file
        this.$store.dispatch('updateProfileImage', file)

      }
    },
    updateProfile() {

      this.$store.dispatch('updateProfile', {
        name: this.name !== '' ? this.name : this.userProfile.name,
        title: this.title !== '' ? this.title : this.userProfile.title
      })

      this.name = ''
      this.title = ''
      this.avatar = ''
      this.showSuccess = true

      setTimeout(() => {
        this.showSuccess = false
      }, 2000)
    }
  },
  filters: {
    
    initial(val){
      if(val){
        return  `${val.charAt(0)}`
      }
     
    }
  }
}
</script>
