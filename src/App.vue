<template>
  <div>
    <v-bottom-sheet v-model="sheet">
      <v-card height="200">
        <v-card>
          <v-btn variant="text" @click="sheet = !sheet"> X </v-btn>
          <v-list
    ><v-list-item
        v-for="item in popContents.popContents"
        :key="item.id"
      >
        <!-- <v-list-item-avatar>
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar> -->
        <v-list-item-content>
          <v-list-item-title v-text="item.location"></v-list-item-title>
          <v-list-item-subtitle v-text="item.cont"></v-list-item-subtitle>
          <v-list-item-subtitle v-text="item.youtubeLink"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
        </v-card>
        
      </v-card>
    </v-bottom-sheet>
  </div>
  <div id="title"><img
          :src="require(`@/assets/jam-icon.png`)"
          width="25px"
          height="30px" id="jamicon"
        />JAMMAP</div>

  <naver-map
    style="width: 100%; height: 500px"
    :map-options="mapOptions"
    @onLoad="onLoadMap($event)"
  >
    <naver-marker
      v-for="data in datas"
      :key="data.id"
      :latitude="data.lat"
      :longitude="data.lng"
      @onLoad="onLoadMarker($event)"
      @click="onClick(data)"
    >
      <div class="marker">
        <img
          :src="require(`@/assets/marker/${data.imageName}.png`)"
          width="60px"
          height="60px"
        />
      </div> </naver-marker
    >
    <!-- <naver-polyline :path="datas" /> -->
  </naver-map><div>Copyright © 2024 by <a href="https://twitter.com/theminjoo_bot" target="_blank">민주당홍보봇</a>. All Rights Reserved.</div>
  <div style="position:fixed;bottom:0px;right:0px;z-index:99999999" ><img
          :src="require(`@/assets/corner-icon.png`)"
          width="120px"
          height="110px"
        /></div>

        
  
</template>
<script>
import { ref } from "vue";
import { NaverMap } from "vue3-naver-maps";
import { NaverMarker } from "vue3-naver-maps";

import jamData from "@/assets/jamData.js";

export default {
  name: "App",
  components: {
    NaverMap,
    NaverMarker,
  },
  setup() {
    let sheet = ref(false);
    let popContents = ref({});
    const mapOptions = {
      latitude: 37.5731806, // 지도 중앙 위도
      longitude: 127.011421, // 지도 중앙 경도
      zoom: 13,
    };
    const onLoadMarker = (marker) => {
      marker._icon.anchor = new naver.maps.Point(40, 40);
      marker.draw();
      //marker.setAnchor(new naver.maps.Point(0, 0)
      //); // Change Map Center
    };
    const onLoadMap = (map) => {
      console.log(map);
      //marker.setAnchor(new naver.maps.Point(0, 0)
      //); // Change Map Center
    };
    const onClick = (item) => {
      sheet.value = !sheet.value;
      console.log(sheet);
      popContents.value = item;
      //marker.setAnchor(new naver.maps.Point(0, 0)
      //); // Change Map Center
    };
    const datas = jamData;

    return {
      mapOptions,
      datas,
      onLoadMarker,
      onLoadMap,
      onClick,
      popContents,
      sheet,
    };
  },
};
</script>

<style>
#title{font-family: "chab", sans-serif !important;vertical-align: middle;
font-size:30px}
#app {font-family: "DungGeunMo";font-size:14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

@font-face {
  font-family:'chab';
  src: url('assets/fonts/chab.ttf') format('truetype');
   font-weight: normal;
  font-style: normal;
}@font-face {
  font-family: "DungGeunMo";
  src: url("assets/fonts/DungGeunMo.woff2") format("woff2"),
    url("assets/fonts/DungGeunMo.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}
</style>
