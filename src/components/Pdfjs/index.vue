<template>
  <div class="pdf-view" style="border: 1px #1a2226">
    <div id="viewerContainer" ref="container" style="width: 840px;display:flex;flex-direction:column;margin: 0 auto">
      <div id="viewer" class="pdfViewer" />
    </div>
  </div>
</template>

<script>
import { getPdfjsDist } from '@/components/Pdfjs/getPdfjsDist';

export default {
  name: 'Pdf',
  props: {
    url: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'canvas'
    },
    pdfjsDistPath: {
      type: String,
      default: '.'
    }
  },
  data() {
    return {
      newPage: false,
      pdfViewer: null,
      pdfLinkService: null,
      currentScale: 'page-width',
      loadingTask: null
    };
  },
  watch: {
    url() {
      // 如果存在pdfViewer则取消渲染
      if (this.pdfViewer) {
        this.pdfViewer._cancelRendering();
      }
      this.renderPdf();
    }
  },
  mounted() {
    if (this.$route.query.url && this.$route.query.pdfjsDistPath) {
      this.url = this.$route.query.url;
      this.pdfjsDistPath = this.$route.query.pdfjsDistPath;
      this.newPage = true;
    }
    const that = this;

    this.pdfLibInit().then(() => {
      this.renderPdf().then(item => {
        this.$_hideLoading();
        setTimeout(function() {
          const div1 = document.getElementById('viewerContainer');
          div1.style.width = '';
          if (that.newPage) {
            const div2 = document.getElementsByClassName('page')[0];
            div2.setAttribute('style', 'width: 860px !important');
          }
        }, 100);
        if (item === false) {
          this.$message({
            message: '服务器上不存在该文件，请联系管理员！',
            type: 'error'
          });
        }
      });
    });
  },

  methods: {
    onPagesInit({ source }) {
      source.currentScaleValue = this.currentScale;
    },
    async pdfLibInit() {
      let pdfjsLib = window.pdfjsLib;
      let pdfjsViewer = window.pdfjsViewer;
      if (!pdfjsLib || !pdfjsViewer) {
        try {
          await getPdfjsDist(this.pdfjsDistPath);
          this.CMAP_URL = `${this.pdfjsDistPath}/pdf/cmaps/`;
          console.log(this.CMAP_URL);
          pdfjsLib = window.pdfjsLib;
          pdfjsLib.GlobalWorkerOptions.workerSrc = `${this.pdfjsDistPath}/pdf/build/pdf.worker.js`;
          pdfjsViewer = window.pdfjsViewer;
        } catch (error) {
          // console.log(error)
          // pdfjs文件获取失败
          return;
        }
      }

      const container = this.$refs.container;
      const eventBus = new pdfjsViewer.EventBus();

      // (Optionally) enable hyperlinks within PDF files.
      const pdfLinkService = new pdfjsViewer.PDFLinkService({
        eventBus: eventBus
      });
      this.pdfLinkService = pdfLinkService;
      const pdfViewer = new pdfjsViewer.PDFViewer({
        container: container,
        eventBus: eventBus,
        linkService: pdfLinkService,
        renderer: this.type,
        textLayerMode: 0,
        downloadManager: new pdfjsViewer.DownloadManager({}),
        enableWebGL: true
      });
      this.pdfViewer = pdfViewer;
      pdfLinkService.setViewer(pdfViewer);

      eventBus.on('pagesinit', this.onPagesInit);
    },
    renderPdf() {
      if (!this.url) { return }
      // Loading document.
      if (this.pdfViewer === null || this.pdfLinkService === null) {
        return;
      }
      if (this.loadingTask !== null) {
        this.loadingTask.destroy();
        this.loadingTask = null;
      }
      this.loadingTask = window.pdfjsLib.getDocument({
        cMapUrl: this.CMAP_URL,
        cMapPacked: true,
        url: this.url
      });
      return this.loadingTask.promise.then((pdfDocument) => {
        if (pdfDocument.loadingTask.destroyed || !this.url) { return }
        this.pdfViewer.setDocument(pdfDocument);
        this.pdfLinkService.setDocument(pdfDocument, null);
        this.loadingTask = null;
      }).catch(error => {
        console.log(error);
        return false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep {
  .pdfViewer .page {
    overflow: hidden;
    height: 100% !important;
    width: 100% !important;
  }
  .pdfViewer .page .canvasWrapper {
    width: 100% !important;
  }
  .pdfViewer .page canvas {
    width: 100% !important;
  }
}
</style>
