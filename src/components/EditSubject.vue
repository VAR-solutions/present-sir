<template>
  <div class="add-subject container">
    <div class="title">
        <h2 class="center-align title">Add a Subject</h2>
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
          <label>Give a Nick Name to your Subject:</label>
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

<script>
import db from "@/firebase/init";
export default {
  name: "EditSubject",
  props: ['user', 'sub_id'],
  data() {
    return {
        subject: []
    };
  },
  created() {
    let ref = db.collection("subjects").where('SubCode', '==', this.$route.params.sub_id);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        if (doc.data().userid == this.user.uid) {
          this.subject = doc.data();
          subject.id = doc.id;
          this.subjects.push(subject);
        }
      });
    });
  }
};
</script>

<style>
</style>
