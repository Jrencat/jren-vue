
<template>
  <transition>
    <template v-if="isMenuItem(item)">
      <ElMenuItem :index="item.unitCodePath" @click="navTo(item)">
        <MenuTitle :icon="item.iconFileName" :title="item.unitName" />
      </ElMenuItem>
    </template>

    <ElSubmenu v-else :popper-append-to-body="false" :index="item.unitCodePath">
      <template slot="title">
        <MenuTitle :icon="item.iconFileName" :title="item.unitName" />
      </template>
      <AppMenuItem
        v-for="child in item._children"
        :key="child.unitCodePath"
        :is-nest="true"
        :item="child"
        :action="child.unitAction"
      />
    </ElSubmenu>
  </transition>
</template>
<script>

import MenuTitle from './MenuTitle';
import FixiOSBug from './FixiOSBug';
import { mapGetters } from 'vuex';

export default {
  name: 'AppMenuItem',
  components: {
    MenuTitle
  },
  mixins: [FixiOSBug],
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      'unitMap'
    ])
  },
  methods: {
    isMenuItem(item) {
      return !item._children;
    },
    navTo(unit) {
      this.$router.push(unit.unitAction);
    }
  }
};
</script>
