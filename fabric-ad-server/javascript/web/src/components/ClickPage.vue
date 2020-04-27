<template>
  <div>
    <div @click="click" class="swiper-img" :style="`background: url('${ad.url}')`">

    </div>
    <!--    <el-button @click="prev">上一张</el-button>-->
    <!--    <el-button @click="next">下一张</el-button>-->
    <el-button @click="refresh">刷新</el-button>
  </div>
</template>

<script>
  import {addRecord} from "../api";
  // import 'swiper/dist/swiper.css'
  // import 'swiper/css/swiper.css'

  // import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
  // import 'vue-awesome-swiper/'

  let components = {}
  let urls = {
    'xiaomi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Xiaomi_logo.svg/1200px-Xiaomi_logo.svg.png',
    'apple': "http://cdn.osxdaily.com/wp-content/uploads/2017/08/apple-event-2017-september-logo-610x659.jpg",
    'huawei': "http://img.cnmo-img.com.cn/453_500x375/452381.jpg"
  }


  function getAd() {
    let aids = Object.keys(urls)
    let i = parseInt(Math.random() * aids.length);
    return {
      aid: aids[i],
      url: urls[aids[i]]
    };
  }


  export default {
    name: "ClickPage",
    title: '3D Coverflow effect',
    components,
    data() {
      return {
        ad: {},
      }
    },
    methods: {
      prev() {
        this.refresh()
      },
      next() {
        this.refresh()
      },
      click(e) {
        console.log('e', e)
        let uid = localStorage.getItem("uid");
        addRecord(uid, {
          aid: this.ad.aid,
          clickX: e.x,
          clickY: e.y,
          clickUrl: window.location.href
        });
      },
      refresh() {
        this.ad = getAd()
        // this.swiper.slideTo(this.now, 500, false)
      },
    },
    mounted() {
      this.refresh()
    },
    created() {

    }
  }
</script>

<style lang="less" scoped>
  /*@import './base.scss';*/

  .swiper-img {
    width: 200px;
    height: 200px;
    background-repeat: no-repeat !important;
    background-size: cover !important;
  }
</style>
