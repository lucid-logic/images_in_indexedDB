<template>
  <br />
  <router-link class="row" to="/"> Take Photo </router-link>
  <br />
  <image-list v-if="true"></image-list>
</template>

<script>
import { defineComponent } from "vue";
import ImageList from "src/components/imageList.vue";

export default defineComponent({
  components: { ImageList },
  setup() {
    return {};
  },
});
</script>
