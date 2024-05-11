interface Track {
    source: AudioBufferSourceNode;
    gainNode: GainNode;
}

class AudioManager {
    private _audioContext: AudioContext;
    private _currentTrack: Track | null;
    private _audioBuffers: Record<string, AudioBuffer>;
    private _musicVolume: number;
    private _effectsVolume: number;
    public _debug: boolean;

    constructor() {
        this._audioContext = new AudioContext();
        this._currentTrack = null;
        this._audioBuffers = {};
        this._musicVolume = 0;
        this._effectsVolume = 0;
    }

    async initialize(): Promise<void> {
        const audioUrls = {
            // Music tracks
            theme: '/musics/theme.mp3',
            level1: '/musics/levels/Baguette Blast - Level 1.mp3',
            level2: '/musics/levels/Baguette Blast - Level 2.mp3',
            level3: '/musics/levels/Baguette Blast - Level 3.mp3',
            level4: '/musics/levels/Baguette Blast - Level 4.mp3',
            level5: '/musics/levels/Baguette Blast - Level 5.mp3',
            level6: '/musics/levels/Baguette Blast - Level 6.mp3',
            // Sound effects
            explosion: '/sounds/pop/pop.mp3',
        };

        const trackKeys = Object.keys(audioUrls);
        await Promise.all(trackKeys.map(async (key) => {
            const response = await fetch(audioUrls[key]);
            const arrayBuffer = await response.arrayBuffer();
            this._audioBuffers[key] = await this._audioContext.decodeAudioData(arrayBuffer);
        }));
    }

    playMusic(name: string): void {
        this._playAudio(name, true, this._musicVolume);
    }

    playSoundEffect(name: string): void {
        this._playAudio(name, false, this._effectsVolume);
    }

    private _playAudio(name: string, loop: boolean, volume: number): void {
        const audioBuffer = this._audioBuffers[name];
        if (!audioBuffer) {
            console.error('Audio track not found:', name);
            return;
        }

        // Stop current music track if playing and it's a music track
        if (loop && this._currentTrack) {
            this._currentTrack.source.stop();
            this._currentTrack.source.disconnect();
            this._currentTrack.gainNode.disconnect();
        }

        const source = this._audioContext.createBufferSource();
        source.buffer = audioBuffer;
        const gainNode = this._audioContext.createGain();
        gainNode.gain.value = volume;

        source.connect(gainNode);
        gainNode.connect(this._audioContext.destination);
        source.loop = loop;
        source.start(0);

        if (loop) {
            this._currentTrack = { source, gainNode };  // Store the source and gain node for music tracks only
        }
    }    

    async switchTrackSmoothly(newTrackName: string) {
        // Ensure the audio context is active
        if (this._audioContext.state === 'suspended') {
            await this._audioContext.resume();
        }

        // Check if the new track is available
        if (!this._audioBuffers[newTrackName]) {
            console.error('Track not found:', newTrackName);
            return;
        }

        const newSource = this._audioContext.createBufferSource();
        newSource.buffer = this._audioBuffers[newTrackName];
        const newGainNode = this._audioContext.createGain();
        newGainNode.gain.value = 0; // Start with no volume to fade in
        newSource.connect(newGainNode);
        newGainNode.connect(this._audioContext.destination);

        // Set the new track to loop
        newSource.loop = true;

        const fadeOutDuration = 0.5; // seconds for fading out the current track
        const fadeInDuration = 0.5; // seconds for fading in the new track

        // Fade out the current track if it exists
        if (this._currentTrack && this._currentTrack.gainNode) {
            this._currentTrack.gainNode.gain.linearRampToValueAtTime(
                0, this._audioContext.currentTime + fadeOutDuration
            );

            // Disconnect the old track after the fade out completes
            setTimeout(() => {
                if (this._currentTrack) {
                    this._currentTrack.source.stop();
                    this._currentTrack.source.disconnect();
                    this._currentTrack.gainNode.disconnect();
                    this._currentTrack = null;  // Clear the current track to ensure clean state
                }

                // Fade in the new track
                this._startNewTrack(newSource, newGainNode, fadeInDuration);
            }, fadeOutDuration * 1000);
        } else {
            // Start the new track immediately if there is no current track
            this._startNewTrack(newSource, newGainNode, fadeInDuration);
        }
    }

    private _startNewTrack(source: AudioBufferSourceNode, gainNode: GainNode, fadeInDuration: number) {
        gainNode.gain.setValueAtTime(0, this._audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(
            this._musicVolume, this._audioContext.currentTime + fadeInDuration
        );

        source.start(this._audioContext.currentTime);
        this._currentTrack = { source, gainNode };  // Set the new track as the current track
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
