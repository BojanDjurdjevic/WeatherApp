const APIKEY = "f3f653c72161ae986e737a01a269b195"

const cityInp = document.querySelector("#city")
const countryInp = document.querySelector("#country")
const btn = document.querySelector("#btn")
const infoDiv = document.querySelector("#info")
const tpl = document.querySelector("#tpl").innerHTML
const mainDiv = document.querySelector("main")
const bcgDiv = document.querySelector("#bcg")
let mPos = infoDiv.getBoundingClientRect()
let bPos = bcgDiv.getBoundingClientRect()

function displayWeatherData(request_url) {
        fetch(request_url).then( response => {
                if (response.status == 200) {
                response.json().then( resp_json => {
                    console.log(resp_json)
                    let myClass = resp_json.weather[0].main.toLowerCase()
                    console.log(myClass)
                    mainDiv.className = ""
                    if(myClass == "clear" || myClass == "sunny") {
                        btn.classList.add("blue")
                    } else {btn.className = ""}
                    mainDiv.classList.add(myClass)
                    infoDiv.innerHTML = tpl.replace(/##state##/g,resp_json.weather[0].description.toUpperCase())
                                           .replace(/##curtemp##/g,Math.round(resp_json.main.temp) + "C")
                                           .replace(/##feeltemp##/g,Math.round(resp_json.main.feels_like) + "C")
                                           .replace(/##hum##/g,resp_json.main.humidity + " " + "%")
                                           .replace(/##wind##/g,Math.round(resp_json.wind.speed) + " " + "km/h")
                                           .replace(/##town##/g,resp_json.name)
                                           .replace(/##country##/g,resp_json.sys.country)
                    
                    bcgDiv.style.display = `block`
                    infoDiv.classList.add("showup")
                    bcgDiv.classList.add("showup")
                    bcgDiv.style.top = `${mPos.y - 148}px`
                    bcgDiv.style.left = `${mPos.x - 171}px`
                })
            }
        })
        
        
}

btn.onclick = () => {
    infoDiv.className = ""
    bcgDiv.className = ""
    let city = cityInp.value.trim() 
    let country = countryInp.value.trim() 
    if(city == "") {
        city = "Belgrade"
    }
    if(country == "") {
        country = "RS"
    }
    displayWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${APIKEY}`)
    /*
    cityInp.value = ""
    countryInp.value = ""
    */
}