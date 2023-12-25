// function dataURLtoBlob(dataURL) {
//     var byteString = atob(dataURL.split(',')[1]);
//     var ab = new ArrayBuffer(byteString.length);
//     var ia = new Uint8Array(ab);

//     for (var i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//     }

//     return new Blob([ab], { type: 'image/png' }); // Adjust the MIME type accordingly
// }

export function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
