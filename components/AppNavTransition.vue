<template>
  <transition-group tag="div">
    <div v-for="(user, i) in users"
      @click="changeUser(i)"
      :key="user.name"
      :class="[user === selectedUser ? activeUser : secondaryUser, `profile-${i}`]"
      :ref="`profile${i}`"
    >
      <div class="online"></div>
      <img :src="user.img" />
      <p class="location">{{ selectedUser.location }}</p>
    </div>

    <button @click="toggleFollow" :class="[following ? followclass : '', follow]" key="follow">
      <span v-if="following">&#10004; Notified</span>
      <span v-else>Notify</span>
    </button>

    <h2 key="profile-name" class="profile-name">
      <span v-if="page === 'group'" class="user-trip"></span>
      <span v-else>{{ selectedUser.name }}</span>
    </h2>


  </transition-group>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
  },
  data() {
    return {
      following: false,
      follow: 'follow',
      followclass: 'active-follow',
      activeUser: 'profile-photo',
      secondaryUser: 'profile-photo-secondary'
    }
  },
  computed: {
    ...mapState(['page', 'users', 'indexedUser']),
    ...mapGetters(['selectedUser'])
  },
  methods: {
    changeUser(i) {
      this.$store.commit('changeUser', i)
      if (this.page === 'group') {
        const el = this.$refs.profile0[0]
        el.style.transform = `translate3d(${-70 +
          this.indexedUser * 55}px, -70px, 0) scale(0.25)`
      }
    },
    toggleFollow() {
      if (this.following) {
        this.$store.commit('removeFollower')
      } else {
        this.$store.commit('addFollower')
      }
      this.following = !this.following
    }
  }
}
</script>

<style lang="scss" scoped>
aside p {
  text-align: right;
  position: absolute;
  right: 0;
  top: 250px;
  color: white;
}

.calendar,
.map-pin {
  transition: 0.4s all ease-out;
  opacity: 0;
}

@mixin group($top, $left) {
  position: absolute;
  top: $top;
  left: $left;
  display: block;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: 0.4s all ease-out;
}

@mixin online($size, $position, $border) {
  position: absolute;
  background: #07dc3c;
  border-radius: 50% 50%;
  width: $size;
  height: $size;
  right: $position;
  bottom: $position;
  border: $border;
  opacity: 0;
}

.profile-photo {
  width: 200px;
  @include group(150px, 0);
  img {
    border-radius: 4px;
  }
  .online {
    @include online(40px, 10px, 2px solid black);
  }
}

.profile-photo-secondary {
  @include group(150px, 0);
  width: 200px;
  opacity: 0;
  transition: none;
  img {
    border-radius: 50% 50%;
  }
  .online {
    @include online(40px, 0px, 1px solid black);
  }
}

.profile-photo,
.profile-photo-secondary {
  img {
    transition: 0.4s all ease;
    width: 100%;
    cursor: pointer;
  }
}

.profile-1 {
  transform: translate3d(-15px, -70px, 0) scale(0.25);
}
.profile-2 {
  transform: translate3d(40px, -70px, 0) scale(0.25);
}
.profile-3 {
  transform: translate3d(95px, -70px, 0) scale(0.25);
}
.location{
   transform: translate3d(200px, -150px, 0);
   font-size: 100px;
   color: white;
 }

.follow {
  font-weight: bold;
  width: 150px;
  transition: 1s all ease;
  @include group(320px, 220px);
  &:focus {
    outline: 1px dotted rgb(5, 134, 106);
  }
}

.saveinfo {
  color: white;
  position: absolute;
  top: 194px;
  font-size: 20px;
  right: 56px;
  text-align: right;
  visibility: hidden;
  opacity: 0;
}

.active-follow {
  background: rgb(5, 134, 106);
}

.profile-name {
  font-size: 35px;
  @include group(355px, 0);
}

.side-icon {
  position: absolute;
  top: 220px;
  right: 0;
  display: block;
  transition: 0.4s all ease-out;
  padding: 12px 12px 9px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50% 50%;
  cursor: pointer;
}

//animations
.progress {
  .follow {
    transform: translate3d(-215px, -70px, 0) !important;
  }
  .profile-photo {
    transform: translate3d(-20px, -100px, 0) scale(0.75) !important;
  }
  .profile-name {
    transform: translate3d(140px, -115px, 0) scale(0.75) !important;
    color: white;
  }
  .side-icon {
    transform: translate3d(0, -40px, 0) !important;
    background: rgba(255, 255, 255, 0.9);
  }
  .calendar {
    opacity: 1;
  }
  .location{
    transform: translate3d(200px, -150px, 0) !important;
    font-size: 100px;
    color: white;
  }
}


.wow {
  .follow {
    transform: translate3d(50px, -80px, 0);
  }
  .profile-photo {
    transform: translate3d(-1px, -100px, 0) scale(0.75) !important;
    img {
      border-radius: 50% 50%;
    }
  }
  .profile-name {
    transform: translate3d(1px, -125px, 0) scale(0.75);
    color: white;
  }
  .side-icon {
    transform: translate3d(0, -40px, 0);
    background: rgba(255, 255, 255, 0.9);
  }
  .calendar {
    opacity: 1;
  }
  .location{
    visibility: hidden;
  }
}

.group {
  .follow {
    opacity: 0;
    transition: none;
  }
  .profile-photo {
    transform: translate3d(-70px, -70px, 0) scale(0.25);
    img {
      border-radius: 50% 50%;
    }
  }
  .profile-0,
  .profile-1,
  .profile-2,
  .profile-3 {
    transition: 0.4s all ease-in-out;
    opacity: 1;
  }
  .profile-photo,
  .profile-photo-secondary {
    img:hover {
      transition: 0.2s all ease;
      border: 10px solid white;
    }
  }
  .online {
    opacity: 1;
  }
  .profile-name {
    transform: translate3d(0px, -125px, 0);
    color: white;
  }
  .side-icon {
    transform: translate3d(0, -40px, 0);
    background: rgba(255, 255, 255, 0.9);
  }
  .map-pin {
    opacity: 1;
  }
  .location{
    visibility: hidden;
  }

}

.index {
  .profile-photo {
    transform: translate3d(0, 0, 0) scale(1);
  }
}

.index .profile-photo.profile-0 {
  transform: translate3d(0, 0, 0) scale(1) !important;
}

//make the icon aligned with the avatars that are similar on mobile
@media screen and (max-width: 600px) {
  .group,
  .progress {
    .side-icon {
      transform: translate3d(0, -65px, 0);
      padding: 14px 14px 12px;
    }
  }
}

.items,
.list-move {
  transition: all 0.4s ease;
}

.list-leave-active {
  position: absolute;
}

#text {
  transform-origin: 50% 50%;
}

svg {
  fill: #a8dadc;
}

@media screen and (max-width: 600px) {
  ul,
  aside {
    display: none;
  }
}
</style>
