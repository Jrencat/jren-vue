import { PDFDocument } from '@/utils/pdf-lib';

/**
 * 根据Base64打印PDF
 */
export function printPdfByBase64(base64Data) {
    if (checkIsEmpty(base64Data)) {
        this.$message({
            type: 'warning',
            message: '网络异常，请刷新后再尝试！'
        });
        return;
    }

    // 将blob转为url
    const url = base64ToBlob2(base64Data);
    const link = window.URL.createObjectURL(url);
    window.open('').document.write("<iframe width='100%' type='application/pdf' height='100%' src='" + link + "'></iframe>");
}

export function base64ToBlob2(code) {
    // Base64一行不能超过76字符，超过则添加回车换行符。因此需要把base64字段中的换行符，回车符给去掉，有时候因为存在需要把加号空格之类的换回来，取决于base64存取时的规则。
    code = code.replace(/[\n\r]/g, '');
    var raw = window.atob(code);
    const rawLength = raw.length;
    // 转换成pdf.js能直接解析的Uint8Array类型
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: 'application/pdf' });// 转成pdf类型
}

function checkIsEmpty(object) {
    return Array.isArray(object) ? !object.length : !object;
}

/**
 * 根据Url打印PDF
 */
export function printPdfByUrl(url) {
    window.open('').document.write("<iframe width='100%' type='application/pdf' height='100%' src='" + url + "'></iframe>");
}

/**
 * 根据Url批量打印PDF
 */
export function batchPrintPdfByUrls(that, urls) {
    if (checkIsEmpty(urls)) {
        this.$message({
            type: 'warning',
            message: '网络异常，请刷新后再尝试！'
        });
        that.$_hideLoading();
        return;
    }
    const asyncFun = [];

    asyncFun.push(printAllPDFs(that, urls));
    Promise.all(asyncFun).then(() => {
        that.$_hideLoading();
    });
}

// 合并PDF
async function printAllPDFs(that, urls) {
    // var urls = url.split(',');
    const timeStr = new Date().getTime();
    const pdfDoc = await PDFDocument.create();
    const numDocs = urls.length;
    for (var i = 0; i < numDocs; i++) {
        const donorPdfBytes = await fetch(urls[i]).then(res => res.arrayBuffer()).catch((err) => {
            console.log(err);
            return false;
        });
        if (donorPdfBytes === false) {
            that.$message({
                message: '服务器上不存在该文件，请联系管理员！',
                type: 'error'
            });
            return false;
        }
        const donorPdfDoc = await PDFDocument.load(donorPdfBytes);
        const docLength = donorPdfDoc.getPageCount();
        for (var k = 0; k < docLength; k++) {
            const [donorPage] = await pdfDoc.copyPages(donorPdfDoc, [k]);
            // console.log("Doc " + i+ ", page " + k);
            pdfDoc.addPage(donorPage);
        }
    }
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    // strip off the first part to the first comma "data:image/png;base64,iVBORw0K..."
    var data_pdf = pdfDataUri.substring(pdfDataUri.indexOf(',') + 1);
    const page = window.open('');
    if (page === null) {
        return false;
    }

    // 将blob转为url
    const url = base64ToBlob2(data_pdf);
    const link = window.URL.createObjectURL(url);
    page.document.write("<iframe width='100%' height='100%' src='" + link + "'></iframe>");
    return true;
}

export async function mergePDF(that, url) {
    let urls = url.split(',');
    const base64 = await mergeAllPDFs(that, urls);
    const blob = base64ToBlob2(base64);
    const link = window.URL.createObjectURL(blob);
    return link;
}

// 合并PDF
async function mergeAllPDFs(that, urls) {
    // var urls = url.split(',');
    const timeStr = new Date().getTime();
    const pdfDoc = await PDFDocument.create();
    const numDocs = urls.length;
    for (var i = 0; i < numDocs; i++) {
        const donorPdfBytes = await fetch(urls[i]).then(res => res.arrayBuffer()).catch(() => {
            // throw new Error(err.message);
            // throw new Error('文件地址不正确，请联系管理员！');
            throw '文件地址不正确！';
        });
        const donorPdfDoc = await PDFDocument.load(donorPdfBytes);
        const docLength = donorPdfDoc.getPageCount();
        for (var k = 0; k < docLength; k++) {
            const [donorPage] = await pdfDoc.copyPages(donorPdfDoc, [k]);
            // console.log("Doc " + i+ ", page " + k);
            pdfDoc.addPage(donorPage);
        }
    }
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    // strip off the first part to the first comma "data:image/png;base64,iVBORw0K..."
    var data_pdf = pdfDataUri.substring(pdfDataUri.indexOf(',') + 1);
    return data_pdf;
}
