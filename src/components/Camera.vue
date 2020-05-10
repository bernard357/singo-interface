<!-- Credit: https://medium.com/theodo/a-progressive-web-application-with-vue-js-webpack-material-design-part-4-96c8c216810b -->

<template>
  <v-card class="mr-auto mt-6"
          max-width="400"
          tile >

    <v-container class="mx-auto">

      <video ref="video" id="video" width="100%" height="100%" autoplay />

    </v-container>

    <v-card-actions>
      <v-btn primary large block @click="capture"><v-icon>mdi-camera-iris</v-icon></v-btn>
    </v-card-actions>

  </v-card>

  <!-- <div id="camera">
    <div>
    </div>
    <div>
      <button id="snap" v-on:click="capture()">Snap Photo</button>
    </div>
    <canvas ref="canvas" id="canvas" width="100%" height="100%" />
  </div> -->

</template>

<script>
// import { c11n } from '@/customization'
import bus from '@/event-bus'

export default {

  name: 'Camera',

  data() {
    return {
      mediaStream: null,
      active: false,
    }
  },

  methods: {

    activate() {

    },

    beginSession() {

      navigator.mediaDevices.getUserMedia({ video: true }).then(
        mediaStream => {
          this.mediaStream = mediaStream
          this.$refs.video.srcObject = mediaStream
          this.$refs.video.play()
        },
        error => {
          bus.$emit('alert', {message: error, code: 951 })
        }
      )

    },

    endSession() {
      if (this.mediaStream) {
        const tracks = this.mediaStream.getTracks()
        tracks.map(track => track.stop())
      }
    },

    capture() {
      console.log("capture!")
      const mediaStreamTrack = this.mediaStream.getVideoTracks()[0]
      const imageCapture = new window.ImageCapture(mediaStreamTrack)
      return imageCapture.takePhoto().then(blob => {
        console.log(blob)
      })
    }

  },

  mounted() {
  },

  destroyed() {
    this.endSession()
  },


}
</script>

<style scoped>
  #camera {
      text-align: center;
      color: #2c3e50;
  }

  #video {
      background-color: #000000;
  }

  #canvas {
      display: none;
  }

  li {
      display: inline;
      padding: 5px;
  }

</style>
