<template>
  <div>
    <template v-if="months">
    <div
      v-loading="calendarLoading" 
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(222, 222, 222, 0.6)"
     class="calendar__contain">
      

      <div class="calendar__bd" v-for="month in months" :key="month.year+month.month" >
        <div class="calendar__title">
          <span @click="lastMonth()" style="padding-right:10px;padding-left:10px;">&lt;</span>
            {{month.year}} 年 {{month.month}} 月
          <span @click="nextMonth()" style="padding-right:10px;padding-left:10px;">&gt;</span>
        </div>
        
        <div class="calendar__hd">
        <div>
          <span>周一</span>
        </div>
        <div>
          <span>周二</span>
        </div>
        <div>
          <span>周三</span>
        </div>
        <div>
          <span>周四</span>
        </div>
        <div>
          <span>周五</span>
        </div>
        <div>
          <span>周六</span>
        </div>
        <div>
          <span>周日</span>
        </div>
      </div>

        <div class="day" v-for="day in month.days" :key="day.entry">
          <div v-if="day.value == 'placeholder'" class="placeholder"></div>
          <div v-if="day.value == 'value'" 
                      :class = "isToday(day.entry) ? 'date today': 'date'"
                      @click="changeMusic(day.entry.split('.')[0])"
                      >
            {{ day.content }}
          </div>

          <div v-if="day.value == 'empty'" class="empty">{{ day.content }}</div>
        </div>
      </div>
    </div>  
    </template>
    <div v-for="data in newsList" class="card" style="padding:10px; margin 10px;" >
      <div style="text-align:center;">---  {{dateToStr(data.mDate)}}  ---</div>
      <div v-if="data.news1">维基新闻：</div>
      <div v-html="data.news1"></div>
      <div v-if="data.news2">百度新闻：</div>
      <div v-html="data.news2"></div>
      
    </div>
    <template v-if="newsList">
    <infinite-loading @infinite="infiniteHandler" spinner="spiral" ref="infiniteLoading">>
       <span slot="no-more">
      锵锵三人行，广告之后见
    </span>
    </infinite-loading>
 </template>
</div>

</template>

<script>
import Calendar from '../utils/calendar'
import InfiniteLoading from 'vue-infinite-loading';
import dateutils from 'vue-dateutils'
const C = new Calendar()
let newsDate;
let currentMonth;
let data={
      months: null,
      newsList: null,
      radioDate:null,
      calendarLoading:false,
      
    };


export default {
  name: 'Calendar',
  
  data () {
    return data
  },
  
  beforeMount () {

    this.$store.dispatch('FETCH_TODAY').then(
      ((data) => {
        
        var bDate = dateutils.dateToStr("YYYY-MM-DD",new Date(data.mDate))
        this.$store.commit('SET_RADIO_DATE', bDate)
        newsDate = bDate;
       
        this.newsList = []
        //获取本月日历列表
        data.calendarLoading=true
        this.$store.dispatch('FETCH_NEW_MONTH',{ date:newsDate,addMonth: 0}).then(
          (({  days }) => {
             data.calendarLoading=false
            C.generate(days).then(months =>{ 
              this.months = months})   
            currentMonth = days[0]      
          }
        ))
        //重设radio信息
        this.changeMusic(bDate)
      }
    ))  
  }
  ,
  methods:{
    dateToStr:function(timeLong){
      return dateutils.dateToStr("YYYY-MM-DD",new Date(timeLong))
    },
    changeMusic:function(clickDate){

      this.$store.dispatch('FETCH_CONTENT',{ date: clickDate}).then(
      content => {

         let m_song1s = [     
        {
          title: clickDate,
          author: '锵锵三人行',      
          url: content.data.audio,
          pic: 'https://tva4.sinaimg.cn/crop.0.0.180.180.180/645ed684jw1e8qgp5bmzyj2050050aa8.jpg'
        }  
      ]
  
      this.$store.commit('SET_SONGS', m_song1s)
      this.$store.commit('SET_RADIO_DATE', clickDate)   

      newsDate = clickDate;
      this.newsList = []
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
      
      }
    )
    },

    isToday: function (date) {
      return this.$store.state.radioDate == date
    },

    infiniteHandler($state)  {
    
      if(typeof newsDate == "undefined"){
            $state.complete();
            return;
      }
      this.$store.dispatch('FETCH_NEWS',{ date: newsDate}).then(
        responseBean => {
        
          if(typeof(responseBean.data.data)=="undefined" || responseBean.data.data == null){
            $state.complete();
            return;
          }

          this.newsList.push(responseBean.data.data)
          newsDate = dateutils.dateToStr("YYYY-MM-DD",new Date(responseBean.data.data.mDate))
          newsDate = dateutils.dateToStr("YYYY-MM-DD",dateutils.dateAdd('d', -1, new Date(newsDate)))
          $state.loaded();
          
      })          
     
       
    },
    lastMonth:function(){
          data.calendarLoading=true
          this.$store.dispatch('FETCH_NEW_MONTH',{ date:currentMonth,addMonth: -1}).then(
          (({  days }) => {
            data.calendarLoading=false
            if(days.length >0){
              currentMonth = days[0]    
              C.generate(days).then(months =>{ 
              this.months = months})
             
            }         
          }
        ))
    },
    nextMonth:function(){
      data.calendarLoading=true
      this.$store.dispatch('FETCH_NEW_MONTH',{ date:currentMonth,addMonth: 1}).then(
          (({  days }) => {
            data.calendarLoading=false
            currentMonth = days[0]    
            C.generate(days).then(months =>{ 
              this.months = months})
          }
        ))
    }
      
      
  },
  components: {InfiniteLoading,}
}
</script>

