<template>
  <div v-if="isLoading">Loading...</div>
  <section v-else>
    <BrandForm />
    <BrandItem v-for="item in items" :key="item._id" v-bind="item" />
  </section>
</template>
<script lang="ts">
import { ActionType } from '@/store/actions';
import { computed, defineComponent, onMounted } from 'vue';
import { useStore } from '@/store';
import BrandItem from '@/components/BrandItem.vue';
import BrandForm from '@/components/BrandForm.vue';

export default defineComponent({
  components: { BrandItem, BrandForm },
  setup() {
    const store = useStore();
    const items = computed(() => store.state.items);
    const isLoading = computed(() => store.state.isLoading);
    onMounted(() => {
      store.dispatch(ActionType.GetBrandItems);
    });
    return { items, isLoading };
  },
});
</script>
