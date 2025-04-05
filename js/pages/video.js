export function videoPage() {
    return `
        <h2>Видео</h2>
        <input type="file" id="video-file">
        <video id="video-player" controls></video>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("video-file");
    const videoPlayer = document.getElementById("video-player");

    if (fileInput) {
        fileInput.addEventListener("change", event => {
            const file = event.target.files[0];
            if (file) {
                videoPlayer.src = URL.createObjectURL(file);
            }
        });
    }
});
