document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('videoPlayer');
    const playPauseButton = document.getElementById('playPause');
    const muteUnmuteButton = document.getElementById('muteUnmute');
    const seekBar = document.getElementById('seekBar');
    const volumeBar = document.getElementById('volumeBar');
    const fileInput = document.getElementById('fileInput');
    const currentTimeDisplay = document.getElementById('currentTime');
    const durationDisplay = document.getElementById('duration');

    // 播放/暂停功能
    playPauseButton.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            video.pause();
            playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    // 静音/取消静音功能
    muteUnmuteButton.addEventListener('click', function() {
        if (video.muted) {
            video.muted = false;
            muteUnmuteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            video.muted = true;
            muteUnmuteButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });

    // 更新进度条和时间显示
    video.addEventListener('timeupdate', function() {
        const value = (100 / video.duration) * video.currentTime;
        seekBar.value = value;
        currentTimeDisplay.textContent = formatTime(video.currentTime);
        durationDisplay.textContent = formatTime(video.duration);
    });

    // 拖动进度条跳转
    seekBar.addEventListener('input', function() {
        const time = video.duration * (seekBar.value / 100);
        video.currentTime = time;
    });

    // 调整音量
    volumeBar.addEventListener('input', function() {
        video.volume = volumeBar.value;
    });

    // 选择文件播放功能
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            video.src = fileURL;
            video.play();
            playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        }
    });

    // 格式化时间为分钟和秒
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
});
