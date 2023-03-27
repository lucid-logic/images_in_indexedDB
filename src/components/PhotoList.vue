<template>
  <div v-for="(photo, index) in photoList" :key="index">
    Photo {{ index }}<br />
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  setup() {
    const photoList = computed(() => {
      return JSON.parse(localStorage.getItem("photos") || "[]");
    });

    return {
      photoList,
    };
  },
});
</script>
