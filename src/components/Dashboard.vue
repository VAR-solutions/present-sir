<template>
  <div class="home">
    <!-- Author Antew7 -->
    <div class="row">
      <div v-for="(sub,index) in subjects" :key="index" class="col s12 m12 l3">
        <div class="card">
          <div class="card-content white-text">
            <div class="row title">
              <div class="col m10 s10 title-name">
                <span class="card-title">{{sub.subNick}}</span>
              </div>
              <div class="col m2 s2 titlebtn right">
                <router-link :to="{ name: 'EditSubject', params: { sub_id : sub.id}}">
                  <i class="material-icons white-text">edit</i>
                </router-link>&nbsp; &nbsp;
                <i class="material-icons delete" @click="delSubject(sub.id)">delete</i>
              </div>
            </div>

            <p>Attendance: 75%</p>
            <p>Present: 6</p>
          </div>
          <div class="card-action">
            <button class="btn">UPDATE ATTENDANCE</button>
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

export default {
  name: "Dashboard",
  props: ["name"],
  components: {
    AddSubject
  },
  data() {
    return {
      subjects: []
    };
  },
  methods: {
    delSubject(id) {
      db.collection("subjects")
        .doc(id)
        .delete()
        .then(() => {
          this.subjects = this.subjects.filter(subject => {
            return subject.id != id;
          });
        });
    }
  },
  created() {
    //fetch data from firestone
    let ref = db.collection("subjects");
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        if (doc.data().userid == this.name.uid) {
          let subject = doc.data();
          subject.id = doc.id;
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
  padding-top: 5%;
}
.card-content {
  margin: 0;
  padding: 0;
}
.card-content p {
  padding: 5%;
  color: rgb(24, 103, 192);
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
  padding: 8%;
  padding-bottom: 12%;
  margin: 0;
  background-color: rgb(24, 103, 192);
}
.blankcard p{
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
