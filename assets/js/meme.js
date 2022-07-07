/** Meme Generator Function 
 *  By: Jorich Ponio
 *  Web: https://mccoolot.com
**/

let topTxt, bottomTxt, topTxtSize, bottomTxtSize, imgUpload, createMemeBtn, canvas, ctx;

function createMeme (img, topText, bottomText, topTextSize, bottomTextSize) {
    let fontSize;

    // Size canvas to image
    canvas.width = img.width;
    canvas.height = img.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw main image
    ctx.drawImage(img, 0, 0);

    // Text style: white with black borders
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.textAlign = 'center';

    // Top text font size
    fontSize = canvas.width * topTextSize;
    ctx.font = fontSize + 'px Impact';
    ctx.lineWidth = fontSize / 25;

    // Draw top text
    ctx.textBaseline = 'top';
    topText.split('\n').forEach(function (t, i) {
        ctx.fillText(t, canvas.width / 2, i * fontSize, canvas.width);
        ctx.strokeText(t, canvas.width / 2, i * fontSize, canvas.width);
    });

    // Bottom text font size
    fontSize = canvas.width * bottomTextSize;
    ctx.font = fontSize + 'px Impact';
    ctx.lineWidth = fontSize / 25;

    // Draw bottom text
    ctx.textBaseline = 'bottom';
    bottomText.split('\n').reverse().forEach(function (t, i) { // .reverse() because it's drawing the bottom text from the bottom up
        ctx.fillText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
        ctx.strokeText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
    });
}

function init () {
    // Initialize variables
    topTxt = document.getElementById('top-text');
    bottomTxt = document.getElementById('bottom-text');
    topTxtSize = document.getElementById('top-text-size-input');
    bottomTxtSize = document.getElementById('bottom-text-size-input');
    imgUpload = document.getElementById('image-input');
    createMemeBtn = document.getElementById('generate-btn');
    canvas = document.getElementById('meme-canvas');
    
    ctx = canvas.getContext('2d');

    canvas.width = canvas.height = 0;

    // Default TEXT VALUE
    topTxt.value = bottomTxt.value = 'INSERT TEXT HERE';

    // Generate button click listener
    createMemeBtn.addEventListener('click', function () {
        // Read image as DataURL using the FileReader API
        let reader = new FileReader();
        reader.onload = function () {
            let img = new Image;
            img.src = reader.result;
            createMeme(img, topTxt.value, bottomTxt.value, topTxtSize.value, bottomTxtSize.value);
        };
        reader.readAsDataURL(imgUpload.files[0]);
    });
}

//Download Meme button 
document.getElementById("download").onclick = function () {
    var img = canvas.toDataURL("image/png");
    var link = document.createElement("a");
    link.download = "Meme";
    link.href = img;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
        URL.revokeObjectURL(link.href);
        link.parentNode.removeChild(link);
      }, 0);
  };

init();
