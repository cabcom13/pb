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
    <b-row class="pt-4">
      <b-col lg="4" sm="7">
        <h3 class="pull-left">Hallo, {{userProfile.name}}</h3>
      </b-col>
      <b-col lg="8" sm="5">
        <b-btn variant="link" class="pull-right" @click="logout()" >Ausloggen</b-btn>  
      </b-col>
    </b-row>



    <div v-if="upload_loader.status" class="my-3 clearfix">
      <small>Upload läuft...</small>
    <b-progress  :value="upload_loader.progress" max="100" show-progress animated></b-progress>
    </div>
    <div class="my-3">
        <b-alert v-if="showSuccess" variant="success" show>Profil update erfolgreich</b-alert>
        <b-alert class="mt-3" :show="upload_loader.text != ''" variant="success">{{upload_loader.text}}</b-alert>
    </div>
    <b-form  @submit.prevent class="mb-5">
    <input  type="file" size="50" accept="image/*" ref="myfile" style="display:none;" @change="onFileChange">
    <input  type="file" size="50" accept="image/*" ref="mybgfile" style="display:none;" @change="onBackgroundImageChange"> 
    <b-row>
        <b-col lg="6" sm="12">
          <b-card header-html="Titelbild">
            <b-card-body>
              Text
              <b-input-group class="mt-3 mb-3">
                <b-form-input v-model="this.titleimage.text"></b-form-input>
                <b-input-group-append>
                  <b-button variant="outline-info" @click="randomText()" name="titleimage_text"><i class="fa fa-refresh" aria-hidden="true"></i></b-button>
                </b-input-group-append>
              </b-input-group>
              Schriftfarbe
              <div class="my-2">
              <v-swatches v-model="userProfile.header_textcolor"  :show-border="true"  inline shapes="circles" swatch-size="30" background-color="transparent"></v-swatches>
              </div>
            </b-card-body>
          </b-card>
        </b-col>
        <b-col lg="6" sm="12" class="mt-3 mt-lg-0">
          <b-card header-html="Profil">
            <b-card-body>
              <label for="name">Benutzername</label>    
              <b-form-input v-model.trim="name" name="name" :placeholder="userProfile.name" id="name"></b-form-input>

            </b-card-body>
          </b-card>
        </b-col>  
    </b-row>
    <b-btn class="mt-5" variant="info" @click="updateProfile()">Profile speichern</b-btn>
    </b-form>

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
      titleimage: {
        text:''
      },
      avatar: '',
      backgroundImage: '',
      avatardata:'',
      showSuccess: false,
      userAvatar: undefined,
      sentences: [
        '„Ich bin gekommen, daß sie das Leben und volle Genüge haben sollen.“ —  Jesus von Nazareth',
        '„Ich bin in die Welt gekommen als ein Licht, damit, wer an mich glaubt, nicht in der Finsternis bleibe.“ —  Jesus von Nazareth',
        '„Es gibt keine größere Liebe, als wenn einer sein Leben für seine Freunde hingibt.“ —  Jesus von Nazareth',
        '„Ich bin gekommen, die Sünder zur Buße zu rufen und nicht die Gerechten.“ —  Jesus von Nazareth',
        '„Etliches fiel auf gutes Land und trug Frucht, etliches hundertfältig, etliches sechzigfältig, etliches dreißigfältig.“ —  Jesus von Nazareth',
        '„Ich bin der Weg und die Wahrheit und das Leben; niemand kommt zum Vater außer durch mich!“ —  Jesus von Nazareth'
      ],
    }
  },
  computed: {
    ...mapState(['userProfile', 'upload_loader'])
  },
  mounted(){
    if(this.userProfile.titleimage != 'undefined'){
      var chosenNumber = Math.floor(Math.random() * this.sentences.length);
      this.titleimage.text = this.sentences[chosenNumber]
    } else {
      this.titleimage.text = this.userProfile.titleimage.text
    }
    
  },
  methods: {
    randomText(){
      var chosenNumber = Math.floor(Math.random() * this.sentences.length);
      this.titleimage.text = this.sentences[chosenNumber]
    },
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
        titleimage_text:this.userProfile.titleimage != 'undefined' ? this.titleimage.text : this.userProfile.titleimage.text,
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
<style scoped>

</style>