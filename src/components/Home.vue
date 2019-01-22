<template>
  <div class="home">
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">

    <div class="parallax1">
      <!-- <button> -->
      <!-- <div class="waves-effect waves-light btn prlx center" v-if="!user" @click="login">
        <div class="googlebtn center">
          <img
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            class="material-icons left goog"
          >
        </div>
        <div class="sgntex center">Sign in with Google</div>
      </div> -->
      <!-- </button> -->
    </div>
    <div style>
      <div class="section">
        <div class="row container welcome">
          <h2 class="header">Present SIR</h2>
          <p class="grey-text text-darken-3 lighten-3">Keep a track of your attendance digitally.</p>

          <a class="waves-effect waves-light btn" v-if="!user" @click="login">
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              class="material-icons left goog"
            >
            <span class="tex">Sign in with Google</span>
          </a>
        </div>
      </div>
    </div>

    <div class="parallax2"></div>

    <div class="section">
      <div class="row container">
        <h2 class="header center">Developers</h2>
        <div class="row center">
          <div class="col s12 m12 l4">
            <a class="dev-profile" href="https://github.com/i-vishi">
              <img class="pics" alt="Portrait photo of Vishal Gaur" src="../assets/vishal.jpg">
              <a href="https://github.com/i-vishi" id="deviName">Vishal Gaur</a>
            </a>
          </div>

          <div class="col s12 m12 l4">
            <a class="dev-profile" href="https://github.com/antew7">
              <img class="pics" alt="Portrait photo of Ananya Tewari" src="../assets/ananya.jpg">
              <a href="https://github.com/antew7" id="deviName">Ananya Tewari</a>
            </a>
          </div>

          <div class="col s12 m12 l4">
            <a class="dev-profile" href="https://github.com/ravivarshney01">
              <img class="pics" alt="Portrait photo of Ravi Varshney" src="../assets/ravi.jpg">
              <a href="https://github.com/ravivarshney01" id="deviName">Ravi Varshney</a>
            </a>
          </div>
          <div class="col s12 m12 l12 love">
            Made With &#10084; By
            <a href="https://github.com/VAR-solutions">VAR Solutions</a>
          </div>
        </div>
      </div>
    </div>

    <footer class="page-footer change">
      <div class="container">
        <div class="row">
          <div class="col l12 s12">
            <p class="center pow">
              Powered by
              <img
                src="../assets/logo.png"
                class="goog tooltipped"
                data-position="bottom"
                data-tooltip="Vue.js"
              > and
              <img
                class="goog tooltipped"
                data-position="bottom"
                data-tooltip="Firebase"
                src="https://img.icons8.com/color/48/000000/firebase.png"
              >
            </p>
          </div>
        </div>
      </div>
      <div class="footer-copyright dark">
        <div class="container mail">
          © 2019 UpThrust
          <a href="mailto:dev.var.solutions@gmail.com">
            <span class="right mail">&nbsp; &nbsp;Email Us</span>
            <div class="right">
              <i class="material-icons mail">mail</i>
            </div>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import firebase from "firebase/app";
$(document).ready(function() {
  $(".parallax").parallax();
  $(".tooltipped").tooltip();
});

export default {
  name: "Home",
  data() {
    return {
      user: null
    };
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$router.push({ name: "Dashboard" });
      }
    });
  },
  methods: {
    login() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          this.user = result.user;
          this.$router.push({
            name: "Dashboard"
          });
        })
        .catch(err => {
          this.feedback = err.message;
        });
    }
  }
};
</script>

<style scoped>
.parallax1 {
  background-image: url("../assets/Optimized-image1.jpg");

  /* Set a specific height */
  min-height: 450px;

  /* Create the parallax scrolling effect */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.parallax2 {
  background-image: url("../assets/Optimized-final.jpg");

  /* Set a specific height */
  min-height: 500px;

  /* Create the parallax scrolling effect */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.parallax1 .prlx {
  position: absolute;
  top: 42%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  /* background-color: #555; */
  /* color: white; */
  font-size: 1.2em;
  padding: 0.5%;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  width: 280px;
  height: 42px;
}
.prlx .googlebtn {
  margin: 0;
  padding: 0;
}
.prlx .sgntex {
  margin: 0;
  padding: 0;
}
.goog {
  height: 30px;
  width: 30px;
  margin-top: 2px;
}
.btn {
  background: whitesmoke;
  /* height: 45px; */
  color: rgb(24, 103, 192);
  border: 1px solid rgb(24, 103, 192);
}
.tex {
  font-size: 1.1em;
  margin-left: 4px;
}

.dev-profile {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.header {
  font-size: 3em;
  font-family: "Montserrat", sans-serif;
}
.love {
  margin: 0;
  margin-top: 10%;
  padding: 0;
  text-align: center;
}
.love a:link {
  color: black;
}
.love a:visited {
  color: black;
}

.pics {
  width: 140px;
  height: 140px;
  border-radius: 50%;

  margin: auto;
}
#deviName {
  margin-top: 5px;

  font-size: 1.1em;
  color: rgb(87, 84, 84);
}

#deviName a:link {
  color: black;
}
#deviName a:visited {
  color: black;
}
.change {
  background: #ddd;
}
.pow {
  color: black;
}
.footer-copyright {
  margin: 0;
  padding: 0;
}
.dark {
  color: white;
  background: rgb(24, 103, 192);
  font-size: 1.1em;
}

.mail {
  color: white;
}
.mail:hover {
  color: white;
}
.mail:visited {
  color: white;
}
</style>