<template>
  <div id="dashboard">

 <b-row>

    <b-col  sm="12" md="12">
<!-- <iframe src="https://assets.pinterest.com/ext/embed.html?id=985231156172417" height="415" width="236" frameborder="0" scrolling="no" ></iframe> -->
          <div class="create-post mt-4 mb-5 rounded" >

            <b-form @submit.prevent>
              <textarea class="textarea mb-3" style="width:100%;border:none;" v-model.trim="post.content" placeholder="Lass deiner Fantasie freien lauf...." v-on:input="watchVideoUrl"></textarea>
                  <div>
                    <b-img style="width:150px;" v-if="imageurl" :src="imageurl" ></b-img>
                    <div class="mt-2"><b-btn size="sm" variant="danger" v-if="imageurl" @click="removeImage()">Bild entfernen</b-btn></div>
                  </div>  

                  <div v-if="this.post.youtubeid" style="border-top:1px solid rgba(21,21,21,.09);border-bottom:1px solid rgba(21,21,21,.09);padding:.4rem 0;">
                    
                    <small >Dieses Video wurde im Text gefunden</small>
                    <div style="width:210px;" class="mb-2">
                      
                      <b-embed
                        type="iframe"
                        aspect="16by9"
                        :src="'https://www.youtube.com/embed/'+this.post.youtubeid"
                        
                      ></b-embed>
                      <b-btn size="sm" variant="danger" @click="clearVideo()">Video entfernen</b-btn>
                    
                    </div>
                  </div>
                  <input type="file" size="50" accept="image/*" ref="myfile" style="display:none;" @change="onFileChange">
                  <hr />
                  <b-row class="mb-3">
                    <b-col md="2" sm="4" cols="4">
                      <b-btn size="sm"  variant="light"  @click="addFile()" :disabled="(showpreviewvideo != '') || (imageurl !== '')" v-b-tooltip.hover title="Füge ein Foto zu deinem Beitrag hinzu"><b-icon icon="card-image"  ></b-icon> Foto/Video</b-btn>
                    </b-col>
                    <b-col md="3" sm="4" cols="4">
                      <b-form-checkbox v-model="post.public" name="check-button" switch class="mt-1 pointer" v-b-tooltip.hover title="Alle Benutzer können diesen Post sehen">
                            <small>Öffentlicher Post </small>
                      </b-form-checkbox>
                    </b-col> 
                  </b-row>
                
                <div class="my-4">
                  <b-progress :value="post_upload_loader.progress" variant="info" striped animated></b-progress>
                </div>
                <div>
                  <b-button variant="primary" block @click="createPost()" :disabled="(post.content === '') && (post.youtubeid === '') && (imageurl === '')" >Beitrag teilen</b-button>
                </div>        

            </b-form>
            
          </div>
          <hr />
          <b-button-group>
                <b-button :variant="!showPublic ? 'info' : 'light'" @click="changePrivatePublic(true)">Meine Tagebucheinträge</b-button>
                <b-button :variant="showPublic ? 'info' : 'light'" @click="changePrivatePublic(false)">alle öffentlichen Tagebucheinträge</b-button> 
          </b-button-group>



        <div v-if="posts.length" class="mt-4">
          <div v-for="post in posts" :key="post.id" >
            <div  class="post my-3 shadow-sm p-3 rounded">
           
           <div class="float-right">
              <b-badge variant="warning" pill v-if="post.public"><b-icon icon="unlock"></b-icon> Öffentlich</b-badge>
              <b-badge variant="primary" pill v-if="!post.public"><b-icon icon="lock"></b-icon>  Privat</b-badge>
             </div>
           <h6 class="text-muted text-light">
             <!--  -->

            <strong v-if="!showPublic">Du </strong>
            <strong v-if="showPublic">{{ post.userName }} </strong>
            <span v-if="(post.content != '') && (post.image =='') && (showPublic)">schreibt </span>
            <span v-if="(post.content != '') && (post.image =='') && (!showPublic)">schreibst </span>
            <span v-if="(post.content == '') && (post.image !='')">postet ein Bild </span>
            <span v-if="(post.content == '') && (post.image =='') && (post.youtubeid != '')">hat ein Video gepostet </span>
            <span >{{ post.createdOn | formatDate }}</span>
            
            </h6>
            <p class="pt-2" style="font-size:1.4em">{{post.content}}</p>

            <b-img fluid :src="post.image" ></b-img>
 
            <b-embed
            type="iframe"
            aspect="16by9"
            :src="'https://www.youtube.com/embed/'+post.youtubeid"
            v-if="post.youtubeid"
          ></b-embed>
        
              <div class="post-actions">
                <b-button variant="link" size="sm" @click="toggleComment(post)"><b-icon icon="chat-fill" aria-hidden="true"></b-icon> {{ post.comments }}</b-button>
                <b-button variant="link" size="sm" @click="likePost(post.id, post.likes)"><b-icon icon="hand-thumbs-up" aria-hidden="true"></b-icon> {{ post.likes }}</b-button>
                <b-button variant="link" size="sm" @click="changePostStatus(post.id, !post.public)" v-if="post.userId === userProfile.userid">
                  <span v-if="post.public"><b-icon icon="lock"></b-icon> Privat machen</span>
                  <span v-if="!post.public"><b-icon icon="unlock"></b-icon>Öffentlich machen</span>
                </b-button>
                <b-btn variant="link" size="sm" @click="editPost(post)" v-if="post.userId === userProfile.userid"><b-icon icon="pencil"></b-icon> Bearbeiten</b-btn>
                <b-btn class="float-right text-danger" variant="link" size="sm" @click="deletePost(post.id)" v-if="post.userId === userProfile.userid"><b-icon icon="trash"></b-icon></b-btn>

            </div>
            
          

            <b-card v-if="showCommentSection == post.id" class="mt-3">
              <b-btn size="sm" @click="close()" style="position:absolute; right:1em;z-index:1000"><b-icon icon="chevron-compact-up"></b-icon></b-btn>
            <CommentModal  :post="post" :user="userProfile" @update="toggleComment(post)"></CommentModal>
            
           
            <h6>{{comments.length}} Kommentar</h6>

              <div v-if="showCommentsLoader" class="d-flex justify-content-center mb-3" >
                <b-spinner label="Loading..." ></b-spinner>
              </div>

            <div v-show="comments.length" class="comments">
             
              <div v-for="comment in comments" :key="comment.id" class="comment my-3" >
                <b-container>
                <b-row class="py-2">
                    <b-col cols="2" md="1" class="px-0"><b-img fluid rounded :text="comment.userName  | initial" :src="comment.avatar"></b-img></b-col>
                    <b-col cols="10" md=11>
                      <div class="comment-bubbel py-1 px-2 rounded">
                      <p><strong>{{ comment.userName }}</strong> {{ comment.content }}</p>
                      
                      </div>
                      
                     <div>
                      <small class="text-muted"> {{ comment.createdOn | formatDate }}</small>
                      <b-btn variant="link" size="sm" class="float-right text-danger" @click="deleteComment(comment.id,post)" v-if="comment.userId === userProfile.userid">Kommentar löschen</b-btn>
                     </div>
                    </b-col>
                </b-row>
                </b-container>
              </div>
            </div> 
            
            <div v-show="!comments.length && !showCommentsLoader" class="comments">
                es gibt noch keine Kommentare hier :/
            </div>

          </b-card>

          </div>
        </div>
        </div>
        <div v-else>
          <div  class="post my-3 shadow-sm p-3 rounded">
          <p class="no-results">Es gibts zur Zeit keine Einträge.</p>
          </div>
        </div>

    </b-col>
    <b-col md="2"  sm="12">
          
 
    </b-col>
  </b-row>


