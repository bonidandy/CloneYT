let toggleInput = document.getElementById("button-input")
let masukanInput = document.createElement("input")
let userInput = document.getElementById("userInput")
let buttonProfile = document.getElementById("buttonProfile")
let buttonBuat = document.getElementById("buttonBuat")
let buttonYoutube = document.getElementById("buttonYoutube")
let buttonYoutubeBar = document.getElementById("buttonYoutube")
let buttonBar = document.getElementById("buttonBar")
let parentInput = document.getElementById("parentInput")
let arrowBack = document.getElementById("arrowBack")
let kacaPembesar = document.getElementById("kacaPembesar")
let sideBar = document.getElementById("sideBar")

// sidebar
let sidebarButton = document.querySelectorAll(".sidebarButton")
let backgroundChange = document.getElementById("backgroundChange")
let titleChannel = document.querySelectorAll(".titleChannel")
let gambarChannel = document.querySelectorAll(".gambarChannel")
let subss = document.getElementById("subss")
let lastScrollY = 0;


toggleInput.addEventListener("click", function (event) {
    // console.log("menambahkan class hidden")
    event.stopPropagation()
    arrowBack.classList.remove("hidden")
    arrowBack.classList.add("flex")
    userInput.classList.remove("hidden")
    toggleInput.classList.add("hidden")
    buttonProfile.classList.add("hidden")
    buttonBuat.classList.add("hidden")
    buttonYoutube.classList.add("hidden")
    buttonBar.classList.add("hidden")
    parentInput.classList.add("w-full")
    kacaPembesar.classList.remove("hidden")
    buttonYoutubeBar.classList.add("hidden")
})

buttonBar.addEventListener('click', function (event) {
    sideBar.classList.toggle("ml-[-250px]")
    buttonBar.classList.add("z-20", "transition", "delay-150")
    backgroundChange.classList.remove("hidden")
    // playlistVideo.classList.add("fixed")
    event.stopPropagation()
    lastScrollY = window.scrollY
    document.body.classList.add("overflow-hidden");
})

document.addEventListener("click", function () {
    // console.log("menghapus class hidden")
    playlistVideo.classList.remove("fixed")
    userInput.classList.add("hidden")
    arrowBack.classList.add("hidden")
    toggleInput.classList.remove("hidden")
    parentInput.classList.remove("w-full")
    buttonProfile.classList.remove("hidden")
    buttonBuat.classList.remove("hidden")
    buttonYoutube.classList.remove("hidden")
    buttonBar.classList.remove("hidden")
    kacaPembesar.classList.add("hidden")
    sideBar.classList.add("ml-[-250px]")
    backgroundChange.classList.add("hidden")
    document.body.classList.remove("overflow-hidden");
})

userInput.addEventListener("click", function (event) {
    event.stopPropagation()
})



sidebarButton[0].classList.add("font-semibold", "bg-[#d4d3d3]")
sidebarButton[0].classList.remove("bg-red-600")

sidebarButton.forEach(button => {
    button.addEventListener("click", function () {
        sidebarButton.forEach(btn => {
            // yang bukan di pilih
            btn.classList.remove("font-semibold")
            btn.classList.add("bg-white", "hover:bg-[#d4d3d3]")
        })
        // yang di pilih
        button.classList.remove("bg-white", "hover:bg-[#d4d3d3]")
        button.classList.add("bg-[#d4d3d3]", "font-semibold")
    })
})

import { dataUsername } from "./data.js"

// console.log(dataUsername[0])

let keyUrl = `AIzaSyDF93QA3IQnBmEAPR1Qm3OpZB5NV5ZOfi8`

let ids = dataUsername.map(data => data.id).join(",")

let url = `https://www.googleapis.com/youtube/v3/channels?key=${keyUrl}&id=${ids}&part=snippet`
// let testing = `https://www.googleapis.com/youtube/v3/videos?key=${keyUrl}&id=sR7rMP4GXuE&part=snippet`

