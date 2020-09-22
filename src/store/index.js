import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'
import VueSimpleAlert from "vue-simple-alert";
import VueToast from 'vue-toast-notification';
// Import one of available themes
import 'vue-toast-notification/dist/theme-default.css';
//import 'vue-toast-notification/dist/theme-sugar.css';
 
Vue.use(VueToast);
Vue.use(VueSimpleAlert);
Vue.use(Vuex)

// realtime firebase
// fb.postsCollection.where("public", "in",[true]).orderBy('createdOn', 'desc').onSnapshot(snapshot => {
//   let postsArray = []

//   snapshot.forEach(doc => {
//     let post = doc.data()
//     post.id = doc.id

//     postsArray.push(post)
//   })

//   store.commit('setPosts', postsArray)
// })

const store = new Vuex.Store({
  state: {
    userProfile: {},
    posts: [],
    error:'',
    upload_loader:{
      status:false,
      progress:0,
      text:''
    },
    post_upload_loader:{
      status:false,
      progress:0,
      text:''
    },
    comments:[],
    showCommentsLoader: false

    
  },
  mutations: {
    setCommentsLoader(state, val){
      state.showCommentsLoader = val
    },
    setComments(state, val){
      state.comments = val
    },
    setPostUploadLoader(state, val){
      state.post_upload_loader = val
    },
    setUploadLoader(state, val){
      state.upload_loader = val
    },
    setError(state, val) {
      state.error = val
    },
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setPerformingRequest(state, val) {
      state.performingRequest = val
    },
    setPosts(state, val) {
      state.posts = val
    }
  },
  actions: {
    async loadPostComments({commit}, post){
      commit('setCommentsLoader', true)
      commit('setComments', [])
      await fb.commentsCollection.where('postId', '==', post.id).orderBy("createdOn", 'desc').get().then(function(docs){
        let test = []
  
        docs.forEach(doc => {
          
          let comment = doc.data()
          comment.id = doc.id
  
          test.push(comment)
          test.forEach(function(item){
            fb.fs.ref('userimages/'+`${item.userId}`).getDownloadURL().then((downloadURL) => {
                item.avatar = downloadURL
            })
          })
          
        })
        commit('setCommentsLoader', false)
        commit('setComments', test)
      })
           



    },
    async loadPrivatePosts({ dispatch,  commit }) {
        // realtime firebase

        const userid = fb.auth.currentUser.uid

        await fb.postsCollection.where("public", "in",[false, true]).where('userId', "==", userid).orderBy('createdOn', 'desc').onSnapshot(snapshot => {
          let postsArray = []    
          snapshot.forEach(doc => {
            let data = {}
            let post = doc.data()
            post.id = doc.id

            postsArray.push({
              attached: Object.assign({}, post.attached),
              comments: post.comments,
              content: post.content,
              createdOn: post.createdOn,
              id: post.id,
              image: post.image,
              likes: post.likes,
              public: post.public,
              userId: post.userId,
              userName: post.userName,
              youtubeid: post.youtubeid
            })
          })
        
          commit('setPosts', postsArray)
        })
    },
    async loadPublicPosts({ dispatch,  commit }) {
      // realtime firebase

      const userid = fb.auth.currentUser.uid
      
      
      await fb.postsCollection.where("public", "in",[true]).orderBy('createdOn', 'desc').onSnapshot(snapshot => {
        let postsArray = []

        snapshot.forEach(doc => {
          let post = doc.data()
          post.id = doc.id

          postsArray.push({
            attached: Object.assign({}, post.attached),
            comments: post.comments,
            content: post.content,
            createdOn: post.createdOn,
            id: post.id,
            image: post.image,
            likes: post.likes,
            public: post.public,
            userId: post.userId,
            userName: post.userName,
            youtubeid: post.youtubeid
          })
        })

        commit('setPosts', postsArray)
      })
  },
     async login({ dispatch,  commit }, form) {
      // sign user in
 
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password).catch((error) => {
      commit('setError', error) 
    })

      if(user != undefined){
        commit('setError', '')
        dispatch('fetchUserProfile', user)
      }
    },
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

      // create user object in userCollections
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
        title: form.title,
        avatar: ''
      })
      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()
      let userdata = userProfile.data()
      userdata.userid = user.uid

      // set user profile in state
      commit('setUserProfile', userdata )

      // change route to dashboard
      if (router.currentRoute.path === '/login') {
        router.push('/')
      }
    },
    async logout({ commit }) {
      // log user out
      await fb.auth.signOut()

      // clear user data from state
      commit('setUserProfile', {})

      // redirect to login view
      router.push('/login')
    },

    async updatePost({commit}, post){

      // update post likes count
      fb.postsCollection.doc(post.id).update({
        content: post.content,
        image: post.image,
        youtubeid: post.youtubeid
      }).then(function() {
        Vue.prototype.$toast.info("Dieser Eintrag wurde erfolgreich bearbeitet")
      })


    },
    async deletePost({ dispatch }, post){

      fb.postsCollection.doc(post.postid).delete().then(function() {
        Vue.prototype.$toast.success("Eintrag wurde erfolgreich entfernt!")
      }).catch(function(error) {
        Vue.prototype.$alert(error,'', 'error' )
      });
    },
    async changePostStatus({ dispatch }, post){
      // update post likes count
      fb.postsCollection.doc(post.postid).update({
        public: post.status
      }).then(function() {
        if(post.status){
          Vue.prototype.$toast.info("Dieser Eintrag ist nun öffentlich und für allen Benutzern sichtbar")
        } else {
          Vue.prototype.$toast.info("Dieser Eintrag ist nun Privat und nur für dich sichtbar")
        }
        
      })

    },
    async deleteComment({ dispatch }, data) {

      fb.commentsCollection.doc(data.commentid).delete().then(function() {
        //decrese counter in Post
        fb.postsCollection.doc(data.post.id).update({
          comments: data.count - 1
        }).then(function() {
          
          dispatch('loadPostComments', data.post)
        })
        Vue.prototype.$toast.success("Eintrag wurde erfolgreich entfernt!")
        // Vue.prototype.$alert("Eintrag wurde erfolgreich entfernt!", '','success')
       

      }).catch(function(error) {
        Vue.prototype.$alert(error,'', 'error' )
      });
  
    },

    
    async createPost1({ state, commit }, post) {
console.log(post.content.attached.title)
    },
    async createPost({ state, commit }, post) {
      const text = post.content.content
      const image = post.content.image
      const youtubeid = post.content.youtubeid
      const publicpost = post.content.public
      const imageurl = ''

      //create post in firebase
      const doc = await fb.postsCollection.add({
        createdOn: new Date(),
        content: text,
        youtubeid:youtubeid,
        public:publicpost,
        image: '',
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.name,
        comments: 0,
        likes: 0,
        attached:  post.content.attached
      })
  
      //upload image here
 
      if(image instanceof Blob){
        commit('setPostUploadLoader',{
          status:true,
          progress:0
        })

        var uploadTask =  fb.fs.ref('postimages/'+`${image.name}`).put(image)
        uploadTask.then(response => {
          response.ref.getDownloadURL().then((downloadURL) => {
            let image = downloadURL

            if (doc.exists) { return }
            doc.update({
              image: image
            }) 
            
            commit('setPostUploadLoader',{
              status:false,
              progress:0,
              text:''
            })
          }) 

        });

        uploadTask.on('state_changed',
          function(snapshot) {
            // onProgress
            let percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log(percent)
            commit('setPostUploadLoader',{
              status:true,
              progress:percent,
              text:''
            })

          },
          // Error function
          function(e) {
            commit('setPostUploadLoader',{
               status:false,
               progress:0,
               text:e
             }) 
          },
          // onComplett
          function() {
            Vue.prototype.$toast.success("Bild upload erfolgreich!")
             commit('setPostUploadLoader',{
                status:false,
                progress:0,
                text:''
              }) 

              setTimeout(() => {
                commit('setPostUploadLoader',{
                  status:false,
                  progress:0,
                  text:''
                }) 
              }, 4000)
          })

      }
    },

    async likePost ({ commit }, post) {
      const userId = fb.auth.currentUser.uid
      const docId = `${userId}_${post.id}`

      // check if user has liked post
      const doc = await fb.likesCollection.doc(docId).get()
      if (doc.exists) { return }

      // create post
      await fb.likesCollection.doc(docId).set({
        postId: post.id,
        userId: userId
      })

      // update post likes count
      fb.postsCollection.doc(post.id).update({
        likes: post.likesCount + 1
      })
    },

    async updateProfileImage({ dispatch,commit }, image) {
      const userId = fb.auth.currentUser.uid

      if(image instanceof Blob){
        commit('setUploadLoader',{
          status:true,
          progress:0
        })
        
        var uploadTask = fb.fs.ref('userimages/'+`${userId}`).put(image)
        uploadTask.then(response => {
          response.ref.getDownloadURL().then((downloadURL) => {

                  // update user object
                const userRef = fb.usersCollection.doc(userId).update({
                  avatar: downloadURL
                })
                dispatch('fetchUserProfile', { uid: userId })
          })             
        });

        uploadTask.on('state_changed',
          function(snapshot) {
            // onProgress
            let percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            commit('setUploadLoader',{
              status:true,
              progress:percent,
              text:''
            })

          },
          // Error function
          function(e) {
            commit('setUploadLoader',{
               status:false,
               progress:0,
               text:e
             }) 
          },
          // onComplett
          function() {
             commit('setUploadLoader',{
                status:false,
                progress:0,
                text:'Profilbild gespeichert!'
              }) 

              setTimeout(() => {
                commit('setUploadLoader',{
                  status:false,
                  progress:0,
                  text:''
                }) 
              }, 4000)
          })
      }


    },
    async updateProfile({ dispatch }, user) {
      const userId = fb.auth.currentUser.uid
        
        // update user object
        const userRef = await fb.usersCollection.doc(userId).update({
          name: user.name,
          title: user.title
        })

        dispatch('fetchUserProfile', { uid: userId })
      

      // update all posts by user
      const postDocs = await fb.postsCollection.where('userId', '==', userId).get()
      postDocs.forEach(doc => {
        fb.postsCollection.doc(doc.id).update({
          userName: user.name
        })
      })

      // update all comments by user
      const commentDocs = await fb.commentsCollection.where('userId', '==', userId).get()
      commentDocs.forEach(doc => {
        fb.commentsCollection.doc(doc.id).update({
          userName: user.name
        })
      })
    }
  }
})

export default store
