<template>
 <div>
   <div class="position-relative ">
      <div class="mb-5 avatar-card row align-items-center h-100 mx-0" v-bind:style="{ 'background-image': 'url(' + userProfile.headerimage + ')', 'background-color': this.background_color }">
        <div class="mx-auto text-center text-white px-3 zite">
            {{sentence_picker}}
        </div>
      </div>
      <a class="position-absolute avatar text-center text-white " @click="triggerModal()" > <i class="fa fa-4x fa-pencil" aria-hidden="true"></i></a>
   </div>
  </div>

 
        
</template>

<script>
import { mapState, store } from 'vuex'

export default {
  props: {
    
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
  components: {

  },
  computed: {
    ...mapState(['userProfile']),
    sentence_picker(){
      var chosenNumber = Math.floor(Math.random() * this.sentences.length);
      return this.sentences[chosenNumber];
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
  min-height:35vH;
  width:100%;

  overflow: hidden;
  border-bottom-left-radius: 1em;
  border-bottom-right-radius: 1em;
    @media (max-width: 575.98px) {
      min-height:40vH;
      border-bottom-left-radius: 0em;
      border-bottom-right-radius: 0em;
  }
}
.zite{
  @media (max-width: 575.98px) {
      font-size:1.2rem;

  }
  opacity: .85;
  color:rgba(255,255,255,.8);
  font-size:1.5rem;
  letter-spacing: .08;
  word-wrap: break-word;
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