// async function testingVid() {
//     let response = await fetch(testing)
//     let data = await response.json()
//     console.log(data)
// }

// testingVid()

async function getYoutube() {
    let response = await fetch(url)
    let data = await response.json()
    // console.log(data)

    data.items.forEach(element => {
        let titleChannel = element.snippet.title
        let gambarChannel = element.snippet.thumbnails.default.url
        // console.log(titleChannel)
        // console.log(gambarChannel)

        let divBaru = document.createElement("div")
        divBaru.innerHTML = `<button
                                 class="cursor-pointer w-52 h-9 flex items-center hover:bg-[#d4d3d3] sidebarButton"><img src="${gambarChannel}" alt=""
                                 class="ml-2 rounded-full w-7 gambarChannel"> <span class="pl-5 text-sm titleChannel">${titleChannel}</span></button>`
        // titleChannel.textContent = element.snippet.title
        subss.append(divBaru)
    });
}
getYoutube()

let urlPopular = `https://www.googleapis.com/youtube/v3/videos?key=${keyUrl}&chart=mostPopular&part=snippet,statistics&maxResults=10`

async function popular() {
    let response = await fetch(urlPopular)
    let data = await response.json()
    console.log(data)

    data.items.forEach(async element => {
        let thumbnile = element.snippet.thumbnails.high.url
        let title = element.snippet.title
        let channelTitle = element.snippet.channelTitle
        let viewCount = element.statistics.viewCount
        let channelId = element.snippet.channelId

        let urlChannelPopuler = `https://www.googleapis.com/youtube/v3/channels?key=${keyUrl}&part=snippet&id=${channelId}`

        let responseChannelPopuler = await fetch(urlChannelPopuler)
        let dataChannelPopuler = await responseChannelPopuler.json()
        // console.log(dataChannelPopuler)
        let profileChannel = dataChannelPopuler.items[0].snippet.thumbnails.high.url


        const formatter = Intl.NumberFormat("en", { notation: "compact" });
        function formatCompactNumber(number) {
            const formatter = Intl.NumberFormat("en", { notation: "compact" });
            return formatter.format(number);
        }

        let divGambar = document.createElement("div")
        divGambar.innerHTML = `
        <div class="w-80">
            <img src=${thumbnile} alt="" class="w-80 h-44 object-cover rounded-lg">
        <div class="flex pt-3">
                <img src=${profileChannel} alt="" class="w-10 h-10 rounded-full">
                <div class="flex justify-between w-full" > 
                    <div class="pl-1"> 
                        <p class="font-semibold line-clamp-2">${title}<p>
                        <div class="pt-1 text-[#626262] text-sm">
                            <p>${channelTitle}<p>
                            <p>${formatCompactNumber(viewCount)} views<p>
                        </div>
                    </div>
                    <div class="pt-1 cursor-pointer">
                        <p>&#8942;</p>
                    <div>
                </div>
            </div>
        </div>
        `

        console.log(thumbnile)
        playlistVideo.append(divGambar)
    })
}

popular()


// async function getPopular() {
//     let response = await fetch(urlPopular)
//     let data = await response.json()
//     let dataId = data.items.map((videoId) => videoId.id)

//     profile(dataId)
//     // console.log(dataId)
//     // console.log(data)
// }


// async function profile(getDataId) {
//     let pantek = getDataId
//     let olah = pantek[0]
//     console.log(olah)
//     let urlProfileChannel = `https://www.googleapis.com/youtube/v3/channels?key=${keyUrl}&id=9KVG_X_7Naw&part=snippet`
//     let responseProfile = await fetch(urlProfileChannel)
//     let dataProfile = await responseProfile.json()
//     console.log("profile data aing:",dataProfile)
// }
// getPopular()

// profile()

let categoryButton = document.querySelectorAll(".category-button")

categoryButton.forEach(btn => {
    btn.addEventListener("click", function () {
        console.log("pantek")
    })
})

let playlistVideo = document.getElementById("playlist-video")

// playlistVideo.addEventListener("click", function(){

// })

