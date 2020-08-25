<template>
  <div>
    
    <b-form style="position:relative;">
        <h6>Schreibe einen Kommentar</h6>

 <b-input-group class="my-4">
    <b-input-group-prepend class="mr-3">
      <b-avatar size="2.3rem" square class="rounded" :src="user.avatar" :text="user.name.charAt(0)"></b-avatar>
    </b-input-group-prepend>

    <b-input  v-model.trim="comment" placeholder="Lass deiner Fantasie freien lauf...."></b-input>

    <b-input-group-append>
     <b-button variant="info" @click="addComment()" :disabled="comment === ''"><b-icon icon="check2"></b-icon></b-button>
    </b-input-group-append>
  </b-input-group>
        
        


    </b-form>
    <hr />
  </div>
</template>

<script>
import { commentsCollection, postsCollection, auth } from '@/firebase'

export default {
  props: ['post', 'user'],
  data() {
    return {
      comment: '',
      imageurl:'',
      images:[]
    }
  },
   mounted() {
    

  },
  methods: {
    close(){
      this.$emit('close')
    },
    addFile(){
        const elem = this.$refs.myfile
        elem.click()
     
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.imageurl = URL.createObjectURL(file);
   
    },
    async addComment() {
      // create comment
      await commentsCollection.add({
        createdOn: new Date(),
        content: this.comment,
        postId: this.post.id,
        userId: auth.currentUser.uid,
        userName: this.$store.state.userProfile.name,
        avatar:''

      })

      // update comment count on post
      await postsCollection.doc(this.post.id).update({
        comments: parseInt(this.post.comments) + 1
      })
      this.comment = ''
      // close modal
      
      this.$emit('update')
    }
  }
}
</script>

<style scoped>
.p-0{
    padding-right:0;
    padding-left:0;
}
.textarea{
 border: none;
    background-color: transparent;
    resize: none;
    outline: none;
}
</style>
