export default function dataURItoBlob(dataURI) {
    // Convert base64/URLEncoded data component to raw binary data held in a string
    const byteString = atob(dataURI.split(",")[1]);

    // Separate out the mime component
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // Write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
}
