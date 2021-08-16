<template>
  <form @submit.prevent="onCreateSubmit">
    <div>
      <input
        v-model.trim="title"
        :class="{ error: formError }"
        type="text"
        placeholder="Title"
      />
      <label for="main">Main</label>
      <input v-model="main" type="checkbox" id="main" />
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

    //Установка флага ошибки при пустом поле тайтла
    watch(title, (title) => {
      if (!title) formError.value = true;
      else formError.value = false;
    });

    const onCreateSubmit = () => {
      //Проверка для сабмита изначально пустого поля
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
  padding: 8px 2px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
form input {
  padding: 2px 4px;
  outline: none;
  margin-right: 8px;
  font-size: 14px;
}
form label {
  margin-right: 4px;
}
div {
  display: flex;
  align-items: center;
}
</style>
