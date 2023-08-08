class AudioManager {
    // ein Array, das alle Audios in Ihrem Spiel hält
    audioList = [];

    // fügt ein neues Audio zum AudioManager hinzu
    add(audio) {
        this.audioList.push(audio);
    }

    // setzt die Lautstärke für alle Audios
    setVolume(volume) {
        for(let i = 0; i < this.audioList.length; i++) {
            this.audioList[i].volume = volume;
        }
    }

    // eine Funktion zum Ein- und Ausschalten der Lautstärke
    toggleMute() {
        // prüft das Volumen des ersten Audios in der Liste, um festzustellen, ob der Ton an oder aus ist
        // diese Annahme gilt nur, wenn alle Audios das gleiche Volumen haben
        if(this.audioList[0].volume > 0) {
            this.setVolume(0);
        } else {
            this.setVolume(0.5);
        }
    }
}