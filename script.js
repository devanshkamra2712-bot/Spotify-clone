async function getsongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/")
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            // Extract filename and clean it up
            let songName = element.href.split("/").pop() // Get last part after /
            songName = decodeURIComponent(songName) // Decode URL encoding
            songName = songName.replace(".mp3", "") // Remove .mp3 extension
            songName = songName.replace(/\[.*?\]/g, "") // Remove text within square brackets
            songName = songName.replace(/\(.*?\)/g, "") // Remove text within parentheses
            songName = songName.trim() // Remove extra spaces
            songs.push(songName)
        }
    }
    return songs
}


async function main() {
    let songs = await getsongs()
    console.log(songs)

    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML += `<li>  
        <img class="invert" src="music.svg" alt="">
                        <div class="info">
                            <div>${song.replaceAll("%20"," ")}</div>
                            <div> By Devansh</div>
                        </div>
                        <div class="playnow">
                            <span>Play Now</span>
                            <img class="invert" src="playbar.svg" alt="">
                        </div>
        </li>`
    }

    var audio = new Audio(songs[0]);
    audio.addEventListener("loadeddata", () => {
        console.log(audio.duration);
    });
}

main()