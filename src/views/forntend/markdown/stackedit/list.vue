<template>
  <div>
    <el-button @click="buttonClick1">点击编辑markdown文件</el-button>
    <el-button @click="buttonClick2">点击编辑markdown文件</el-button>
    <textarea id="stackedit1" hidden></textarea>
    <textarea id="stackedit2" hidden></textarea>
  </div>
</template>

<script>
import Stackedit from 'stackedit';
export default {
  name: 'StackeditList',
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    buttonClick1() {
      const el = document.querySelector('#stackedit1');
      const stackedit = new Stackedit();
      // Open the iframe
      stackedit.openFile({
        name: 'Filename', // with an optional filename
        content: {
          text: el.value // and the Markdown content.
        }
      });
      // Listen to StackEdit events and apply the changes to the textarea.
      stackedit.on('fileChange', (file) => {
        el.value = file.content.text;
      });
    },
    buttonClick2() {
      const el = document.querySelector('#stackedit2');
      const stackedit = new Stackedit();
      // Open the iframe
      stackedit.openFile({
        name: 'Filename',
        content: {
          text: 'Hello **CommonMark** writer!',
          properties: {
            extensions: {
              preset: 'commonmark'
            }
          }
        }
      });
      // Listen to StackEdit events and apply the changes to the textarea.
      stackedit.on('fileChange', (file) => {
        el.value = file.content.text;
      });
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
<style lang="scss">
::v-deep{
  .layout__panel {
    .layout__panel--editor {
      display: none !important;
    }

    .layout__panel--button-bar {
      display: none !important;
    }

    .layout__panel--preview {
      width: 100% !important;
    }

  }
}

</style>


