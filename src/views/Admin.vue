<template>
  <h1>TreeView CRUD</h1>
  <BrandList />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import BrandList from '@/components/BrandList.vue';

export default defineComponent({
  components: { BrandList },
});
</script>
