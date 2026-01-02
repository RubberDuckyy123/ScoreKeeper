const ScoreButtons = document.querySelectorAll(".ScoreButton")

const Team1Score = document.getElementById("Team1Score")
const Team2Score = document.getElementById("Team2Score")

const TeamNames = document.querySelectorAll(".TeamName")

const Panels = document.querySelectorAll(".Panel")

let SwipeStartY = null
let LeftSideSwipe = null

ScoreButtons.forEach(el => {
    el.addEventListener("pointerdown", (event) => {
        if (event.currentTarget.id == "PlusButton1") {
            Team1Score.textContent = Number(Team1Score.textContent) + 1
        } else if (event.currentTarget.id == "PlusButton2") {
            Team2Score.textContent = Number(Team2Score.textContent) + 1
        } else if (event.currentTarget.id == "MinusButton1") {
            Team1Score.textContent = Number(Team1Score.textContent) - 1
        } else {
            Team2Score.textContent = Number(Team2Score.textContent) - 1
        }
    })
})

TeamNames.forEach(el => {
    el.addEventListener("blur", () => {
        const span = document.createElement("span")
        span.textContent = el.value
        span.style.visibility = "hidden"
        span.style.whiteSpace = "pre"

        const style = getComputedStyle(el)
        span.style.font = style.font

        document.body.appendChild(span)
        const width = span.getBoundingClientRect().width
        el.style.width = `${Math.max(width, 24)}px`
        span.remove()
    })
})

Panels.forEach(el => {
    el.addEventListener("pointerdown", (event) => {
        if (SwipeStartY) {
            return
        } else {
            SwipeStartY = event.clientY
            if (event.clientX < (window.innerWidth / 2)) {
                LeftSideSwipe = true
            } else {
                LeftSideSwipe = false
            }
        }
    })
    el.addEventListener("pointerup", (event) => {
        if (!(SwipeStartY)) {
            return
        }
        const height = window.innerHeight
        if (event.clientY <= (SwipeStartY - (window.innerHeight / 8))) {
            if (event.target.classList.contains("Score") || event.target.classList.contains("CenterText")) {
                if (LeftSideSwipe) {
                    Team1Score.textContent = Number(Team1Score.textContent) + 1
                } else {
                    Team2Score.textContent = Number(Team2Score.textContent) + 1
                }
            }
        } else if (event.clientY >= (SwipeStartY + (window.innerHeight / 8))) {
            if (event.target.classList.contains("Score") || event.target.classList.contains("CenterText")) {
                if (LeftSideSwipe) {
                    Team1Score.textContent = Number(Team1Score.textContent) - 1
                } else {
                    Team2Score.textContent = Number(Team2Score.textContent) - 1
                }
            }
        }
        SwipeStartY = null
        })

}) 
