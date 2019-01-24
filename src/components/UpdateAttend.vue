<template>
  <div class="subject container">

    <div class="title">
      <h2 class="center-align">{{ this.subject.subName}}</h2>
    </div>
    <v-dialog v-model="dialog" persistent max-width="290">
    <v-btn bottom right fixed fab slot="activator" color="error" dark><v-icon >delete</v-icon></v-btn>
      <v-card>
        <v-card-title class="headline">Delete {{ this.subject.subName}}</v-card-title>
        <v-card-text>Are you sure?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="red-text" color="primary" flat @click="delSubject()">Delete</v-btn>
          <v-btn color="primary" flat @click="dialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="calendar center">
      <v-calendar
        :attributes="attributes"
        @dayclick="dayClicked"
        style="width: 80%;"
        :theme-styles="themeStyles"
      >
        <span
          slot="header-title"
          slot-scope="{ shortMonthLabel, shortYearLabel }"
        >{{ shortMonthLabel }} `{{ shortYearLabel }}</span>
      </v-calendar>
    </div>
    <div class="submitcalendar center">
      <button class="button" @click="updateAttend">
        <span>Update Attendence</span>
      </button>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase/app";
import "firebase/firestore";
import { setupCalendar, Calendar } from "v-calendar";
import "v-calendar/lib/v-calendar.min.css";
export default {
  name: "UpdateAttend",
  components: {
    "v-calendar": Calendar
  },
  data() {
    const hSpacing = "12px";
    return {
      sub_id: "",
      dialog: false,
      themeStyles: {
        wrapper: {
          // background: 'linear-gradient(to bottom right, rgb(24, 103, 180), #0d85d9)',
          background: "white",
          color: "black",
          border: "0",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.14), 0 6px 20px 0 rgba(0, 0, 0, 0.13)",
          borderRadius: "5px",
          border: "2px solid rgb(24, 103, 192)"
        },
        header: {
          padding: `20px ${hSpacing}`
        },
        headerHorizontalDivider: {
          borderTop: "solid rgba(255, 255, 255, 0.2) 1px",
          width: "80%"
        },
        weekdays: {
          color: "#090909", // New color
          fontWeight: "600", // And bolder font weight
          padding: `20px ${hSpacing} 5px ${hSpacing}`
        },
        weeks: {
          padding: `0 ${hSpacing} ${hSpacing} ${hSpacing}`
        },
        dayContent: {
          fontSize: "1.2rem"
        }
      },
      subject: {},
      presentDates: [],
      absentDates: [],
      selectedDay: null, // Add state to store selected day

      todos: [
        {
          id: 1,
          description: "Present",
          date: [],
          isCompleted: false,
          color: "green",
          brcolor: "green",
          brwidth: "2px"
        },
        {
          id: 2,
          description: "Absent",
          date: [],
          isCompleted: false,
          color: "red",
          brcolor: "#DA1B1B",
          brwidth: "2px"
        }
      ]
    };
  },
  computed: {
    attributes() {
      return this.todos.map(t => ({
        key: `todo.${t.id}`,
        highlight: {
          backgroundColor: t.color, // Red background
          borderColor: t.brcolor,
          borderWidth: t.brwidth,
          borderStyle: "solid"
        },
        dates: t.date,
        customData: t
      }));
    }
  },
  created() {
    this.sub_id = this.$route.query.sub_id;
    this.name = this.$route.query.name;
    let ref = db.collection("subjects");
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        if (doc.id == this.$route.params.sub_id) {
          this.subject = doc.data();
          this.subject.id = doc.id;
          if (doc.data().presentDates) {
            if (doc.data().presentDates.length > 0) {
              for (var i = 0; i < doc.data().presentDates.length; i++) {
                this.todos[0].date.push(new Date(doc.data().presentDates[i]));
                this.presentDates.push(doc.data().presentDates[i]);
              }
            }
          }
          if (doc.data().absentDates) {
            if (doc.data().absentDates.length > 0) {
              for (var i = 0; i < doc.data().absentDates.length; i++) {
                this.todos[1].date.push(new Date(doc.data().absentDates[i]));
                this.absentDates.push(doc.data().absentDates[i]);
              }
            }
          }
        }
      });
    });
  },
  methods: {
    dayClicked(day) {
      var ch = 0;
      var a = -1;
      for (var i = 0; i < this.presentDates.length; i++) {
        if (this.presentDates[i] == day.dateTime) {
          ch = 1;
          a = i;
          break;
        }
      }
      for (var i = 0; i < this.absentDates.length; i++) {
        if (this.absentDates[i] == day.dateTime) {
          ch = 2;
          a = i;
          break;
        }
      }
      if (ch == 0) {
        this.presentDates.push(day.dateTime);
        this.todos[0].date.push(new Date(day.dateTime));
      }
      if (ch == 1) {
        this.presentDates.splice(a, 1);
        this.absentDates.push(day.dateTime);
        var b = -1;
        for (var i = 0; i < this.todos[0].date.length; i++) {
          if (this.todos[0].date[i].getTime() == day.dateTime) {
            b = i;
            break;
          }
        }
        this.todos[0].date.splice(b, 1);
        this.todos[1].date.push(new Date(day.dateTime));
      }
      if (ch == 2) {
        this.absentDates.splice(a, 1);
        var b = -1;
        for (var i = 0; i < this.todos[1].date.length; i++) {
          if (this.todos[1].date[i].getTime() == day.dateTime) {
            b = i;
            break;
          }
        }
        this.todos[1].date.splice(b, 1);
      }
    },
    updateAttend() {
      this.feedback = null;
      let ch = 0;
      let ref = db.collection("subjects").doc(this.subject.id);
      var dd = ref.update({
        presentDates: firebase.firestore.FieldValue.delete(),
        absentDates: firebase.firestore.FieldValue.delete()
      });
      for (var i = 0; i < this.presentDates.length; i++) {
        ref
          .update({
            presentDates: firebase.firestore.FieldValue.arrayUnion(
              this.presentDates[i]
            )
          })
          .catch(err => {
            console.log(err);
          });
      }
      for (var i = 0; i < this.absentDates.length; i++) {
        ref
          .update({
            absentDates: firebase.firestore.FieldValue.arrayUnion(
              this.absentDates[i]
            )
          })
          .catch(err => {
            console.log(err);
          })
          .then(() => {
            this.$router.push({ name: "Dashboard" });
          });
      }
    },
    delSubject() {
    db.collection("subjects")
      .doc(this.subject.id)
      .delete()
      .then(() => {
        this.$router.push({ name: "Dashboard" });
      });
  }
  }
};

setupCalendar({
  firstDayOfWeek: 2 // Monday,
});
</script>

<style scoped>
.title h2 {
  font-family: "Catamaran";
  color: rgb(24, 103, 192);
  text-transform: capitalize;
}
.submitcalendar {
  margin: 1%;
  padding: 1%;
}
.calendar {
  margin: 1%;
  padding: 1%;
}

.button {
  background-color: rgb(24, 103, 192);
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.3em;
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
</style>
