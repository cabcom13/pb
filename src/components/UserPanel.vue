<template>
 <div>
   <div class="position-relative ">
      <div class="mb-5 avatar-card row align-items-center h-100 mx-0" v-bind:style="{ 'background-image': 'url(' + userProfile.backgroundImage + ')', 'background-color': this.background_color, backgroundSize: 'cover' }">
        <div class="mx-auto text-center text-white px-3 zite" :contenteditable="contenteditable" :style="{color: userProfile.header_textcolor}">
            <p v-text=" sentence_picker "></p>
            
        </div>
      </div>
      <a v-if="!hideTrigger" class="position-absolute avatar text-center text-white " @click="triggerModal()" > <i class="fa fa-4x fa-pencil" aria-hidden="true"></i></a>
      <b-button v-if="showImageSwitch" @click="addBackgroundImage()"  class="position-absolute" style="bottom:1em; right:1em;"><i class="fa fa-picture-o" aria-hidden="true"></i></b-button>
      <div v-if="showUserImage"  @click="triggerModal()" class="position-absolute avatar-change avatar avatar-2x text-center text-white " :style="{backgroundImage:'url('+userProfile.avatar+')', backgroundSize:'cover', backgroundPosition: 'center center'}">
   

      </div>
      
   </div>
  </div>

 
        
</template>

<script>
import { mapState, store } from 'vuex'

export default {
  props: ['hideTrigger', 'showImageSwitch', 'showUserImage', 'contenteditable'],
  components: {
   
  },
  data(){
    return {
        
        sentences: [
          '„Ich bin gekommen, daß sie das Leben und volle Genüge haben sollen.“ —  Jesus von Nazareth',
          '„Ich bin in die Welt gekommen als ein Licht, damit, wer an mich glaubt, nicht in der Finsternis bleibe.“ —  Jesus von Nazareth',
          '„Es gibt keine größere Liebe, als wenn einer sein Leben für seine Freunde hingibt.“ —  Jesus von Nazareth',
          '„Ich bin gekommen, die Sünder zur Buße zu rufen und nicht die Gerechten.“ —  Jesus von Nazareth',
          '„Etliches fiel auf gutes Land und trug Frucht, etliches hundertfältig, etliches sechzigfältig, etliches dreißigfältig.“ —  Jesus von Nazareth',
          '„Ich bin der Weg und die Wahrheit und das Leben; niemand kommt zum Vater außer durch mich!“ —  Jesus von Nazareth'
        ],
        colors:[
          '#3f51b5',
          '#8e24aa',
          '#ff5722',
          '#009688',
          '#388e3c'
        ]
    

        
    }
  },

  computed: {
    ...mapState(['userProfile']),
    sentence_picker(){
      
      if(this.userProfile.titleimage != 'undefined'){
        return  this.userProfile.titleimage.text
      } else {
        var chosenNumber = Math.floor(Math.random() * this.sentences.length);
        return this.sentences[chosenNumber];
        
      }

    },
    background_color(){
      var chosenNumber = Math.floor(Math.random() * this.colors.length);
      return this.colors[chosenNumber];
    }
  },

  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
    triggerModal(){
      this.$emit('triggerModal')
    },
    addBackgroundImage(){
      this.$emit('addBackgroundImage')    
    }


  },
  filters: {
    
    initial(val){
      return  `${val.charAt(0)}`
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-card{
  background-color: transparent;
  background-position: center center;
  background-repeat: no-repeat;
  background-size:cover;
  min-height:55vH;
  width:100%;

  overflow: hidden;

}
.zite{
  @media (max-width: 575.98px) {
      font-size:1rem;
      padding-bottom:3rem;
  }
  opacity: .85;
  color:rgba(255,255,255,.8);
  font-size:1.5rem;
  letter-spacing: .08;
  word-wrap: break-word;
  }
.avatar-2x{
  height:12em!important;
  width:12em!important;
  bottom: -7em !important;
  @media (max-width: 575.98px) { 
  height:8em!important;
  width:8em!important;
  bottom: -4em !important;
  }
}
.avatar-change{
  &:active {
     &::after{
        content:' ';
        padding-top:5em;
        position: absolute;
        z-index:300;
     }
  }
    &:hover{

      &::after{
        content:' ';
        padding-top:5em;
        position: absolute;
        z-index:300;
        background-color:rgba(21,21,21,.7);   
      }
    }



}
.avatar{
 
  
  .fa{
      margin-top:.43em;
      color:#fff;
  }
  height:8em;
  width:8em;
  bottom: -4em ;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  border:6px solid  rgb(240,240,240);
  border-radius: 50%;
  background:#616161;
  transition: background 0.1s ease;
  &:hover {
    background: #558b2f;
    cursor: pointer;

  }
  &:active {
    background:#616161;
  }

  &::after{
    -webkit-box-shadow: inset 0px 1px 38px -26px rgba(0,0,0,1);
    -moz-box-shadow: inset 0px 1px 38px -26px rgba(0,0,0,1);
    box-shadow: inset 0px 1px 38px -26px rgba(0,0,0,1);
      content:'';
      position: absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      border-radius: 50%;
      z-index: 100;
  }
}


</style>