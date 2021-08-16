<template>
  <h1>TreeView</h1>
  <TreeView />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TreeView from '@/components/TreeView.vue';

export default defineComponent({
  name: 'Home',
  components: { TreeView },
});
</script>
