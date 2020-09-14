<template>
<div id="dashboard">
 <b-row>

    <b-col sm="12" md="12" order-md="1" order-sm="2">
          <div class="create-post mt-4 mb-5 rounded" >
            <b-form @submit.prevent>
                  <b-row>
                    <b-col cols="3" sm="3" md="2">
                      <UserPanel></UserPanel>
                    </b-col>
                    <b-col cols="9" sm="9" md=10>
                      <textarea @click="setFocus()" :rows="textareaRows" class="textarea mb-3" style="width:100%;" v-model.trim="post.content" placeholder="Lass deiner Fantasie freien lauf...." v-on:input="watchVideoUrl"></textarea>
                    </b-col>
                  </b-row> 
              
                  <b-row class="my-3">
                    <b-col cols="12" md="2">
                      <b-img fluid v-if="imageurl" :src="imageurl" ></b-img>
                    </b-col>
                    <b-col cols="12" md="2">
                      <div class="mt-2"><b-btn size="sm" variant="danger" v-if="imageurl" @click="removeImage()">Bild entfernen</b-btn></div>
                    </b-col>
                  </b-row>  
                  <div class="my-4" v-if="imageurl != ''">
                    <b-progress :value="post_upload_loader.progress" variant="info" striped animated></b-progress>
                  </div>
                  <!-- ####################### Attachment System ######################## -->
                  <div  v-if="showAttachedLoader" class="d-flex justify-content-center my-2" >
                    <b-spinner small label="Loading..." class="mr-2" ></b-spinner>.... hole Informationen .....
                  </div>
      
                  <div v-if="post.attached.pagetyp == 'webpage'" >
                      <div class="p-2 border rounded position-relative" style="border-top:1px solid rgba(21,21,21,.09); background:rgba(21,21,21,.06)">
                      <b-row  >
                        <b-col cols="12" md="4">
                           <b-img fluid rounded :src="post.attached.image"></b-img>
                        </b-col>
                        <b-col cols="12" md="8">
                          <div class="mt-2">
                            <a  :href="post.attached.url"><h6>{{post.attached.title}}</h6></a>
                            <p>{{post.attached.description}}</p>
                            <b-btn class="float-right position-absolute" style="bottom:0; right:10px" size="sm" variant="danger" @click="post.attached = ''">Link entfernen</b-btn>
                          </div>
                        </b-col>
                      </b-row>
                      </div>
                  </div>

                  <div v-if="post.attached.pagetyp == 'youtube'" >
                      
                      <b-row  class="my-3">
                        <b-col cols="12" md="4">
                           <b-embed
                              type="iframe"
                              aspect="16by9"
                              :src="'https://www.youtube.com/embed/'+post.attached.video_id"
                            ></b-embed>
                        </b-col>
                        <b-col cols="12" md="8">
                          <div class="mt-2">
                            <!-- <a  :href="post.attached.url"><h6>{{post.attached.title}}</h6></a>
                            <p>{{post.attached.description}}</p> -->
                            <b-btn style="bottom:0; right:10px" size="sm" variant="danger" @click="post.attached = ''">Video entfernen</b-btn>
                          </div>
                        </b-col>
                      </b-row>
                     
                  </div>

                  <div v-if="post.attached.pagetyp == 'amazon'" >
                    <div class="p-2 border rounded position-relative" style="border-top:1px solid rgba(21,21,21,.09); background:rgba(21,21,21,.06)">
                      <b-row  >
                        <b-col cols="12" md="4">
                          <b-img fluid rounded :src="post.attached.img"></b-img>
                        </b-col>
                        <b-col cols="12" md="8">
                          <div class="mt-2">
                            <a  :href="post.attached.url"><h6>{{post.attached.title}}</h6></a>
                            <p>{{post.attached.description}}</p>
                            <b-btn class="float-right position-absolute" style="bottom:0; right:10px" size="sm" variant="danger" @click="post.attached = ''">Video entfernen</b-btn>
                          </div>
                        </b-col>
                      </b-row>
                      </div>
                  </div>

                  <div v-if="post.attached.pagetyp == 'pinterest'" >
                    <div class="p-2 border rounded position-relative" style="border-top:1px solid rgba(21,21,21,.09); background:rgba(21,21,21,.06)">
                                       <iframe
                              type="iframe"
                              style="width:227px; height:450px;"
             
                              :src="'https://assets.pinterest.com/ext/embed.html?id='+post.attached.pinid"
                              
                            frameborder="0" scrolling="no" ></iframe>
                            <b-btn class="float-right position-absolute" style="bottom:5px; right:10px" size="sm" variant="danger" @click="post.attached = ''">Pin entfernen</b-btn>
                      </div>
                  </div> 

                  <!-- ####################### Image File System ######################## -->
                  <input type="file" size="50" accept="image/*" ref="myfile" style="display:none;" @change="onFileChange">
                  <hr />
                  
                  <b-row class="mb-3" v-show="onFocus" >
                    <b-col md="9" sm="4" cols="12">
                      <b-btn size="sm"  variant="light"  @click="addFile()" :disabled="(post.attached != '') || (imageurl !== '')"><i class="fa fa-picture-o" aria-hidden="true"></i> Foto/Video</b-btn>
                    </b-col>
                    <b-col cols="12" class="d-block d-sm-none mt-2" ></b-col>
                    <b-col md="3" sm="4" cols="12" class="pull-right">
                    <b-form-select v-model="post.public" :options="options" size="sm"></b-form-select>
                 

                    </b-col> 
                  </b-row>
                

                  
                  <div>
                    <b-btn variant="info" @click="createPost()" :disabled="(post.content === '') && (post.attached === '') && (imageurl === '')" ><i class="fa fa-share-square-o" aria-hidden="true"></i> Beitrag teilen</b-btn>
                  </div>        
            </b-form>
            
          </div>

          <hr />

          <b-button-group>
                <b-button :variant="!showPublic ? 'info' : 'light'" @click="changePrivatePublic(true)"><i class="fa fa-user-secret" aria-hidden="true"></i> Meine Tagebucheinträge</b-button>
                <b-button :variant="showPublic ? 'info' : 'light'" @click="changePrivatePublic(false)"><i class="fa fa-globe" aria-hidden="true"></i> Öffentliche Einträge</b-button> 
          </b-button-group>


        <div v-if="posts.length" class="mt-4 ">
          <div v-for="post in posts" :key="post.id" >
            <div  class="post my-3 shadow-sm p-3 rounded position-relative">
            <div class="pr-2 pl-2 text-muted">
              <i class="fa fa-user-secret mr-2" v-if="!post.public" aria-hidden="true"></i>  
              <i class="fa fa-globe mr-2" v-if="post.public" aria-hidden="true"></i>  
              <h6 class="d-inline">

                <strong >{{ post.userName }} </strong>
                <span v-if="(post.attached.pagetyp == 'webpage')">hat einen Link gepostet </span>
                <span v-if="(post.attached.pagetyp == 'youtube')">hat ein Video gepostet </span>
                <span v-if="(post.attached.pagetyp == 'amazon')">hat ein Amazon Produkt gepostet </span>
                <span v-if="(post.attached.pagetyp == 'pinterest')">hat einen Pin gepostet </span>
                <span >{{ post.createdOn | formatDate }}</span>
                
              </h6>
            </div>
            
          <b-dropdown variant="link" no-caret dropleft class="pull-right position-absolute text-black" style="top:.5rem;right:.5rem" v-if="post.userId === userProfile.userid">
              <template v-slot:button-content>
                <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
              </template>
                    
              <b-dropdown-item  size="sm" @click="changePostStatus(post.id, !post.public)" v-if="post.userId === userProfile.userid">
                <span v-if="post.public"><i class="fa fa-user-secret" aria-hidden="true"></i> Privat machen</span>
                <span v-if="!post.public"><i class="fa fa-globe" aria-hidden="true"></i> Öffentlich machen</span>
              </b-dropdown-item>

              <b-dropdown-divider></b-dropdown-divider>  

              <b-dropdown-item @click="editPost(post)" v-if="post.userId === userProfile.userid"><i class="fa fa-pencil mr-1" aria-hidden="true"></i> Bearbeiten</b-dropdown-item>
              <b-dropdown-item @click="deletePost(post.id)" v-if="post.userId === userProfile.userid"><i class="fa fa-trash mr-1" aria-hidden="true"></i> Löschen</b-dropdown-item>
            </b-dropdown>

            <p class="pt-2" >{{post.content}}</p>


            <!-- Attachment System -->

                  <div v-if="post.attached.pagetyp == 'webpage'" >
                     
                      <div class="p-2 border rounded position-relative" style="border-top:1px solid rgba(21,21,21,.09); background:rgba(21,21,21,.06)">
                      <b-row  >
                        <b-col cols="12" md="4">
                           <b-img fluid rounded :src="post.attached.image"></b-img>
                        </b-col>
                        <b-col cols="12" md="8">
                          <div class="mt-2">
                            <a  :href="post.attached.url"><h6>{{post.attached.title}}</h6></a>
                            <p>{{post.attached.description}}</p>
                           
                          </div>
                        </b-col>
                      </b-row>
                      </div>
                     
                  </div>
                  <div v-if="post.attached.pagetyp == 'youtube'" >
                            <b-embed
                              type="iframe"
                              aspect="16by9"
                              :src="'https://www.youtube.com/embed/'+post.attached.video_id"
                              
                            ></b-embed>
                            <!-- <div class="p-2 px-3" style="background:rgba(21,21,21,.95)">
                              <h6><a class="text-white" :href="post.attached.url">{{post.attached.title}}</a></h6>
                              <p class="text-muted">{{post.attached.description}}</p>
                            </div> -->
                  </div>
                  <div v-if="post.attached.pagetyp == 'amazon'" >
                    <div class="p-2 border rounded position-relative" style="border-top:1px solid rgba(21,21,21,.09); background:rgba(21,21,21,.06)">
                      <b-row  >
                        <b-col cols="12" md="4">
                          <b-img fluid rounded :src="post.attached.img"></b-img>
                        </b-col>
                        <b-col cols="12" md="8">
                          <div class="mt-2">
                            <a  :href="post.attached.url"><h6>{{post.attached.title}}</h6></a>
                            <p>{{post.attached.description}}</p>
                           
                          </div>
                        </b-col>
                      </b-row>
                      </div>
                  </div> 
                  <div v-if="post.attached.pagetyp == 'pinterest'" >
                    <div class="p-2 border rounded position-relative" style="border-top:1px solid rgba(21,21,21,.09); background:rgba(21,21,21,.06)">
                        <b-embed
                        :src="'https://assets.pinterest.com/ext/embed.html?id='+post.attached.pinid"
                        ></b-embed>
                      </div>
                  </div> 

            <b-img-lazy fluid-grow  :src="post.image"  blank-color="#cfd8dc" blank-width="1024" blank-height="768"></b-img-lazy>

            <div class="post-actions">
                <b-button variant="link" size="sm" @click="toggleComment(post)"><i class="fa fa-comments" aria-hidden="true"></i>   {{ post.comments }}</b-button>
                <b-button variant="link" size="sm" @click="likePost(post.id, post.likes)"><i class="fa fa-thumbs-up" aria-hidden="true"></i> {{ post.likes }}</b-button>
              
            </div>
          

            <b-card v-if="showCommentSection == post.id" class="mt-3">
            <b-btn size="sm" @click="close()" style="position:absolute; right:1em;z-index:1000"><i class="fa fa-caret-up" aria-hidden="true"></i></b-btn>
            
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
          <p class="no-results mt-3">Es gibts zur Zeit keine Einträge.</p>
          </div>
        </div>

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
import UserPanel from '@/components/UserPanel'
// import FriendList from '@/components/FriendList'
import * as fb from '../firebase'


