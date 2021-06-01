const musicContainer = document.querySelector('#music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progessContainer = document.querySelector('#progress-container')
const progess = document.querySelector('#progress')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

const songs = ['HazyAfterHours', 'MotivatingMorning', 'TechHouseVibes', 'UplifMe']
let songIndex = 2

const loadSong = (song) => {
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `img/${song}.jpg`
}

loadSong(songs[songIndex])

const playSong = () => {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    audio.play()
}

const pauseSong = () => {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    audio.pause()
}

const prevSong = () => {
    songIndex--
    if(songIndex < 0) songIndex = songs.length - 1
    loadSong(songs[songIndex])
    playSong()
}

const nextSong = () => {
    songIndex++
    if(songIndex > songs.length - 1) songIndex = 0
    loadSong(songs[songIndex])
    playSong()
}

const updateProgress = (e) => {
    const { duration, currentTime } = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

const setProgress = (e) => {
    const width = progessContainer.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (clickX / width) * duration
}

playBtn.onclick = () => {
    const isPlaying = musicContainer.classList.contains('play')
    isPlaying ? pauseSong() : playSong()
}

prevBtn.onclick = () => prevSong()
nextBtn.onclick = () => nextSong()

audio.ontimeupdate = (e) => updateProgress(e)
progessContainer.onclick = (e) => setProgress(e)
audio.onended = () => nextSong()