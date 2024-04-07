<template>
  <div class="text-center">
    <v-bottom-sheet v-model="sheet">
      <v-card height="200">
        <v-card-text>
          <v-btn variant="text" @click="sheet = !sheet"> X </v-btn>

          <br />
          <br />

          <div>{{ popContents }}</div>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>
  <Div>jjammap</Div>

  <naver-map
    style="width: 100%; height: 800px"
    :map-options="mapOptions"
    @onLoad="onLoadMap($event)"
  >
    <naver-marker
      v-for="data in datas"
      :key="data.id"
      :latitude="data.lat"
      :longitude="data.lng"
      @onLoad="onLoadMarker($event)"
      @click="onClick(data.id)"
    >
      <div class="marker">
        <img
          :src="require(`@/assets/marker/${data.imageName}.png`)"
          width="60px"
          height="60px"
        />
      </div> </naver-marker
    ><naver-polyline :path="datas" />
  </naver-map>
</template>
<script>
import { ref } from "vue";
import { NaverMap } from "vue3-naver-maps";
import { NaverMarker } from "vue3-naver-maps";
import { NaverPolyline } from "vue3-naver-maps";

import jamData from "@/assets/jamData.js";

export default {
  name: "App",
  components: {
    NaverMap,
    NaverMarker,
    NaverPolyline,
  },
  setup() {
    let sheet = ref(false);
    let popContents = ref("");
    const mapOptions = {
      latitude: 37.51347, // 지도 중앙 위도
      longitude: 127.041722, // 지도 중앙 경도
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
    const onClick = (id) => {
      sheet.value = !sheet.value;
      console.log(sheet);
      popContents.value = id;
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
