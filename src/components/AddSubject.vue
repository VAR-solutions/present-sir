<template>
  <div class="add-subject container">
    <div class="title">
      <h2 class="center-align">Add a Subject</h2>
    </div>
    <div class="addform center">
      <form @submit.prevent="addSubject">
        <div class="group">
          <input class="browser-default" type="text" name="subCode" v-model="subCode" required>
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>Course Code:</label>
        </div>
        <div class="group">
          <input class="browser-default" type="text" name="subName" v-model="subName" required>
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>Course Name:</label>
        </div>
        <div class="group">
          <input class="browser-default" type="text" name="subNick" v-model="subNick" required>
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>Nick Name:</label>
        </div>
        <p class="red-text" v-if="feedback">{{ feedback }}</p>
        <div class="input-group">
          <button type="submit" class="button" name="addSubject">
            <span>Add Subject</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script scoped>
import db from "@/firebase/init";
export default {
  name: "AddSubject",
  props: ["userdata"],
  data() {
    return {
      subCode: null,
      subName: null,
      subNick: null,
      feedback: null
    };
  },
  methods: {
    addSubject() {
      if (this.subCode && this.subName && this.subNick) {
        this.feedback = null;
        let rf = db.collection("users");
        rf.doc(this.userdata.uid).set({
          email: this.userdata.email,
        })
        let ref = db.collection("subjects");
        ref
          .add({
            userid: this.userdata.uid,
            subCode: this.subCode,
            subName: this.subName,
            subNick: this.subNick,
            presentDates: [],
            absentDates: []
          })
          .catch(err => {
            console.log(err);
          })
          .then(() => {
            this.$router.push({
              name: "Dashboard",
              params: { name: this.userdata }
            });
          });
      } else {
        this.feedback = "Fill all Details";
      }
    }
  }
};
</script>

<style scoped>
.title {
  color: rgb(24, 103, 192);
  padding-bottom: 2%;
}
.title h2 {
  font-family: "Catamaran";
}
.addform {
  margin-left: 10%;
  margin-right: 10%;
}
.button {
  background-color: rgb(24, 103, 192);
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.8em;
  padding: 2%;
  width: 250px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}

.button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.button span:after {
  content: "\00bb";
  position: absolute;
  opacity: 0;
  top: 0;
  right: -2%;
  transition: 0.5s;
}

.button:hover span {
  padding-right: 25px;
}

.button:hover span:after {
  opacity: 1;
  right: 0;
}
.group {
  position: relative;
  margin-bottom: 45px;
}
input {
  font-family: Avenir;
  font-size: 2em;

  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-bottom: 1px solid #9e9e9e;
}
input:focus {
  outline: none;
}

/* LABEL  */
label {
  font-family: Avenir;
  color: rgb(24, 103, 192);
  font-size: 1.3em;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

/* active state */
input:focus ~ label,
input:valid ~ label {
  top: -20px;
  font-size: 1em;
  color: rgb(24, 103, 192);
}

/* BOTTOM BARS ================================= */
.bar {
  position: relative;
  display: block;
  width: 100%;
}
.bar:before,
.bar:after {
  content: "";
  height: 2px;
  width: 0;
  bottom: 1px;
  position: absolute;
  background: rgb(24, 103, 192);
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}
.bar:before {
  left: 50%;
}
.bar:after {
  right: 50%;
}

/* active state */
input:focus ~ .bar:before,
input:focus ~ .bar:after {
  width: 50%;
}

/* HIGHLIGHTER ================================== */
.highlight {
  position: absolute;
  height: 60%;
  width: 100px;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
}

/* active state */
input:focus ~ .highlight {
  -webkit-animation: inputHighlighter 0.3s ease;
  -moz-animation: inputHighlighter 0.3s ease;
  animation: inputHighlighter 0.3s ease;
}

/* ANIMATIONS ================ */
@-webkit-keyframes inputHighlighter {
  from {
    background: rgb(24, 103, 192);
  }
  to {
    width: 0;
    background: transparent;
  }
}
@-moz-keyframes inputHighlighter {
  from {
    background: rgb(24, 103, 192);
  }
  to {
    width: 0;
    background: transparent;
  }
}
@keyframes inputHighlighter {
  from {
    background: rgb(24, 103, 192);
  }
  to {
    width: 0;
    background: transparent;
  }
}
</style>
