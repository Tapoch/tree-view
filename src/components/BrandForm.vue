<template>
  <form @submit.prevent="onCreateSubmit">
    <div>
      <input v-model="main" type="checkbox" />
      <input v-model.trim="title" :class="{ error: formError }" type="text" />
    </div>
    <button>Create</button>
  </form>
</template>
<script lang="ts">
import { useStore } from '@/store';
import { ActionType } from '@/store/actions';
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  setup() {
    const store = useStore();
    const title = ref('');
    const main = ref(false);
    const formError = ref(false);

    watch(title, (title) => {
      if (!title) formError.value = true;
      else formError.value = false;
    });

    const onCreateSubmit = () => {
      if (!title.value) {
        formError.value = true;
        return;
      }
      store.dispatch(ActionType.CreateBrandItem, {
        title: title.value,
        main: main.value,
      });
    };
    return {
      title,
      main,
      formError,
      onCreateSubmit,
    };
  },
});
</script>
<style scoped>
form {
  border: 1px solid lightgray;
  padding: 8px 2px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
div {
  display: flex;
  align-items: center;
}
</style>