<b-modal id="modal-1" size="xl" title="Beitrag bearbeiten" @ok="updatePost">
    <b-form>

            <b-textarea label="Posttext" placeholder="lass deiner Fantasie freien lauf ...." v-model="editPostObj.content"></b-textarea>
            <b-img style="width:150px;" class="mt-4" :src="editPostObj.image" ></b-img>
            <div class="mt-2"><b-btn size="sm" variant="danger" v-if="editPostObj.image" @click="editPostObj.image=''">Bild entfernen</b-btn></div>

            <div v-if="editPostObj.youtubeid != ''" style="border-top:1px solid rgba(21,21,21,.09);border-bottom:1px solid rgba(21,21,21,.09);padding:.4rem 0;">
              
             
              <div style="width:210px;" class="mb-2">
                
                <b-embed
                  type="iframe"
                  aspect="16by9"
                  :src="'https://www.youtube.com/embed/'+editPostObj.youtubeid"
                  
                ></b-embed>
                <b-btn size="sm" variant="danger" @click="editPostObj.youtubeid = ''">Video entfernen</b-btn>
              
              </div>
            </div>


    </b-form>

</b-modal>


  </div>
</template>

<script>
import { commentsCollection, usersCollection } from '@/firebase'
import { mapState } from 'vuex'
import moment from 'moment'
import CommentModal from '@/components/CommentModal'
import * as fb from '../firebase'


