document.addEventListener('DOMContentLoaded', function() {
    const playPauseBtn = document.getElementById('play-pause');
    const progressBar = document.getElementById('progress-bar');
    const volumeBar = document.getElementById('volume-bar');
    const muteBtn = document.getElementById('mute-btn');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const currentTimeDisplay = document.getElementById('current-time');
    const durationDisplay = document.getElementById('duration');
    const playerTitle = document.getElementById('player-title'); // 获取播放器标题元素

    let audio = new Audio(); // 初始化一个新的音频对象

    // 播放 / 暂停功能
    playPauseBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            playPauseBtn.classList.add('pause-btn');
            playPauseBtn.classList.remove('play-btn');
        } else {
            audio.pause();
            playPauseBtn.classList.add('play-btn');
            playPauseBtn.classList.remove('pause-btn');
        }
    });

    // 更新进度条
    audio.addEventListener('timeupdate', function() {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;

        // 更新当前播放时间
        const currentMinutes = Math.floor(audio.currentTime / 60);
        const currentSeconds = Math.floor(audio.currentTime % 60);
        currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    });

    // 设置进度条
    progressBar.addEventListener('input', function() {
        const seekTime = (progressBar.value / 100) * audio.duration;
        audio.currentTime = seekTime;
    });

    // 音量控制
    volumeBar.addEventListener('input', function() {
        audio.volume = volumeBar.value / 100;
    });

    // 静音按钮
    muteBtn.addEventListener('click', function() {
        if (audio.muted) {
            audio.muted = false;
            muteBtn.classList.remove('muted');
        } else {
            audio.muted = true;
            muteBtn.classList.add('muted');
        }
    });

    // 全屏按钮
    fullscreenBtn.addEventListener('click', function() {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { // Firefox
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Chrome and Safari
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
            document.documentElement.msRequestFullscreen();
        }
    });

    // 音频加载完毕时设置总时长
    audio.addEventListener('loadedmetadata', function() {
        const totalMinutes = Math.floor(audio.duration / 60);
        const totalSeconds = Math.floor(audio.duration % 60);
        durationDisplay.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
    });

    // 点击歌曲时更新播放器
    const songLinks = document.querySelectorAll('.song-title');
    songLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // 阻止默认行为

            // 获取歌曲信息
            const songUrl = link.getAttribute('data-song-url'); // 获取音频 URL
            const songTitle = link.getAttribute('data-song-title'); // 获取歌曲标题
            const songArtist = link.getAttribute('data-song-artist'); // 获取歌手名字

            // 设置音频源
            audio.src = songUrl;

            // 更新播放器标题和歌手
            playerTitle.textContent = `${songTitle} - ${songArtist}`; // 更新播放器中的歌曲和歌手信息

            // 播放新歌曲
            audio.play();

            // 更新播放器按钮状态
            playPauseBtn.classList.add('pause-btn');
            playPauseBtn.classList.remove('play-btn');
        });
    });
});