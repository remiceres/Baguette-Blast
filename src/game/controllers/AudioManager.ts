interface Track {
    source: AudioBufferSourceNode;
    gainNode: GainNode;
}

class AudioManager {
    private _audioContext: AudioContext;
    private _currentTrack: Track | null;
    private _musicTracks: Record<string, AudioBuffer>;
    private _soundEffects: Record<string, AudioBuffer>;
    private _musicVolume: number;
    private _effectsVolume: number;

    constructor() {
        this._audioContext = new AudioContext();
        this._currentTrack = null;
        this._musicTracks = {};
        this._soundEffects = {};
        this._musicVolume = 0.3;
        this._effectsVolume = 0.3;
    }

    async initMusic(): Promise<void> {
        const musicUrls = {
            theme: '/musics/theme.mp3'
        };

        const trackKeys = Object.keys(musicUrls);
        await Promise.all(trackKeys.map(async (key) => {
            const response = await fetch(musicUrls[key]);
            const arrayBuffer = await response.arrayBuffer();
            this._musicTracks[key] = await this._audioContext.decodeAudioData(arrayBuffer);
        }));
    }

    loadMusic(name, url) {
        fetch(url)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => this._audioContext.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {
                this._musicTracks[name] = audioBuffer;
            })
            .catch(error => console.error('Error loading music track:', error));
    }

    playMusic(name: string): void {
        const audioBuffer = this._musicTracks[name];
        if (!audioBuffer) {
            console.error('Music track not found:', name);
            return;
        }

        // Stop current track if playing
        if (this._currentTrack) {
            this._currentTrack.source.stop();
            this._currentTrack.source.disconnect();
            this._currentTrack.gainNode.disconnect();
        }

        const source = this._audioContext.createBufferSource();
        source.buffer = audioBuffer;
        const gainNode = this._audioContext.createGain();
        gainNode.gain.value = this._musicVolume;
        
        // Connect the source to the gain node and then to the destination
        source.connect(gainNode);
        gainNode.connect(this._audioContext.destination);

        source.loop = true;
        source.start(0);

        this._currentTrack = { source, gainNode };  // Store the source and gain node
    }


    loadSoundEffect(name, url) {
        fetch(url)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => this._audioContext.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {
                this._soundEffects[name] = audioBuffer;
            })
            .catch(error => console.error('Error loading sound effect:', error));
    }

    playSoundEffect(name) {
        if (this._soundEffects[name]) {
            const source = this._audioContext.createBufferSource();
            source.buffer = this._soundEffects[name];
            const gainNode = this._audioContext.createGain();
            gainNode.gain.value = this._effectsVolume;

            source.connect(gainNode);
            gainNode.connect(this._audioContext.destination);

            source.start(0);
        }
    }

    switchTrackSmoothly(newTrackName) {
        if (!this._musicTracks[newTrackName]) return;

        const newSource = this._audioContext.createBufferSource();
        newSource.buffer = this._musicTracks[newTrackName];
        const newGainNode = this._audioContext.createGain();
        newGainNode.gain.value = 0;
        newSource.connect(newGainNode);
        newGainNode.connect(this._audioContext.destination);
        newSource.start(0);

        const fadeOutDuration = 2; // seconds
        const fadeInDuration = 2; // seconds
        if (this._currentTrack && this._currentTrack.gainNode) {
            this._currentTrack.gainNode.gain.linearRampToValueAtTime(
                0, this._audioContext.currentTime + fadeOutDuration
            );
            setTimeout(() => this._currentTrack.source.stop(), fadeOutDuration * 1000);
        }
        newGainNode.gain.linearRampToValueAtTime(this._musicVolume, this._audioContext.currentTime + fadeInDuration);

        this._currentTrack = { source: newSource, gainNode: newGainNode };
    }

    set_musicVolume(volume) {
        this._musicVolume = volume;
        if (this._currentTrack && this._currentTrack.gainNode) {
            this._currentTrack.gainNode.gain.value = volume;
        }
    }

    set_effectsVolume(volume) {
        this._effectsVolume = volume; // This volume will apply to new effects played after the change.
    }

    updatePlaybackRate(timeScale) {
        if (this._currentTrack && this._currentTrack.source) {
            this._currentTrack.source.playbackRate.value = timeScale;
        }
    }
}

export default AudioManager;
