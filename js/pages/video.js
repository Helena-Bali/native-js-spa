export function videoPage() {
    return `
        <div class="video-page">
         <div class="video-header">Video player</div>
            <div class="upload-container" id="upload-container">
            <img class="play-icon" src="./assets/play-icon.jpg" alt="play-icon"/>
                <div class="no-video-text">No video files</div>
                <div class="upload-message">Click on the add button to upload your video file</div>
                <input type="file" id="video-upload" accept="video/*" hidden>
                <button id="upload-btn">Upload video file</button>
            </div>
            <div id="video-thumbnails" class="thumbnails-container"></div>
            <div id="loading-overlay" class="hidden">
                <div class="progress-modal">
                    <div class="progress-bar-wrapper">
                        <div id="modal-progress-bar"></div>
                    </div>
                    <span id="modal-progress-percent">0%</span>
                </div>
            </div>
        </div>
    `;
}

export function initVideoPage() {
    const uploadBtn = document.getElementById("upload-btn");
    const fileInput = document.getElementById("video-upload");
    const thumbnailsContainer = document.getElementById("video-thumbnails");
    const uploadContainer = document.getElementById("upload-container");
    const playIcon = uploadContainer.querySelector(".play-icon");
    const noVideoText = uploadContainer.querySelector(".no-video-text");
    const uploadMessage = uploadContainer.querySelector(".upload-message");
    const loadingOverlay = document.getElementById("loading-overlay");
    const modalProgressBar = document.getElementById("modal-progress-bar");
    const modalProgressPercent = document.getElementById("modal-progress-percent");

    uploadBtn.addEventListener("click", () => fileInput.click());

    fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        loadingOverlay.classList.remove("hidden");

        let progress = 0;
        const fakeUpload = setInterval(() => {
            progress += 5;
            if (progress >= 100) {
                clearInterval(fakeUpload);
                progress = 100;
                loadingOverlay.classList.add("hidden");

                const videoURL = URL.createObjectURL(file);
                const videoThumb = document.createElement("video");
                videoThumb.src = videoURL;
                videoThumb.classList.add("video-thumb");
                videoThumb.setAttribute("muted", "");
                videoThumb.setAttribute("playsinline", "");
                videoThumb.addEventListener("click", () => openVideoFullscreen(videoURL));

                thumbnailsContainer.appendChild(videoThumb);
                uploadContainer.classList.add("floating");
                uploadBtn.classList.add("floating");
                playIcon.classList.add("hidden");
                noVideoText.classList.add("hidden");
                uploadMessage.classList.add("hidden");
            }
            modalProgressBar.style.width = progress + "%";
            modalProgressPercent.textContent = progress + "%";
        }, 50);
    });

    function openVideoFullscreen(src) {
        const overlay = document.createElement("div");
        overlay.classList.add("video-overlay");
        overlay.innerHTML = `
            <div class="video-popup">
                <span class="close-btn">&times;</span>
                <video src="${src}" controls autoplay></video>
            </div>
        `;
        document.body.appendChild(overlay);

        overlay.querySelector(".close-btn").addEventListener("click", () => {
            overlay.remove();
        });
    }
}
