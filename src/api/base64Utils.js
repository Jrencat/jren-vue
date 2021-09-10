export function base64ToLink(base64Data) {
    const blob2 = base64ToBlob2(base64Data);
    const link = window.URL.createObjectURL(blob2);
    return link;
}

export function base64ToBlob2(code) {
    // Base64一行不能超过76字符，超过则添加回车换行符。因此需要把base64字段中的换行符，回车符给去掉，有时候因为存在需要把加号空格之类的换回来，取决于base64存取时的规则。
    code = code.split(',')[1];
    code = code.replace(/[\n\r]/g, '');
    var raw = window.atob(code);
    const rawLength = raw.length;
    // 转换成pdf.js能直接解析的Uint8Array类型
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }
    // 转成pdf类型
    return new Blob([uInt8Array], { type: 'application/pdf' });
}

export function blob2ToLink(blob2) {
    return window.URL.createObjectURL(blob2);
}
