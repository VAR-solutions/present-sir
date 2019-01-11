<template>
  <div>
    <div class="row navbar-fixed">
      <nav>
        <a href="#" data-target="slide-out" class="sidenav-trigger" :aria-hidden="but">
          <i class="material-icons">menu</i>
        </a>
        <div class="nav-wrapper">
          <a href="#" class="brand-logo center">Present Sir</a>
          <a href class="right">
            <router-link :to="{ name: 'AddSubject', params: {userdata: this.user} }">
              <i class="material-icons navAdd">add</i>
            </router-link>
          </a>
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
            <span class="email">{{ user.email }}</span>
          </a>
        </div>
      </li>
      <li>
        <router-link :to="{ name: 'Dashboard', params: {name: this.user} }">Dashboard</router-link>
      </li>
      <li>
        <div class="divider"></div>
      </li>
      <li>
        <a  class="subheader">Subjects</a>
      </li>
      <li v-for="(sub,index) in subjects" :key="index"><a href="#" class="waves-effect">{{ sub.subName }}</a></li>
      <li>
        <div class="divider"></div>
      </li>
      <li>
        <a v-if="user" class="waves-effect" @click="logout">
          <i class="material-icons">exit_to_app</i>Logout
        </a>
        <a class="waves-effect" v-else-if="!user" @click="login">Login</a>
      </li>
    </ul>
  </div>
</template>

<script>
import db from "@/firebase/init";
import AddSubject from "@/components/AddSubject";
import firebase from "firebase/app";
import "firebase/auth";
//Side Nav toggle
$(document).ready(function() {
  $(".sidenav").sidenav();
});

export default {
  name: "Navbar",
  components: {
    AddSubject
  },
  data() {
    return {
      user: null,
      feedback: null,
      but: true,
      subjects: []
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Home" });
        });
    },
    login() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then(result => {
          this.$router.push({ name: "Dashboard", params: { name: this.user } });
        })
        .catch(err => {
          this.feedback = err.message;
        });
      // if (this.name) {
      //   this.feedback = null;
      //   this.$router.push({ name: "Dashboard", params: { name: this.name } });
      // }
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        // console.log(user);
        this.$router.push({ name: "Dashboard", params: { name: this.user } });
      } else {
        this.user = null;
      }
    });
    //fetch data from firestone
    let ref = db.collection("subjects");
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        if (doc.data().userid == this.user.uid) {
          let subject = doc.data();
          subject.id = doc.id;
          this.subjects.push(subject);
        }
      });
    });
  }
};
</script>
<style scoped>
nav {
  background: rgb(24, 103, 192);
}
.col {
  padding: 0;
}
.name, .email {
  color: rgb(24, 103, 192);
}
nav i.material-icons.navAdd {
  font-size: 48px;
  padding-right: 5px;
}
@media only screen and (min-width: 1px) {
  .sidenav-trigger {
    display: block;
  }
}
</style>
