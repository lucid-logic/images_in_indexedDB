<template>
  <div v-for="(photo, index) in images" :key="index">
    <img width="200" v-bind:src="photo" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    var images = ref([]);

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

    request.onupgradeneeded = function () {};

    request.onsuccess = function () {
      console.log("Database opened successfully");

      const db = request.result;

      // 1
      const transaction = db.transaction("photos", "readwrite");

      //2
      const store = transaction.objectStore("photos");
      const idQuery = store.getAll();
      idQuery.onsuccess = function () {
        console.log("idQuery", idQuery.result);
        images.value = idQuery.result.map((photo) => JSON.parse(photo.photo));
        console.log("images", images.value);
        console.log(JSON.parse(localStorage.getItem("photos") || "[]"));
      };
    };

    return {
      images,
    };
  },
});
</script>
