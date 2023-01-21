let videoOn = false 

function openVideo(){
    videoOn = !videoOn
    let video = document.getElementById("video")
    video.style.visibility = videoOn ? "visible" : "hidden"
}