<style lang="scss">
@import '../sass/mixin/flexbox.scss';
@media (min-width: 800px) {
  .calendar__contain,
  .calendar__hd {
    max-width: 600px;
    margin   : 0 auto;
  }
}
.card {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 5px;
    margin:20px;
    margin-top:25px;
    background-color: white;
}
.calendar__contain {
  position     : relative;
  overflow     : hidden;
  margin:20px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  background-color: white;
  border-radius: 5px;
  padding: 2px;
  padding-top: 3px;
  padding-bottom: 5px;
}
.calendar__hd {
  @include flexbox();
  @include flex-flow(row, nowrap);
  @include align-self(center);
  background : #F8F8F8;
  color      : #96999B;
  height     : 20px;
  overflow   : hidden;
  line-height: 20px;
  width      : 100%;
  z-index    : 100;
  max-width  : 600px;
  margin-bottom: 2px;
}
.calendar__hd div {
  @include flex(1);
}
.calendar__hd div span {
  width      : 100%;
  display    : inline-block;
  text-align : center;
  font-size  : .6rem;
  height     : 20px;
  line-height: 20px;
}
.calendar__title {
  width        : 100%;
  display      : inline-block;
  text-align   : center;
  font-size    : .7rem;
  height       : 30px;
  line-height  : 30px;
  padding      : 0 .325rem;
  box-sizing   : border-box;
  background   : #F5F5F5;
  margin-bottom: 1px;
  position     : relative;
  z-index      : 0;
}
.calendar__bd {
  @include flexbox();
  @include flex-flow(row, wrap);
  @include align-self(center);
  position: relative;
  z-index : 0;
}
.calendar__bd:nth-child(2) {

}
.calendar__title {
  width: 100%;
}
.calendar__bd .day {
  @include flex-basis(calc(100% * (1/7)));
  position   : relative;
  user-select: none;
  z-index    : 0;
}
.calendar__bd .day:hover {
  z-index: 999;
}
.calendar__bd .day:hover div.date {
  cursor    : pointer;
  font-size : 1.225rem;
  color     : #18C1F9;
  background: #ffffff;
  border    : 2px solid #f5f5f5;
  z-index   : 999;
}
.calendar__bd .day:before {
  content       : '';
  width         : 100%;
  display       : block;
  padding-bottom: 100%;
}
.calendar__bd .day div.date {
    transition: 
      background .3s ease-out,
      box-shadow .2s ease-in-out,
      font-size .2s ease-in-out, 
      color .2s ease-in-out;
}
.calendar__bd .day div.date,
.calendar__bd .day div.placeholder,
.calendar__bd .day div.empty {
  @include flexbox();
  @include align-items(center);
  @include justify-content(center);
  font-size : 1rem;
  position  : absolute;
  left      : 0;
  top       : 0;
  width     : 100%;
  height    : 100%;
  text-align: center;
  padding   : .325rem;
  box-sizing: border-box;
  border    : 1px solid #FFFFFF;
  background: #F5F5F5;
  color     : #000000;
}
.calendar__bd .day div.today {
  background: #FFFFFF;
  color     : #18C1F9;
}
.calendar__bd .day div.placeholder {
  overflow  : hidden;
  background: #ffffff;
}
.calendar__bd .day div.empty {
  color     : #cccccc;
  background: #F5F5F5;
}
</style>