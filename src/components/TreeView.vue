<template>
  <div class="filter">
    <span
      @click.prevent="sortOrder = 'SORTED_ASC'"
      v-html="sortedAscText"
    ></span>
    <span
      @click.prevent="sortOrder = 'SORTED_DESC'"
      v-html="sortedDescText"
    ></span>
  </div>
  <div class="search">
    <input v-model="query" type="search" />
    <span
      @click.prevent="isCaseSensitive = !isCaseSensitive"
      class="search__case"
      :class="{ search__case_active: isCaseSensitive }"
      >Aa</span
    >
    <div v-if="isCaseSensitive">(поиск с учетом регистра включен)</div>
    <div v-else>(поиск с учетом регистра выключен)</div>
  </div>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="brandGroups.length">
    <TreeViewItem
      v-for="group in brandGroups"
      :key="group.name"
      v-bind="group"
      @expand="onExpandClick"
    />
  </div>
  <div v-else>Результат отсутствует</div>
</template>
<script lang="ts">
import { useStore } from '@/store';
import { ActionType } from '@/store/actions';
import { GetterType } from '@/store/getters';
import { BrandItem } from '@/store/state';
import TreeViewItem from '@/components/TreeViewItem.vue';
import { computed, defineComponent, watch, onMounted, ref } from 'vue';

type BrandGroup = {
  name: string;
  items: BrandItem[];
  isExpanded: boolean;
  preview: BrandItem[];
  isMainExist: boolean;
};

export default defineComponent({
  components: { TreeViewItem },
  setup() {
    const store = useStore();

    const brandGroups = ref<BrandGroup[]>([]);
    const query = ref('');
    const isCaseSensitive = ref(false);
    const sortOrder = ref<GetterType>(GetterType.sortedAsc);

    const items = computed(() => {
      //Если задано поисковое слово
      if (query.value) {
        return store.getters[sortOrder.value].filter((item: BrandItem) => {
          //Для чувствительного регистра
          if (isCaseSensitive.value) {
            return item.title.includes(query.value);
          }
          return item.title.toLowerCase().includes(query.value.toLowerCase());
        });
      }
      //Обновляем стейт при сортировке
      return store.getters[sortOrder.value].filter(
        (item: BrandItem) => !!item.title
      );
    });
    const isLoading = computed(() => store.state.isLoading);
    const sortedAscText = computed(() =>
      sortOrder.value === GetterType.sortedAsc ? '🌝 <b>(A-Z)</b>' : '🌚 (A-Z)'
    );
    const sortedDescText = computed(() =>
      sortOrder.value === GetterType.sortedDesc ? '🌝 <b>(Z-A)</b>' : '🌚 (Z-A)'
    );

    onMounted(() => {
      store.dispatch(ActionType.GetBrandItems);
    });

    watch(items, (items) => {
      brandGroups.value = [];
      groupItems(items);
    });

    const groupItems = (items: BrandItem[]): void => {
      //Проходим одним циклом элементы
      items.forEach((item) => {
        const firstChar = item.title.charAt(0).toUpperCase();

        //Флаг успешного определения элемента в группу
        let added = false;

        //Поиск группы
        brandGroups.value.forEach((brandGroup: BrandGroup) => {
          if (brandGroup.name !== firstChar) {
            return;
          }

          brandGroup.items.push(item);
          added = true;

          //Добавляем main элементы к существующим
          if (brandGroup.isMainExist && item.main) {
            brandGroup.preview.length < 5 && brandGroup.preview.push(item);
          } else if (item.main) {
            brandGroup.isMainExist = true;
            //Иначе переопределяем список превью, если впервые найден main
            brandGroup.preview = [item];
          } else if (!brandGroup.isMainExist) {
            //Иначе заполняем обычными элементами
            brandGroup.preview.length < 5 && brandGroup.preview.push(item);
          }
        });

        //Если группа не была найдена в цикле, то создаем ее
        if (!added) {
          brandGroups.value.push({
            name: firstChar,
            items: [item],
            isExpanded: false,
            preview: [item],
            isMainExist: item.main || false,
          });
        }
      });
    };

    const onExpandClick = (groupName: string) => {
      brandGroups.value = brandGroups.value.map((brandGroup: BrandGroup) => {
        if (brandGroup.name === groupName) {
          brandGroup.isExpanded = !brandGroup.isExpanded;
        }
        return brandGroup;
      });
    };

    return {
      brandGroups,
      isLoading,
      query,
      isCaseSensitive,
      sortOrder,
      sortedAscText,
      sortedDescText,
      onExpandClick,
    };
  },
});
</script>
<style scoped>
.filter {
  padding: 8px 0;
}
.filter span {
  margin-right: 4px;
  cursor: pointer;
}
.search {
  padding: 8px 0;
}
.search input[type='search'] {
  font-size: 14px;
  width: 100%;
  padding: 2px 4px;
  outline: none;
}
.search__case {
  padding: 4px;
  display: inline-block;
  margin: 4px auto;
  cursor: pointer;
  border: 2px solid black;
  user-select: none;
}
.search__case_active {
  background: lightseagreen;
}
.search > div {
  font-size: 12px;
}
</style>
