<template>
  <div>
    <div class="row">
        <nav>
          <a href="#" data-target="slide-out" class="sidenav-trigger" :aria-hidden="but" >
          <i class="material-icons">menu</i>
        </a>
          <div class="nav-wrapper">
            <a href="#" class="brand-logo center">Present Sir</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li>
                <a v-if="!user" @click="login">Login</a>
              </li>
              <li>
                <a v-if="user" @click="logout">Logout</a>
              </li>
            </ul>
          </div>
        </nav>
    </div>

    <ul id="slide-out" class="sidenav">
      <li>
        <div v-if="user" class="user-view">
          <div class="background">
            <img src="../../assets/texture.jpg">
          </div>
          <a>
            <img class="circle" :src="user.photoURL">
          </a>
          <a>
            <span class="name">{{user.displayName}}</span>
          </a>
          <a>
            <span class="name">{{ user.email }}</span>
          </a>
        </div>
      </li>
      <li>
        <!-- <a href="#!">
          <i class="material-icons">cloud</i>First Link With Icon
        </a>
      </li>
      <li>
        <a href="#!">Second Link</a>
      </li>
      <li>
        <div class="divider"></div>
      </li>
      <li> -->
        <a class="subheader">Subheader</a>
      </li>
      <li>
        <a v-if="user" class="waves-effect" @click="logout">Logout<i class="material-icons">exit_to_app</i></a>
        <a class="waves-effect" v-else-if="!user" @click="login">Login</a>
      </li>
    </ul>
  </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase/app'
import 'firebase/auth'
//Side Nav toggle
$(document).ready(function() {
  $(".sidenav").sidenav();
});


export default {
  name: "Navbar",
  data(){
    return {
      user: null,
      feedback: null,
      but: true
    }
  },
  methods: {
    logout(){
      firebase.auth().signOut().then(() => {
        this.$router.push({ name: 'Home' })
      })
    },
    login(){
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider).then((result) => {
        this.$router.push({ name: 'Dashboard' })
      }).catch(err => {
        this.feedback = err.message
      })
    }
  },
  created(){
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.user = user
        console.log(user)
      } else {
        this.user = null
      }
    })

  }
};
</script>
<style scoped>

nav{
  background: rgb(24, 103, 192);

}
.col {
  padding: 0;
}
.name{
  color: rgb(24, 103, 192);
}

@media only screen and (min-width: 1px) {
  .sidenav-trigger {
    display: block;
  }
}
</style>
