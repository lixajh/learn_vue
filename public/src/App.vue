<template>
  <div id="app">
    <header class="header">
      <h1>锵锵三人行·日历</h1>
      <template v-if="useOne">
        <a-player ref="player1" :music="songs" key="csongdate"></a-player>
      </template>

      <template v-else>
        <a-player ref="player2" :music="songs" key="csongdate1"></a-player>
      </template>

      <nav class="inner">
        <ul>
          <router-link to="/d/today" tag="li" :class="">今日精选</router-link>
          <router-link to="/calendar" tag="li">日历</router-link>
        </ul>
      </nav>
    </header>
    <main class="content">
      <transition name="fade" mode="out-in">
        <router-view ></router-view>
      </transition>
    </main>
  </div>
</template>

<script>
import VueAplayer from 'vue-aplayer'
let aplayer1
let aplayer2
let csongdate="2017-12-10"
var data = { 'csongdate':csongdate,
              'useone':false }
export default {
  name: 'app',

  computed: {
    currentPage () {
      return this.$route.path
    },
    songs:function(){
      // console.log(this.$store.state.songs)
      return  this.$store.state.songs
    },
    songdate:function(){
      return this.$store.state.date
    },
    csongdate:function(){
      return data.csongdate
    },
    useOne:function(){
      if(this.$store.state.date===data.csongdate){
       return data.useone
      }else{
        data.useone = !data.useone
        return data.useone 
      }
      
    },
  },
  components: {
      'a-player': VueAplayer
  },
 
   beforeMount () {
     this.$store.commit('SET_DATE', '2017-12-10')

  },
  watch:{
    'songdate':function(after,before){
      if(before === null){
        return
      }
      console.log("before:" + before + "  after:" + after)
        // aplayer.destroy()     

        if(data.useone){
    aplayer1 = this.$refs.player1.control
  
    }else{
      aplayer2 = this.$refs.player2.control
    
    }

     if(typeof(aplayer1) != "undefined"){ 
      aplayer1.pause()
    }
      if(typeof(aplayer2) != "undefined"){
      aplayer2.pause()
    }
    
        
    }}
    ,
  mounted () {

    csongdate = this.$store.state.date
    if(data.useone){
    aplayer1 = this.$refs.player1.control
  
    }else{
      aplayer2 = this.$refs.player2.control
    
    }
    if(typeof(aplayer1) != "undefined"){
      aplayer1.pause()
    }
      if(typeof(aplayer2) != "undefined"){
      aplayer2.pause()
    }
  }

  }

</script>

<style lang="scss">

@import 'sass/mixin/flexbox.scss';

* {
  margin: 0;
  padding: 0;
}
html {
  font-size: 15px;
  padding-top: 156px;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif; 
}
h1, h2, h3, h4, h5, h6 {
  font-weight: normal;
  font-size: 1rem;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
@media (min-width: 800px) {
  #app,
  main {
    max-width: 600px;
    margin: 0 auto;
    height: 100%;
  }
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
}
.header {
  z-index: 100;
  width: 100%;
  height: 156px;
  background: #46C1FD;
  color: #ffffff;
  position: fixed;
  text-align: center;
  left: 0;
  top: 0;
}
.header > h1 {
  height: 40px;
  box-sizing: border-box;
  padding: .65rem 0 0 0;
  font-size: 1.425rem;
}
nav.inner {
  height: 40px;
  box-sizing: border-box;
  padding: .325rem 0 0;
  font-size: 1rem;
}
nav.inner > ul {
  @include flexbox();
  @include flex-flow(row, nowrap);
  box-sizing: border-box;
  overflow: hidden;
  height: 100%;
}
nav.inner > ul > li {
  @include flex(1);
  @include flexbox();
  @include align-items(center);
  @include justify-content(center);
  box-sizing: border-box; 
  padding: .325rem .325rem 0;
  color: #ffffff;
}
nav.inner > ul > li.current {
  background: #ffffff;
  color: #46C1FD;
  border: 2px solid #ffffff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: none;
}
.content {
  overflow: hidden;
}
.fade-enter-active, .fade-leave-active {
  transition: all .15s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>