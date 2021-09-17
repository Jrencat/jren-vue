import JSZip from 'jszip';

/**
 * 根据URL下载PDF
 */
export function downloadPdfByUrl(that, url, fileName) {
    fetch(url, { method: 'get', responseType: 'arraybuffer' }).then(function(res) {
        if (res.status !== 200) {
            return res.json();
        }
        return res.arrayBuffer();
    }).then((blobRes) => {
        // 生成 Blob 对象，设置 type 等信息
        const e = new Blob([blobRes], {
            type: 'application/octet-stream',
            'Content-Disposition': 'attachment'
        });
        // 将 Blob 对象转为 url
        const link = window.URL.createObjectURL(e);
        // 创建 a 标签
        const a = document.createElement('a');
        a.href = link;
        a.download = fileName;
        a.click();
    }).catch(() => {
        that.$message({message: '文件地址不正确！', type: 'warning'});
        throw '文件地址不正确';
    });
}

/**
 * 根据Base64下载PDF
 */
export function downloadPdfByBase64(qrBase64, name) {
    // const imgUrl = `data:application/pdf;base64,${qrBase64}`;
    const imgUrl = qrBase64;
    // 如果浏览器支持msSaveOrOpenBlob方法（也就是使用IE浏览器的时候）
    if (window.navigator.msSaveOrOpenBlob) {
        const bstr = atob(imgUrl.split(','[1]));
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        const blob = new Blob([u8arr]);
        window.navigator.msSaveOrOpenBlob(blob, name);
    } else {
        const a = document.createElement('a');
        a.href = imgUrl;
        a.setAttribute('download', name);
        a.click();
    }
}

export function packageDowload(that, data) {
    var zip = new JSZip();
    const asyncFun = [];
    data.forEach(item => {
        asyncFun.push(
            fetch(item, { method: 'get', responseType: 'arraybuffer' }).then(function(res) {
                if (res.status !== 200) {
                    return res.json();
                }
                return res.arrayBuffer();
            }).then((blobRes) => {
                // 生成 Blob 对象，设置 type 等信息
                const e = new Blob([blobRes], {
                    type: 'application/octet-stream',
                    'Content-Disposition': 'attachment'
                });
                zip.file(item.split('/').pop(), e);
            }).catch(() => {
                that.$_hideLoading();
                that.$message({message: '文件地址不正确！', type: 'warning'});
                throw '文件地址不正确';
            })
        );
    });
    Promise.all(asyncFun).then(() => {
        zip.generateAsync({
            type: 'blob'
        }).then(function(content) {
            // 下载的文件名
            var filename = '文件压缩包.zip';
            // 创建隐藏的可下载链接
            var eleLink = document.createElement('a');
            eleLink.download = filename;
            eleLink.style.display = 'none';
            // 下载内容转变成blob地址
            eleLink.href = URL.createObjectURL(content);
            that.$_hideLoading();
            // 触发点击
            document.body.appendChild(eleLink);
            eleLink.click();
            // 然后移除
            document.body.removeChild(eleLink);
        });
    });
}
