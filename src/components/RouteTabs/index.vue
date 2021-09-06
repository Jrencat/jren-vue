<template>
  <div class="route-tabs">
    <router-link v-for="item in items" :key="item.path" :to="item.path" active-class="active" class="tabs-item">{{ item.meta.title }}</router-link>
  </div>
</template>

<script>

export default {
  components: { },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  computed: {

  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.route-tabs{
  display: flex;
  align-items: flex-end;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}
.tabs-item{
  display: inline-block;
  // background-color: #fff;
  border-left: 1px solid transparent;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid transparent;
  padding: $base-spacing  $base-spacing * 2;
  transition: all ease-in-out $base-transition-duration;
  font-weight: normal;
  margin-bottom: -1px;
  position: relative;
  // &+&{
  //   // margin-left: 1px;
  //   // border-right: 1px solid #eee;
  // }
  &::before{
    content: '';
    display: block;
    // width: 100%;
    position: absolute;
    top: 0;
    left: -1px;
    right: -1px;
    height: 3px;
    background: transparent;
  }
  &:last-child{
    border-right-color: transparent ;
  }
  &.active{
    color: $primary;
    font-weight: bold;
    // border-top-color: $primary;
    border-bottom-color: #fff;
    &:last-child{
      border-right-color: #ddd ;
    }
    &::before{
      background: $primary
    }
  }
}
</style>
