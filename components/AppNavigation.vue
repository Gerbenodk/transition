<template>
  <header :class="{
    'progress' : (page === 'progress'),
    'group' : (page === 'group'),
    'index' : (page === 'index'),
    'wow' : (page === 'wow')
  }">

    <transition-group name="bk" tag="div" class="bk-img">
      <div key="img1" v-if="page === 'index'" class="header-img1"></div>
      <div key="img2" v-else-if="page === 'progress'" class="header-img2"></div>
      <div key="img3" v-else-if="page === 'group'" class="header-img3"></div>
      <div key="img4" v-else class="header-img4"></div>
    </transition-group>

    <div class="nav-wrapper">
      <nav>
        <ul>
          <nuxt-link exact to="/"><li>{{ selectedUser.name | firstName }}'s Home</li></nuxt-link>
          <nuxt-link to="/progress"><li>{{ selectedUser.name | firstName }}'s Progress</li></nuxt-link>
          <nuxt-link to="/group"><li>{{ selectedUser.name | firstName }}'s Team</li></nuxt-link>
          <nuxt-link to="/wow"><li>{{ selectedUser.name | firstName }}'WOW</li></nuxt-link>
        </ul>
        <app-nav-transition />
      </nav>
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { TimelineMax, Expo, Sine, Back } from 'gsap'
import AppNavTransition from './AppNavTransition.vue'

export default {
  data() {
    return {
      saved: false,
      menuOpened: false
    }
  },
  components: {
    AppNavTransition
  },
  computed: {
    ...mapState(['page']),
    ...mapGetters(['selectedUser'])
  },

  filters: {
    firstName(input) {
      var lastIndex = input.lastIndexOf(' ')
      return input.substring(0, lastIndex)
    }
  }
}
</script>

<style scoped lang="scss">
header {
  width: 100vw;
  height: 300px;
  position: relative;
}

@mixin header ($imgurl) {
  background: url($imgurl) center center;
  background-size: cover;
  position: absolute;
  width: 100vw;
  height: 300px;
}

.header-img1 {
  @include header('/header1.jpg');
}

.header-img2 {
  @include header('/header2.jpg');
}

.header-img3 {
  @include header('/header3.jpg');
}
.header-img4 {
  @include header('/header4.jpg');
}

.bk-enter-active,
.bk-leave-active {
  transition: all 0.4s ease;
}

.bk-enter,
.bk-leave-to {
  transform: scale(1.1) translateZ(0);
  opacity: 0;
}

.bk-img {
  position: absolute;
  width: 100vw;
  height: 300px;
  overflow: hidden;
  top: 0;
}

.nav-wrapper {
  width: 100vw;
  position: relative;
  z-index: 1000;
  background: rgba(4, 67, 98, 0.25);
}

@media screen and (max-width: 1030px) {
  .nav-wrapper {
    padding: 0 20px;
  }
}

ul {
  list-style: none;
  padding: 15px 0;
  li {
    display: inline-block;
    margin-right: 40px;
  }
  a,
  a:active,
  a:visited {
    color: white;
    text-decoration: none;
  }
}

@media screen and (max-width: 600px) {
  ul {
    display: none;
  }
}

.nuxt-link-active {
  font-weight: bold;
}

nav {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
}

.menu {
  position: absolute;
  right: 0;
  top: 8px;
  cursor: pointer;
}
</style>
