<template>
  <div>
    <div class="row navbar-fixed">
      <nav>
        <a v-if="user" href="#" data-target="slide-out" class="sidenav-trigger" :aria-hidden="but">
          <i class="material-icons">menu</i>
        </a>
        <div class="nav-wrapper">
          <a href="#" class="brand-logo center">Present Sir</a>
          <a v-if="user" href class="right">
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
          <div class="background"></div>
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
      <li class="sidenav-close">
        <router-link :to="{ name: 'Dashboard', params: {name: this.user} }">Dashboard</router-link>
      </li>
      <li>
        <div class="divider"></div>
      </li>
      <li>
        <a class="subheader">Subjects</a>
      </li>
      <li class="sidenav-close" v-for="(sub,index) in subjects" :key="index">
        <router-link :to="{name: 'UpdateAttend', params: {sub_id: sub.id}}">{{ sub.subName }}</router-link>
      </li>
      <li>
        <div class="divider"></div>
      </li>
      <li class="sidenav-close">
        <a v-if="user" class="waves-effect" @click="logout">
          <i class="material-icons">exit_to_app</i>Logout
        </a>
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
          this.subjects = [];
          this.$router.push({ name: "Home" });
        });
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        db.collection("subjects")
          .where("userid", "==", user.uid)
          .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
              if (change.type === "added") {
                let subject = change.doc.data();
                subject.id = change.doc.id;
                this.subjects.push(subject);
              }
              if (change.type === "removed") {
                let id = change.doc.id
                this.subjects = this.subjects.filter(subject => {
                  return subject.id != id;
                });
              }
            });
          });
      } else {
        this.user = null;
      }
    });
  }
};
</script>
<style scoped>
.background {
  background: rgb(24, 103, 192);
}
nav {
  background: rgb(24, 103, 192);
}
.col {
  padding: 0;
}
.name,
.email {
  color: white;
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
.row.navbar-fixed {
  margin: 0;
  padding: 0;
}
</style>
