<template>
  <section id="settings">
    <div class="bg-white my-3 shadow-sm p-5 rounded">
    <h3>Einstellungen</h3>

     <b-alert v-if="showSuccess" variant="success" show>Profil update erfolgreich</b-alert>
      <b-row class="mt-4">
        <b-col sm="4">
          <b-avatar size="20rem" :text="userProfile.name | initial" rounded :src="userProfile.avatar"></b-avatar>
          <b-btn size="sm" block class="mt-2" variant="info"  @click="addFile()">Bild auswählen</b-btn>
          <input  type="file" size="50" accept="image/*" ref="myfile" style="display:none;" @change="onFileChange">

          <div v-if="upload_loader.status" class="my-3">
            <small>Upload läuft...</small>
          <b-progress  :value="upload_loader.progress" max="100" show-progress animated></b-progress>
          </div>
          <div>
          <b-alert class="mt-3" :show="upload_loader.text != ''" variant="success">{{upload_loader.text}}</b-alert>
          </div>
        </b-col>
        <b-col sm="8">
          <b-form  @submit.prevent>
            <div class="mb-3"> 
                <label for="name">Benutzername</label>    
                <b-form-input v-model.trim="name" name="name" :placeholder="userProfile.name" id="name"></b-form-input>
            </div>

            <div> 
                <label for="title">Title</label>   
                <b-form-input  v-model.trim="title" name="title" :placeholder="userProfile.title" id="name"></b-form-input>
            </div>

            <b-btn class="mt-5" variant="info" @click="updateProfile()">Profile speichern</b-btn>
          </b-form>
        </b-col>
      </b-row>

    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      name: '',
      title: '',
      avatar: '',
      avatardata:'',
      showSuccess: false
    }
  },
  computed: {
    ...mapState(['userProfile', 'upload_loader'])
  },
  methods: {
      addFile(){
        const elem = this.$refs.myfile
        elem.click()
     
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
