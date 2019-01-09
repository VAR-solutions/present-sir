<template>
  <div class="home">
    <!-- Author Antew7 -->
    <div class="row">
      <div v-for="(sub,index) in subjects" :key="index" class="col s12 m12 l3">
        <div class="card">
          <div class="card-content white-text">
            <!-- Dropdown Structure -->
            <ul id="dropdown1" class="dropdown-content">

              <li>
                <span>
                <i class="material-icons">edit</i>
                </span>
              </li>
              <li>

              <span>
                <i class="material-icons">delete</i>
              </span>

              </li>
            </ul>

            <div class="row title">
              <div class="col m11 s11 title-name">
                <span class="card-title">{{sub.name}}</span>
              </div>
              <div class="col m1 s1 titlebtn">
                <a class="dropdown-trigger" href="/dashboard" data-target="dropdown1">
                  <i class="material-icons white-text">more_vert</i>
                </a>
              </div>
            </div>

            <p>Attendance: {{sub.attendance}}</p>
            <p>Present: 6</p>
          </div>
          <div class="card-action">
            <button class="btn">UPDATE ATTENDANCE</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, "left");
  });


export default {
  name: 'Dashboard',
  data() {
    return {
      subjects: [
        {
          name: "DBMS",
          attendance: "80%"
        },
        {
          name: "OS",
          attendance: "60%"
        },
        {
          name: "OOP",
          attendance: "72%"
        },
        {
          name: "OOP",
          attendance: "72%"
        },
        {
          name: "OOP",
          attendance: "72%"
        }
      ]
    };
  },
  methods: {
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
.dropdown-content{
  top: 1.6%;
}
.dropdown-content li{
  text-align: center;

}
.dropdown-content li>span{
  color: rgb(24, 103, 192);
}


</style>