export default {
  components: {
    CommentModal,
    UserPanel,
    // FriendList

  },
  metaInfo() {
    return {
      title: "Dashboard"
    };
  },
  data() {
    return {
      textareaRows:1,
      onFocus: false,
      post: {
        content: '',
        image:'',
        youtubeid: '',
        public:false,
        attached: false
      },
      lazyloadimgsrc:'https://via.placeholder.com/1200x768.png?text=PrayBook',
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
      showAttachedLoader: false,
      editPostObj: '',
      options: [
          { value: true, text: 'Öffentlich' },
          { value: false, text: 'Privat' },

        ]
   
    }
  },
  watch: {
    childArray: {      
        handler (newData) {        
          this.currentArray = newData
        }
       
      }     
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
    setLostFocus(){
      this.onFocus = false
      this.textareaRows = 1
    },
    setFocus(){
      this.onFocus = true
      this.textareaRows = 4
    },
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
          const regex = /(https?:[^\s]+)/;

          if(this.post.content.match(regex)){
              this.post.attached = ''
              this.post.youtubeid = ''
              const url = this.post.content.match(regex)[0]
              let newtext =  this.post.content.replace(url,'')
              
              if(url && !this.post.attached){
                  this.showAttachedLoader= true
                 fetch("https://urlinfo.cabcom13.de/?u="+url)
                .then(response => response.json())
                .then(data => {
                  this.showAttachedLoader= false
                  this.post.attached = data
                  if(this.post.attached.pagetyp == 'youtube'){
                    this.post.youtubeid = this.post.attached.video_id
                  }
                })               
              }           
              this.post.content = newtext  
          }
    },
    // watchVideoUrl:function(){
    //   let youtube_video_reg = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w-_]+)/i
    //   if(this.post.youtubeid == ''){
    //     if(this.post.content.match(youtube_video_reg)){
    //       this.post.youtubeid = this.youtubeid(this.post.content)
          
    //       let youtube_video_reg = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w-_]+)/i
    //       let newtext =  this.post.content.replace(youtube_video_reg,'')
    //       this.post.content = newtext
    //     } else {
    //       this.post.youtubeid = ''
    //     }
    //   }
    //   //
        
    // },
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
      this.post.attached = ''
      this.setLostFocus()

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
.dropdown-toggle .fa{
  color:#212121;
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
