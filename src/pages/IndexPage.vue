<template>
  <q-page class="flex flex-center">
    <div style="text-align: center" align="center">
      <router-link
        class="row"
        to="/images"
        align="center"
        style="text-align: center"
      >
        View Images </router-link
      ><br />

      <q-btn class="row" @click="cameraPhoto" color="primary" align="center">
        Take photo
      </q-btn>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { useQuasar } from "quasar";
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";

//import { Plugins } from "@capacitor/core";

export default defineComponent({
  components: {},
  name: "IndexPage",
  setup() {
    var db = null;
    const indexedDB =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB ||
      window.shimIndexedDB;

    if (!indexedDB) {
      console.log("IndexedDB could not be found in this browser.");
    }

    // 2
    const request = indexedDB.open("photoDatabase", 1);

    request.onerror = function (event) {
      console.error("An error occurred with IndexedDB");
      console.error(event);
    };

    request.onupgradeneeded = function () {
      //1
      const db = request.result;

      //2
      const store = db.createObjectStore("photos", { keyPath: "id" });

      //3
    };

    request.onsuccess = function () {
      console.log("Database opened successfully");

      db = request.result;
    };

    const $q = useQuasar();

    async function cameraPhoto() {
      try {
        $q.notify({
          message: "taking photo",
          color: "positive",
        });
        console.log("taking photo...");
        await takePhoto();
      } catch (e) {
        $q.notify({
          message: e,
          color: "negative",
        });
        console.log(e);
      }
    }

    async function takePhoto() {
      //const { Camera } = Plugins;

      try {
        const photo = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          quality: 100,
        });
        const response = await fetch(photo.webPath);
        const blob = await response.blob();
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
          var base64data = reader.result;
          const transaction = db.transaction("photos", "readwrite");
          const store = transaction.objectStore("photos");

          store.put({
            id: Date.now(),
            photo: JSON.stringify(base64data),
          });
        };
      } catch (error) {
        console.log(error.message);
      }
    }

    return { cameraPhoto };
  },
  mounted() {
    defineCustomElements(window);
  },
});
</script>
