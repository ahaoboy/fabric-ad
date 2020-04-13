<template>
  <div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
      <swiper-slide>Slide 5</swiper-slide>
      <swiper-slide>Slide 6</swiper-slide>
      <swiper-slide>Slide 7</swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  import {addRecord} from "../api";
  import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'

  let urls = {
    'xiaomi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Xiaomi_logo.svg/1200px-Xiaomi_logo.svg.png',
    'apple': "http://cdn.osxdaily.com/wp-content/uploads/2017/08/apple-event-2017-september-logo-610x659.jpg",
    'huawei': "http://img.cnmo-img.com.cn/453_500x375/452381.jpg"
  }

  function getAid() {
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
    components: {
      Swiper,
      SwiperSlide
    },
    data() {
      return {
        ad: {},
        swiperOption: {
          effect: 'coverflow',
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: 'auto',
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
          },
          pagination: {
            el: '.swiper-pagination'
          }
        }
      }
    },
    methods: {
      click() {
        let uid = localStorage.getItem("uid");
        addRecord(uid, this.ad.aid);
      },
      refresh() {
        this.ad = getAid();
      },
    },
    created() {
      // this.ad = getAid();
      this.refresh()
      let uid = localStorage.getItem("uid");
      if (!uid) {
        this.$router.push("/addUser");
      }
    }
  }
</script>

<style lang="less">
  .example-3d {
    width: 100%;
    height: 400px;
    padding-top: 50px;
    padding-bottom: 50px;
  }

  .swiper {
    height: 100%;
    width: 100%;

    .swiper-slide {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 300px;
      height: 300px;
      text-align: center;
      font-weight: bold;
      background-color: #2C8DFB;
      background-position: center;
      background-size: cover;
    }
  }

</style>
