<template> <naver-map
    style="width: 100%; height: 800px"
    :map-options="mapOptions"
  >
   
    <naver-marker
      v-for="(data) in datas"
      :key="data.id"
      :latitude="data.lat"
      :longitude="data.lng"
    >
      <div class="marker">
        <img :src="require(`@/assets/marker/${data.imageName}.png`)" width="70px" height="90px">
      </div>
    </naver-marker>
  </naver-map>
</template>

<script>

import { NaverMap } from 'vue3-naver-maps'
import { NaverMarker } from 'vue3-naver-maps'

export default {
  name: 'App',
  components: {
    NaverMap,NaverMarker,
  },
  
setup(){
  const mapOptions = {
  latitude: 37.51347, // 지도 중앙 위도
  longitude: 127.041722, // 지도 중앙 경도
  zoom: 13,
}

const datas = [{
  id:'종로',
  lat: 37.51347,
  lng: 127.041722,
  imageName:'marker-icon'
}] // 마커를 그릴 데이터
return {mapOptions, datas,}
}

}
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
