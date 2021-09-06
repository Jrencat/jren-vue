<template>
  <div class="search-wrapper" :class="searchStyle">
     <div class="search-icon" @click.stop="click">
      <i class="el-icon-search" />
    </div>
    <ElAutocomplete
      ref="searchInput"
      v-model="search"
      :fetch-suggestions="querySearch"
      class="search-input"
      placeholder="请输入"
      :trigger-on-focus="false"
      :hide-loading="false"
      @select="change"
    >
      <template slot-scope="{ item }">
        <div class="name">{{ item.value }}</div>
        <span class="addr">{{ item.title.join(' > ') }}</span>
      </template>
    </ElAutocomplete>
  </div>
</template>

<script>
// fuse is a lightweight fuzzy-search module
// make search results more in line with expectations
import Fuse from 'fuse.js';
import path from 'path';

export default {
  name: 'NavSearch',
  props: {
    mode: {
      type: String,
      default: 'input'
    },
    transparent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      search: '',
      options: [],
      searchPool: [],
      show: false,
      fuse: undefined
    };
  },
  computed: {
    searchStyle() {
      return {
        'input-visible': this.mode === 'input' ? true : this.show,
        'transparent': this.transparent
      };
    },
    routes() {
      return this.$store.getters.routes;
    }
  },
  watch: {
    routes() {
      this.searchPool = this.generateRoutes(this.routes);
    },
    searchPool(list) {
      this.initFuse(list);
    },
    show(value) {
      if (value) {
        document.body.addEventListener('click', this.close);
      } else {
        document.body.removeEventListener('click', this.close);
      }
    }
  },
  mounted() {
    this.searchPool = this.generateRoutes(this.routes);
  },
  methods: {
    click() {
      this.show = !this.show;
      if (this.show && this.$refs.searchInput) {
        setTimeout(() => {
          this.$refs.searchInput.focus();
        }, 400);
      }
    },
    close() {
      // this.$refs.searchInput && this.$refs.searchInput.blur();
      this.search = '';
      this.options = [];
      this.$nextTick(() => {
        this.show = false;
      });
      document.body.focus();
    },
    change(val) {
      this.$router.push(val.path);
      this.close();
    },
    initFuse(list) {
      this.fuse = new Fuse(list, {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [{
          name: 'title',
          weight: 0.7
        }, {
          name: 'path',
          weight: 0.3
        }]
      });
    },
    // Filter out the routes that can be displayed in the sidebar
    // And generate the internationalized title
    generateRoutes(routes, basePath = '/', prefixTitle = []) {
      let res = [];

      for (const router of routes) {
        // skip hidden router
        if (router.hidden) { continue }
        if (router.path.indexOf(':') > -1) { continue }

        const data = {
          path: path.resolve(basePath, router.path),
          title: [...prefixTitle]
        };

        if (router.meta && router.meta.title) {
          data.title = [...data.title, router.meta.title];

          if (router.redirect !== 'noRedirect') {
            // only push the routes with title
            // special case: need to exclude parent router without redirect
            res.push(data);
          }
        }

        // recursive child routes
        if (router.children) {
          const tempRoutes = this.generateRoutes(router.children, data.path, data.title);
          if (tempRoutes.length >= 1) {
            res = [...res, ...tempRoutes];
          }
        }
      }
      return res;
    },
    querySearch(query, callback) {
      if (query !== '') {
        this.options = this.fuse.search(query);
      } else {
        this.options = [];
      }
      console.log(query, this.options);
      callback(this.options);
    }
  }
};
</script>

<style lang="scss" scoped>

@import '~@/styles/variables.scss';

  .search-wrapper{
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    min-width: 34px;
    padding: 10px 0;
    &.transparent{
      .search-input{
        ::v-deep {
          .el-input__inner{
            border-color:  #37485D;
            background-color: #37485D;
            color: #fff;
            height: 37px;
            line-height: 35px;
            &:focus{
              background-color: #fff;
              color: #37485D;
            }
          }
        }
      }
    }
  }
  .search-icon{
    cursor: pointer;
    position: absolute;
    z-index: 3;
    width: 32px;
    top: 10px;
    bottom: 10px;
    right: 1px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    transition: all ease-in-out $base-transition-duration;
  }
  .search-input {
    width: 0;
    opacity: 0;
    overflow: hidden;
    position: relative;
    z-index: 2;
    transition: all ease-in-out $base-transition-duration;
  }
  .input-visible {
    .search-icon {
     color: #999;
    }
    .search-input {
      opacity: 1;
      width: 100%;
      max-width: 300px;
    }
  }
</style>
