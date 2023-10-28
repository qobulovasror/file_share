var isAdvancedUpload = (function () {
  var div = document.createElement("div");
  return (
    ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
    "FormData" in window &&
    "FileReader" in window
  );
})();

let draggableFileArea = document.querySelector(".drag-file-area");
let browseFileText = document.querySelector(".browse-files");
let uploadIcon = document.querySelector(".upload-icon");
let dragDropText = document.querySelector(".dynamic-message");
let fileInput = document.querySelector(".default-file-input");
let cannotUploadMessage = document.querySelector(".cannot-upload-message");
let cannotUploadMessage2 = document.querySelector(".cannot-upload-message2");
let cancelAlertButton = document.querySelector(".cancel-alert-button");
let cancelAlertButton2 = document.querySelector(".cancel-alert-button2");
let uploadedFile = document.querySelector(".file-block");
let fileName = document.querySelector(".file-name");
let fileSize = document.querySelector(".file-size");
let progressBar = document.querySelector(".progress-bar");
let removeFileButton = document.querySelector(".remove-file-icon");
let uploadButton = document.querySelector(".upload-button");
let submit = document.querySelector(".form-container");
let fileFlag = 0;

let errorAlertButton = document.querySelector(".cancel-alert-button3");
let errorMessage = document.querySelector(".cannot-upload-message3");

fileInput.addEventListener("click", () => {
  fileInput.value = "";
});

fileInput.addEventListener("change", (e) => {
  uploadIcon.innerHTML = "check_circle";
  dragDropText.innerHTML = "Fayl tanlandi";
  // document.querySelector(".label").innerHTML = `<input type="file" class="default-file-input" style="display: none"/>`;
  document.querySelector(".label").style.display = "none"
  uploadButton.innerHTML = `Yuborish`;
  if(fileInput.files[0].name.length > 27){
    fileName.innerHTML = fileInput.files[0].name.slice(0, 25)+"...";
  }
  fileName.innerHTML = fileInput.files[0].name;
  fileSize.innerHTML = (fileInput.files[0].size / 1024).toFixed(1) + " KB";
  uploadedFile.style.cssText = "display: flex;";
  progressBar.style.width = 0;
  fileFlag = 0;
});

let isSuccsess = false;
submit.addEventListener("submit", (e) => {
  if (!isSuccsess) e.preventDefault();
  let isFileUploaded = fileInput.value;
  if (isFileUploaded != "") {
    if (fileInput.files[0].size / 1024 / 1024 < 5) {
      fileFlag = 1;
      isSuccsess = true;
      e.target.submit();
    } else {
      cannotUploadMessage2.style.cssText =
        "display: flex; animation: fadeIn linear 1.5s;";
    }
  } else {
    cannotUploadMessage.style.cssText =
      "display: flex; animation: fadeIn linear 1.5s;";
  }
});

cancelAlertButton.addEventListener("click", () => {
  cannotUploadMessage.style.cssText = "display: none;";
});
cancelAlertButton2.addEventListener("click", () => {
  cannotUploadMessage2.style.cssText = "display: none;";
});

if (isAdvancedUpload) {
  [
    "drag",
    "dragstart",
    "dragend",
    "dragover",
    "dragenter",
    "dragleave",
    "drop",
  ].forEach((evt) =>
    draggableFileArea.addEventListener(evt, (e) => {
      e.preventDefault();
      e.stopPropagation();
    })
  );

  ["dragover", "dragenter"].forEach((evt) => {
    draggableFileArea.addEventListener(evt, (e) => {
      e.preventDefault();
      e.stopPropagation();
      uploadIcon.innerHTML = "file_download";
      dragDropText.innerHTML = "Drop your file here!";
    });
  });

  draggableFileArea.addEventListener("drop", (e) => {
    uploadIcon.innerHTML = "check_circle";
    dragDropText.innerHTML = "Fayl tanlandi";
    // document.querySelector(
    //   ".label"
    // ).innerHTML = `<input type="file" class="default-file-input" style="display: none"/>`;
    document.querySelector(
      ".label"
    ).style.display = "none";
    uploadButton.innerHTML = `Yuborish`;

    let files = e.dataTransfer.files;
    fileInput.files = files;
    if(files[0].name.length > 27){
      fileName.innerHTML = files[0].name.slice(0, 25)+"...";
    }
    fileName.innerHTML = files[0].name;
    fileSize.innerHTML = (files[0].size / 1024).toFixed(1) + " KB";
    uploadedFile.style.cssText = "display: flex;";
    progressBar.style.width = 0;
    fileFlag = 0;
  });
}

removeFileButton.addEventListener("click", () => {
  location.reload();
  return;
  uploadedFile.style.cssText = "display: none;";
  fileInput.value = "";
  uploadIcon.innerHTML = "file_upload";
  dragDropText.innerHTML = "Drag & drop any file here";
  document.querySelector(
    ".label"
  ).innerHTML = `or <span class="browse-files"> <input type="file" class="default-file-input"/> <span class="browse-files-text">browse file</span> <span>from device</span> </span>`;
  uploadButton.innerHTML = `Upload`;
});
