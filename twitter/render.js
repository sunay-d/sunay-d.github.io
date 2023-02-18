const tweetData = [
    {
        area: "Türkiye tarihinde gündemde",
        trendTopic: "#Konya",
        numberOfTweets: "20,5 B",
    },
    {
        area: "Türkiye tarihinde gündemde",
        trendTopic: "#TürkiyeTekYürek",
        numberOfTweets: "20,6 B",
    },
    {
        area: "Türkiye tarihinde gündemde",
        trendTopic: "Dybala",
        numberOfTweets: "12,7 B",
    },
    {
        area: "Türkiye tarihinde gündemde",
        trendTopic: "Deniz Akkaya",
        numberOfTweets: "35,2 B",
    },
    {
        area: "Türkiye tarihinde gündemde",
        trendTopic: "Ahmet Hakan",
        numberOfTweets: "11,1 B",
    },
]

const popularContainer = document.getElementById("popular-container")
let html = ``
for (let element of tweetData) {
    html += `
    <div class="tweet-card">
        <div class="topic">
            <p class="area">${element.area}</p>
            <h3 class="trend-topic">${element.trendTopic}</h3>
            <p class="numOfTweets">${element.numberOfTweets}</p>
        </div>
        <div class="more">
            <img src="./more.png">
        </div>
    </div>
`
}
popularContainer.innerHTML = html