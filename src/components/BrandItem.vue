<template>
  <!-- Обычное отображение -->
  <article v-if="!isEditing" class="row">
    <div class="item-info">
      <span v-if="main" class="item-info__main">✅</span>
      <span v-html="title"></span>
      <span
        v-html="_id"
        style="margin-left: 8px; font-size: 10px; color: gray"
      ></span>
    </div>
    <div>
      <button @click.prevent="onEditClick">Edit</button>
      <button @click.prevent="onDeleteClick">Delete</button>
    </div>
  </article>
  <!-- Режим редактирования -->
  <form @submit.prevent="onSaveSubmit" v-else class="row">
    <div class="item-info">
      <input v-model="formMain" type="checkbox" class="item-info__main" />
      <input
        v-model.trim="formTitle"
        :class="{ error: formError }"
        type="text"
      />
      <span
        v-html="_id"
        style="margin-left: 8px; font-size: 10px; color: gray"
      ></span>
    </div>
    <div>
      <button>Save</button>
      <button @click.prevent="onCancelClick">Cancel</button>
    </div>
  </form>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useStore } from '@/store';
import { BrandItem } from '@/store/state';
import { MutationType } from '@/store/mutations';
import { ActionType } from '@/store/actions';

export default defineComponent({
  props: {
    _id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    main: {
      type: Boolean,
      required: true,
    },
    isEditing: {
      type: Boolean,
    },
  },
  setup(props) {
    const store = useStore();

    const formTitle = ref('');
    const formMain = ref(false);
    const formError = ref(false);

    //Установка флага ошибки при пустом поле тайтла во время редактирования
    watch(formTitle, (formTitle) => {
      if (!formTitle) formError.value = true;
      else formError.value = false;
    });

    //Заполнение полей в режиме редактирования значениями из пропс
    onMounted(() => {
      formTitle.value = props.title;
      formMain.value = props.main;
      formError.value = false;
    });

    //Установка флага редактирования в элементе стора
    const onEditClick = () => {
      const items = store.state.items.map((item: BrandItem) => {
        if (props._id === item._id) {
          item.isEditing = true;
          return item;
        }
        return { ...item, isEditing: false };
      });
      store.commit(MutationType.SetItems, items);
    };

    const onDeleteClick = () => {
      if (!confirm('Are you sure about that?')) {
        return;
      }
      store.dispatch(ActionType.DeleteBrandItem, props._id);
    };

    const onSaveSubmit = () => {
      if (formError.value) {
        return;
      }
      //Сброс редактирования для неизмененных значений
      if (formTitle.value === props.title && formMain.value === props.main) {
        resetEditing();
        return;
      }
      store.dispatch(ActionType.UpdateBrandItem, {
        _id: props._id,
        data: { title: formTitle.value, main: formMain.value },
      });
    };

    const onCancelClick = () => resetEditing();

    //Сброс флагов редактирования всех элементов стора
    const resetEditing = () => {
      const items = store.state.items.map((item: BrandItem) => {
        return { ...item, isEditing: false };
      });
      store.commit(MutationType.SetItems, items);
    };

    return {
      onEditClick,
      onDeleteClick,
      onSaveSubmit,
      onCancelClick,
      formTitle,
      formMain,
      formError,
    };
  },
});
</script>
<style scoped>
.row {
  padding: 8px 2px;
  background: white;
  display: flex;
  justify-content: space-between;
}
.row:nth-child(odd) {
  background: lightgray;
}
.item-info__main {
  margin-right: 2px;
}
</style>
