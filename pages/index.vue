<template>
  <main>

      <form @submit.prevent="submit">
          <input placeholder="name" v-model="search" autofocus>
      </form>
    <!--<div class="places" ref="places">-->
      <!--<div v-for="place in places" class="location">-->
        <!--<img :src="place.img" :alt="place.name" />-->
        <!--<h2>{{ place.name }}</h2>-->
        <!--<p><strong>Rating: {{ place.rating }}</strong></p>-->
        <!--<p>{{ place.description }}</p>-->
        <!--<hr />-->

      <!--</div>-->
    <!--</div>-->
    <!--<div class="mapcontain" ref="mapcontain">-->
      <!--<p>-->
        <!--Checked in at Honolulu location-->
      <!--</p>-->
    <!--</div>-->
  </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data(){
        return{
            search: ''
        }
    },
    methods: {
        submit(event){
            this.$router.push('wow/${this.search}');
        }
    },
  components: {
  },
  computed: mapState(['page', 'users', 'places']),

}
</script>

<style>
.mapboxgl-missing-css {
  display: none;
}
</style>

<style lang="scss" scoped>
main {
  padding-top: 20px;
  border-top: 1px solid #ddd;
  margin-top: 120px;
}

.places {
  img {
    float: left;
    margin: 0 15px 15px 0;
  }
  p {
    margin-top: 10px;
  }
  .location {
    padding: 10px 0;
  }
}

hr {
  border-top: 1px solid #ddd;
  border-bottom: none;
  margin-top: 15px;
}

.mapcontain {
  width: 35%;
  float: right;
  height: 400px;
  p {
    margin: 10px 0;
  }
}

@media screen and (max-width: 600px) {
  .mapcontain {
    width: 100%;
    margin: 10px 0;
  }
}
</style>
