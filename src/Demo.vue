<template>
  <div class="demo-container">
    <button class="primary" @click="toggleChild">toggleChild</button>
    <br/>
    <br/>
    <Child v-if="mountChild"></Child>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api';
import Child from './Child.vue';

export default {
  components: {
    Child,
  },
  setup() {
    const mountChild = ref(true);

    const toggleChild = () => {
      mountChild.value = !mountChild.value;
    };

    return {
      mountChild,
      toggleChild,
    };
  },
};
</script>
