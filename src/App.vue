<template>
  <div>
    <v-bottom-sheet v-model="sheet">
      <v-card height="200" class="card">
        <v-card>
          <!-- <v-btn variant="text" @click="sheet = !sheet"> X </v-btn> -->
          <v-list
             class="card"><v-list-item
              v-for="item in popContents.popContents"
              :key="item.id"
            >
              <v-list-item-avatar>
                <v-img
                  :src="getThum(item.youtubeLink)"
                  width="80px"
                  height="60px"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="item.location"></v-list-item-title>
                <v-list-item-subtitle v-text="item.cont"></v-list-item-subtitle>
                <a :href="item.youtubeLink" target="_blank"
                  ><v-list-item-subtitle
                    v-text="item.youtubeLink"
                  ></v-list-item-subtitle
                ></a>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-card>
    </v-bottom-sheet>
  </div>
  <div id="title">
    <img
      :src="require(`@/assets/jam-icon.png`)"
      width="35px"
      height="40px"
      id="jamicon"
    />
    JAMMAP
    <img
      :src="require(`@/assets/jam-icon.png`)"
      width="35px"
      height="40px"
      id="jamicon"
    />
  </div>
  <div class="tape tape-2" ></div>
  <div class="tape tape-1" :style="sheet ? `display:none` : ``"></div>

  <naver-map
    style="width: 100%; height: 50vh"
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
      </div>
    </naver-marker>
    <!-- <naver-polyline :path="datas" /> -->
  </naver-map>
  <div id="bottom">
    📌첫 지도 화면은 이재명 대표님의 첫 일정(서울 종로 곽상언 개소식) 기준<br />
    📌지도 속 대표님을 클릭하면 유세 내용 및 유투브 영상을 확인할 수 있습니다<br />
    Copyright © 2024 by
    <a href="https://twitter.com/theminjoo_bot" target="_blank">민주당홍보봇</a
    >. All Rights Reserved.
  </div>
  <div style="position: fixed; bottom: 0px; right: 0px; z-index: 99999999">
    <img
      :src="require(`@/assets/corner-icon.png`)"
      width="120px"
      height="110px"
    />
  </div>
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
    const getThum = (youtubeUrl) => {
      let thumUrl = "";
      let finUrl = "";
      if (youtubeUrl !== "") {
        let replaceUrl = youtubeUrl;
        replaceUrl = replaceUrl.replace("https://youtu.be/", "");
        replaceUrl = replaceUrl.replace("https://www.youtube.com/embed/", "");
        replaceUrl = replaceUrl.replace("https://www.youtube.com/live/", "");
        replaceUrl = replaceUrl.replace("https://www.youtube.com/watch?v=", "");
        finUrl = replaceUrl.split("?")[0];
      }
      thumUrl = "https://img.youtube.com/vi/" + finUrl + "/mqdefault.jpg";
      return thumUrl;
    };

    return {
      mapOptions,
      datas,
      onLoadMarker,
      onLoadMap,
      onClick,
      popContents,
      sheet,
      getThum,
    };
  },
};
</script>

<style>
html {
  font-family: "DNFBitBitTTF", sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #094072;
  --background-color: #fffaf0;
  --line-color: #bce1ff;
  --spacing: 40px;
  --line-thickness: 6px;
  --line-spacing: calc(var(--spacing) - var(--line-thickness));

  background: linear-gradient(
        to bottom,
        transparent var(--line-spacing),
        var(--line-color) var(--line-spacing)
      )
      0 0 / 100vw var(--spacing) repeat-y,
    linear-gradient(
        to right,
        transparent var(--line-spacing),
        var(--line-color) var(--line-spacing)
      )
      0 0 / var(--spacing) 100vh repeat-x var(--background-color);
}

.tape {
  position: absolute;
  height: 80px;
  width: 30px;
  opacity: 0.5;
  background: repeating-linear-gradient(
    45deg,
    #00a6ac 0,
    #094072 5px,
    transparent 5px,
    #01378c 10px,
    #0b68b3 10px,
    transparent 15px
  );
  transform: rotate(45deg);
  z-index: 99999999;
}
.tape-1 {
  bottom: 25vh;
  right: 4vh;
}
.tape-2 {
  top: 10vh;
  left: 4vh;
}
.card{background-color: 
    #bce1ff;
    color:#094072;
}
#jamicon {
  transform: rotate(30deg);
}

#title {
  margin-top: 20px;
  margin-bottom: 20px;
  vertical-align: middle;
  font-size: 40px;
  -webkit-text-stroke: 2px #fff;
}

#bottom {
  font-size: 13px;
  padding-top: 10px;
  -webkit-text-stroke: 0.2px #fff;
}
#app {
  text-align: center;
}


@font-face {
  font-family: "chab";
  src: url("assets/fonts/chab.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "DNFBitBitTTF";
  src: url("assets/fonts/DNFBitBitTTF.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
</style>
