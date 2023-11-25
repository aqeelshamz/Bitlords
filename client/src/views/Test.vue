<template>
  <div class="app">
    <div class="flex justify-center my-5">
      <button :class="`mic btn btn-primary `" @click="ToggleMic">Record</button>
    </div>
    <div class="mockup-window border bg-base-300">
      <div class="flex justify-center px-4 py-16 bg-base-200">
        {{ transcript }}
      </div>
    </div>
    <!-- <div class="transcript">{{ transcript }}</div> -->
    <!-- <div>
      <audio
        id="player"
        ref="player"
        :src="mySource"
        type="audio/mpeg"
        controls
        hidden
      ></audio>
      <canvas ref="canvas" />
    </div> -->
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useAVLine } from "vue-audio-visual";
// useAVLine(player, canvas, {
//   src: mySource,
//   canvHeight: 300,
//   canvWidth: 1000,
//   barColor: "lime",
// });

export default {
  setup() {
    const transcript = ref("");
    const player = ref(null);
    const isRecording = ref(false);

    const Recognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const sr = new Recognition();

    onMounted(() => {
      sr.continuous = true;
      sr.interimResults = true;

      sr.onstart = () => {
        console.log("SR Started");
        isRecording.value = true;
      };

      sr.onend = () => {
        console.log("SR Stopped");
        isRecording.value = false;
      };

      sr.onresult = (evt) => {
        for (let i = 0; i < evt.results.length; i++) {
          const result = evt.results[i];

          if (result.isFinal) CheckForCommand(result);
        }

        const t = Array.from(evt.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");

        transcript.value = t;
      };
    });

    function CheckForCommand(result) {
      const t = result[0].transcript;
      if (t.includes("stop recording")) {
        sr.stop();
      }
      {
        sr.stop();
        alert(new Date().toLocaleTimeString());
        setTimeout(() => sr.start(), 100);
      }
    }

    function ToggleMic() {
      if (isRecording.value) {
        sr.stop();
      } else {
        sr.start();
      }
    }

    return { transcript, ToggleMic };
  },
};
</script>

<style>
canvas {
  padding: 0;
  margin: auto;
  display: block;
  width: 800px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.btn-section {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
button {
  padding: 8px 13px;
  border-radius: 5px;
  background-color: rgb(81, 148, 81);
  color: white;
  font-weight: 700;
  font-size: 18px;
  border: none;
  cursor: pointer;
}
.display-section {
  width: 100%;
  text-align: center;
  color: white;
}
.action {
  margin-top: 10px;
  margin-bottom: 10px;
}
.output {
  max-width: 500px;
  padding: 20px;
  border-radius: 10px;
  border: 1px dotted white;
  display: inline-block;
}
</style>
