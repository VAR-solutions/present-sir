<template>
  <div class="home">
    <!-- Author Antew7 -->
    <div class="row">
      <div v-for="sub in subjects" :key="sub.id" class="col s12 m12 l3">
        <div class="card">
          <div class="card-content white-text">
            <div class="row title">
              <div class="col m9 s9 title-name">
                <span class="card-title">{{sub.subNick}}</span>
              </div>
              <div class="col m3 s3 titlebtn">
                <!-- <v-dialog v-model="dialog" width="500" class="right">
                  <v-btn slot="activator" flat icon color="white">
                    <v-icon>delete</v-icon>
                  </v-btn>

                  <v-card>
                    <v-card-title
                      class="headline grey lighten-2"
                      primary-title
                    >Delete {{sub.subName}}</v-card-title>

                    <v-card-text>Are you sure ?</v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        class="red-text"
                        color="primary"
                        flat
                        @click="delSubject(sub.id)"
                      >Delete</v-btn>
                      <v-btn color="primary" flat @click="dialog = false">Cancel</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog> -->
              </div>
            </div>
            <p style="tab-size: 4;">
              Attendance: {{sub.perAttend}} %
              <br>
              Present: {{sub.preCount}}
              <br>
              Total: {{ sub.totalCount }}
            </p>
          </div>
          <div class="card-action">
            <button class="btn">
              <router-link
                :to="{name: 'UpdateAttend', params: {sub_id: sub.id}}"
                class="blue-text"
              >UPDATE ATTENDANCE</router-link>
            </button>
          </div>
        </div>
      </div>
      <div class="col l3 m12 s12">
        <div class="card hoverable">
          <div class="card-content center blankcard">
            <router-link :to="{ name: 'AddSubject', params: {userdata: this.name} }">
              <i class="material-icons addcard">add</i>
              <p class="white-text">Add Subject</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase/app";
import AddSubject from "@/components/AddSubject";
import EditSubject from "@/components/EditSubject";
import UpdateAttend from "@/components/UpdateAttend";

export default {
  name: "Dashboard",
  components: {
    AddSubject,
    EditSubject,
    UpdateAttend
  },
  data() {
    return {
      dialog: false,
      name: "",
      subjects: []
    };
  },
  methods: {
    // delSubject(id) {
    //   db.collection("subjects")
    //     .doc(id)
    //     .delete()
    //     .then(() => {
    //       this.dialog = false
    //       this.subjects = this.subjects.filter(subject => {
    //         return subject.id != id;
    //       });
    //     });
    // }
  },
  beforeCreate() {
    //fetch data from firestone
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.name = user;
      } else {
        this.name = null;
        this.$router.push({ name: "Home" });
      }
    });
    let ref = db.collection("subjects");
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        if (doc.data().userid == this.name.uid) {
          let subject = doc.data();
          subject.id = doc.id;
          let preCount = 0;
          if (doc.data().presentDates) {
            if (doc.data().presentDates.length > 0) {
              preCount = doc.data().presentDates.length;
            }
          }
          let abCount = 0;
          if (doc.data().absentDates) {
            if (doc.data().absentDates.length > 0) {
              abCount = doc.data().absentDates.length;
            }
          }
          let totalCount = preCount + abCount;
          let perAttend = (preCount / (preCount + abCount)) * 100;
          if (totalCount == 0) {
            perAttend = 0;
          }
          subject.preCount = preCount;
          subject.abCount = abCount;
          subject.perAttend = perAttend.toPrecision(4);
          subject.totalCount = totalCount;
          this.subjects.push(subject);
        }
      });
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  margin-top: 2%;
}

.title {
  margin: 0;
  padding: 0;
  background: rgb(24, 103, 192);
}
.title-name {
  margin: 0;
  padding: 0;
}
.card-title {
  padding: 5%;
  margin: 0;
}
.titlebtn {
  margin: 0;
  padding: 0;
  height: 100%;
  padding-top: 1%;
}
.card-content {
  margin: 0;
  padding: 0;
}
.card-content p {
  padding: 5%;
  color: rgb(24, 103, 192);
  font-size: 1.2em;
}
.btn {
  width: 100%;
  background: white;
  color: rgb(24, 103, 192);
  border: 0;
}
.btn:hover {
  background: rgb(233, 230, 230);
}
.card-action {
  margin: 0;
  padding: 0;
}
.blankcard {
  position: relative;
  padding: 8%;
  padding-top: 10.5%;
  padding-bottom: 10.5%;
  margin: 0.5rem 0 1rem 0;
  background-color: rgb(24, 103, 192);
}
.blankcard p {
  font-size: 1.5em;
  margin: 0;
  padding: 0;
}
/* .addcard:hover{
  zoom: 1.1;
} */
.addcard {
  font-size: 7em;
  color: white;
  padding: 1%;
}
.delete {
  cursor: pointer;
}
</style>
