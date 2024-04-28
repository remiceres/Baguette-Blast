import Game from './Game';

class MusicManager {
    audioContext;
    currentTrack;
    isPlaying;

    constructor() {
        this.audioContext = new AudioContext();
        this.currentTrack = null;
        this.isPlaying = false;
    }

    async loadTrack(url) {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
        this.currentTrack = this.audioContext.createBufferSource();
        this.currentTrack.buffer = audioBuffer;
        this.currentTrack.connect(this.audioContext.destination);
    }

    play() {
        if (this.currentTrack && !this.isPlaying) {
            this.currentTrack.start(0);
            this.isPlaying = true;
        }
    }

    pause() {
        if (this.currentTrack && this.isPlaying) {
            this.currentTrack.stop();
            this.isPlaying = false;
            this.loadTrack(this.currentTrack.buffer); // reload the track to enable replay
        }
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    update() {
        // Control the music speed
        this.currentTrack.playbackRate.value = Game.instance.timeControl.getTimeScale();
    }
}
export default MusicManager;