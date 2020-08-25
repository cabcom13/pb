import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import "firebase/analytics"
import 'firebase/performance'

// firebase init
const firebaseConfig = {
  apiKey: "AIzaSyBIt9FqQg4xI6w0Sa-3-XpaE_Pa-ULokoE",
  authDomain: "praybook-f7f7f.firebaseapp.com",
  databaseURL: "https://praybook-f7f7f.firebaseio.com",
  projectId: "praybook-f7f7f",
  storageBucket: "praybook-f7f7f.appspot.com",
  messagingSenderId: "999865940861",
  appId: "1:999865940861:web:0375414ea2ca2d6547ea14",
  measurementId: "G-MPSMCD53J1"
}
firebase.initializeApp(firebaseConfig)
firebase.analytics();
firebase.performance();

// utils
const db = firebase.firestore()
const auth = firebase.auth()
const fs = firebase.storage()
const aly = firebase.analytics()


// collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
  db,
  auth,

  fs,
  aly,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
}
