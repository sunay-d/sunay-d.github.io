import {posts} from './data.js'

render()

const heartIcons = document.querySelectorAll(".heart")

document.addEventListener("click", function(e) {
    if(e.target.dataset.heart) {
        handleLikeBtn(e.target)
    }
})

document.addEventListener("dblclick", function(e) {
    if(e.target.dataset.dblheart) {
        handleLikeBtn(e.target)
    }
})


function render() {
    let content = ''
    for (let post of posts) {
        content += `
        <div class="card">
            <div class="user-info">
                <img class="avatar" src="${post.avatar}">
                <div class="name-location">
                    <div class="user-name bold">${post.name}</div>
                    <div class="user-location">${post.location}</div>
                </div>
            </div>
            <img class="post" src=${post.post} data-dblheart=${post.id}>
            <div class="icons">
                <img class="icon heart" src="./images/${post.isLiked ? 'icon-liked' : 'icon-heart'}.png" data-heart=${post.id}></img>
                <img class="icon comment" src="./images/icon-comment.png"></img>
                <img class="icon dm" src="./images/icon-dm.png"></img>
            </div>
            <p><span class="bold">${post.likes} likes</span></p>
            <p><span class="bold">vincey1853</span> ${post.comment}</p>
        </div>
        `
    }

    document.getElementById("cards").innerHTML = content
}

function handleLikeBtn(element){
    const focusedPost = posts.filter(post => (element.dataset.heart === post.id) || (element.dataset.dblheart === post.id))[0]

    if (focusedPost.isLiked) {
        focusedPost.likes -= 1
        element.style.border = "2px solid blue"
    }else {
        focusedPost.likes += 1
        element.style.width = "5rem"
    }
    focusedPost.isLiked = !focusedPost.isLiked
    render()
}

