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


toggleInput.addEventListener("click", function (event) {
    console.log("menambahkan class hidden")
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
    event.stopPropagation()
})

document.addEventListener("click", function () {
    console.log("menghapus class hidden")
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

console.log(dataUsername[0])

let keyUrl = `AIzaSyDF93QA3IQnBmEAPR1Qm3OpZB5NV5ZOfi8`

let ids = dataUsername.map(data => data.id).join(",")
let url = `https://www.googleapis.com/youtube/v3/channels?key=${keyUrl}&id=${ids}&part=snippet`
let urlPopular = `https://www.googleapis.com/youtube/v3/videos?key=${keyUrl}&chart=mostPopular`


async function getYoutube() {
    let response = await fetch(url)
    let data = await response.json() 
    console.log(data)

    data.items.forEach(element => {
        let titleChannel = element.snippet.title
        let gambarChannel = element.snippet.thumbnails.default.url
        console.log(titleChannel)
        // console.log(gambarChannel)
        
        let divBaru = document.createElement("div")
        divBaru.innerHTML = `<button
                                 class="cursor-pointer w-52 h-9 flex items-center hover:bg-[#d4d3d3] sidebarButton"><img src="${gambarChannel}" alt=""
                                 class="ml-2 rounded-full w-7 gambarChannel"> <span class="pl-5 text-sm titleChannel">${titleChannel}</span></button>`
        // titleChannel.textContent = element.snippet.title
        subss.append(divBaru)
    });
}

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
getYoutube()



