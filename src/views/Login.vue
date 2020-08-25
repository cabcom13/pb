<template>
  <div id="login" >
  <PasswordReset v-if="showPasswordReset" @close="togglePasswordReset()"></PasswordReset>
  <b-row align-v="center"  style="height:100vh;">

    <b-col md="8" sm="12" align-self="center">
      <h1 class="mt-4"><strong>Pray</strong>book</h1>      
      <div :class="{ 'signup-form': !showLoginForm }">
          <form v-if="showLoginForm" @submit.prevent>
            <h3 class="pb-3">Willkommen zurück</h3>

            <b-form-group id="input-group-2"  label-for="email">
              <b-form-input
                size="sm"
                id="email"
                v-model.trim="loginForm.email"
                required
                placeholder="you@email.com"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="password-group-2"  label-for="password">
              <b-form-input
                size="sm"
                id="password"
                type="password"
                v-model.trim="loginForm.password"
                required
              ></b-form-input>
            </b-form-group>
             
             <b-alert show variant="danger" fade v-if="this.$store.state.error != ''">{{this.$store.state.error}}</b-alert>
            <b-button @click="login()" size="sm" variant="primary">Einloggen  <b-spinner label="Spinning" small v-if="loading"></b-spinner></b-button> 
            <hr />
            <b-button-group>
              <b-button variant="link" size="sm" @click="$bvModal.show('modal-1')">Passwort vergessen?</b-button>
              <b-button variant="link" size="sm" @click="toggleForm()">Account anlegen</b-button>
            </b-button-group> 
            
          </form>
          <form v-else @submit.prevent>
            <h3>Los gehts! Leg einen neuen Account an</h3>
            <b-form-group id="name-group-2" label="Name" label-for="name">
              <b-form-input
                id="name"
                v-model.trim="signupForm.name"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group id="name-group-2" label="Title" label-for="title">
              <b-form-input
                id="title"
                v-model.trim="signupForm.title"
   
              ></b-form-input>
            </b-form-group>
            <b-form-group id="email2-group-2" label="eMail" label-for="email2">
              <b-form-input
                id="email2"
                v-model.trim="signupForm.email" 
                placeholder="you@email.com"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group id="password2-group-2" label="Passwort" label-for="password2">
              <b-form-input
                id="password2"
                v-model.trim="signupForm.password" 
                required
                type="password"
                placeholder="min 6 characters"
              ></b-form-input>
            </b-form-group>

             <b-alert show variant="danger" fade v-if="this.$store.state.error != ''">{{this.$store.state.error}}</b-alert>
            <b-button @click="toggleForm()"  variant="link" class="mr-2">zurück</b-button>
            <b-button @click="signup()"  variant="primary">Account anlegen</b-button>

          </form>
        </div>
    </b-col>
    <b-col md="4" sm="12" align-self="center">

    </b-col>
  </b-row>  
 </div>
</template>

<script>
import PasswordReset from '@/components/PasswordReset'

export default {
  components: {
    PasswordReset
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        name: '',
        title: '',
        email: '',
        password: ''
      },
      showLoginForm: true,
      loading:false,
      showPasswordReset: false,
      error:{}
    }
  },
  methods: {
    toggleForm() {
      this.showLoginForm = !this.showLoginForm
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset
    },
    login() {
      this.loading = true
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password
      }).catch((error) => {
          this.loading = false
          this.error = error
          
      })
    },
    signup() {
      this.$store.dispatch('signup', {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
        title: this.signupForm.title
      }).catch((error) => {
          this.loading = false
          this.error = error
          
      })
  
    }
  }
}
</script>