export default {
  components: {
    CommentModal

  },
  metaInfo() {
    return {
      title: "Dashboard"
    };
  },
  data() {
    return {
      post: {
        content: '',
        image:'',
        youtubeid: '',
        public:false
      },
 
      selectedPost: {},
      showPostModal: false,
      fullPost: {},
      postComments: [],
      showCommentLoader :false,
      imageurl:'',
      imageData: {},
      showpreviewvideo:'',
      showPublic:false,
      showCommentSection: false,
      editPostObj: ''
   
    }
  },
  watch: {

  },
  created () {
    moment.locale("de");
    this.$store.dispatch('loadPrivatePosts')
    
  },
  mounted(){
    
  },
  computed: {
    ...mapState(['userProfile', 'posts', 'post_upload_loader', 'comments', 'showCommentsLoader'])

  },
  methods: {
    updatePost(){
        //dispatch here
        this.$store.dispatch('updatePost',this.editPostObj )
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
    },
    editPost(post){
      this.$bvModal.show('modal-1')
      this.editPostObj =  Object.assign({},post)
    },
    changePrivatePublic(status){
      this.showPublic = !status
      if(status){
        this.$store.dispatch('loadPrivatePosts')
      } else {
        this.$store.dispatch('loadPublicPosts')
      }
      
    },
    clearVideo: function(){
        this.post.youtubeid = ''
    },
    watchVideoUrl:function(){
      let youtube_video_reg = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w-_]+)/i
      if(this.post.youtubeid == ''){
        if(this.post.content.match(youtube_video_reg)){
          this.post.youtubeid = this.youtubeid(this.post.content)
          
          let youtube_video_reg = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w-_]+)/i
          let newtext =  this.post.content.replace(youtube_video_reg,'')
          this.post.content = newtext
        } else {
          this.post.youtubeid = ''
        }
      }
      //
        
    },
    youtubeid: function(url){
        var ID = '';
        url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if(url[2] !== undefined) {
          ID = url[2].split(/[^0-9a-z_-]/i);
          ID = ID[0];
        } else {
          ID = url.toString();
        }
          return ID;
      },
    scanMessage: function (message) {

      if(this.youtubeid(message)){
          let youtube_video_reg = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w-_]+)/i
          let newtext =  message.replace(youtube_video_reg,'')
            
            this.post.youtubeid = this.youtubeid(message)
            this.post.content = newtext.split('&')[0]
            
            // return {
            //   text:newtext.split('&')[0],
            //   videosrc:'https://www.youtube.com/embed/'+ this.youtubeid(message)
            // }  
      
      } else {
        this.post.youtubeid = this.youtubeid(message)
        this.post.content =  message
        // return {text: message, videosrc:''}
      }
    
    },
    removeImage(){
      this.post.image  = {} 
      this.imageurl = ''
    },

    addFile(){
        const elem = this.$refs.myfile
        elem.click()
     
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.post.image = file
      if(file){
        this.imageurl = URL.createObjectURL(file);
      }
      

   
    },

    deletePost(postid){
      this.$confirm("Soll dieser Eintrag gelöscht werden?", '','question').then(() => {
        this.$store.dispatch('deletePost', { postid: postid}) 
      });
    },
    changePostStatus(postid, status){
        this.$store.dispatch('changePostStatus', { postid: postid, status:status }) 
        this.changePrivatePublic(!status)
    },
    createPost() {

      this.$store.dispatch('createPost', { content: this.post })
      this.post.content = ''
      this.post.image  = ''
      this.imageurl = ''
      this.post.youtubeid = ''
      this.post.public = false


    },
    deleteComment(comemntid, post){
      this.$confirm("Soll dieser Kommentar gelöscht werden?", '','question').then(() => {
        this.$store.dispatch('deleteComment', {commentid:comemntid, post: post, count:post.comments}) 
       
      });
    },
    toggleComment(post) {
        this.$store.dispatch('loadPostComments', post)
        this.showCommentSection = post.id
    },
    close(){
        this.showCommentSection = ''
    },
    likePost(id, likesCount) {
      this.$store.dispatch('likePost', { id, likesCount })
    },


  },
  filters: {
    formatDate(val) {
      if (!val) { return '-' }

      let date = val.toDate()
      return moment(date).fromNow()
    },
    trimLength(val) {
      if (val.length < 200) { return val }
      return `${val.substring(0, 200)}...`
    },
    initial(val){
      return  `${val.charAt(0)}`
    }
  }
}
</script>

<style lang="scss" scoped>
.comment{
  .comment-bubbel{
    background:#f2eff7;
    border:1px solid #ebe6f3;

  }
}

.text-light{
  font-weight: 100;
}
.post {
  background:#fff;
}
.create-post {
  padding:1rem;
  background:#fff;
}
.post-actions{
  color:#212121!important;
}
.textarea{
 border: none;
    background-color: transparent;
    resize: none;
    outline: none;
}
.pointer{
  cursor: pointer;
}
</style>
