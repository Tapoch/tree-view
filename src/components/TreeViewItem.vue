<template>
  <article>
    <strong>{{ name }} ({{ items.length }})</strong>
    <strong @click.prevent="onExpandClick" class="toggle">
      {{ isExpanded ? '>>' : '&lt;&lt;' }}
    </strong>
    <ul v-if="!isExpanded">
      <li v-for="item in preview" :key="item.title">
        - {{ item.title }} (main: {{ item.main }})
      </li>
    </ul>
    <ul v-else>
      <li v-for="item in items" :key="item.title">
        - {{ item.title }} (main: {{ item.main }})
      </li>
    </ul>
  </article>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { BrandItem } from '@/store/state';
export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    items: {
      type: Object as PropType<BrandItem[]>,
      required: true,
    },
    preview: {
      type: Object as PropType<BrandItem[]>,
      required: true,
    },
    isExpanded: {
      type: Boolean,
    },
    isMainExist: {
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const onExpandClick = () => {
      emit('expand', props.name);
    };

    return {
      onExpandClick,
    };
  },
});
</script>
<style scoped>
article {
  margin: 8px auto;
  border-bottom: 1px solid lightgray;
}
article:last-child {
  border-bottom: none;
  padding-bottom: 10px;
}
article > strong {
  margin-right: 8px;
}
.toggle {
  cursor: pointer;
}
</style>
