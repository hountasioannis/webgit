window.addEventListener('DOMContentLoaded',function(){
    
    const addButton = document.querySelector(".btn")
    addButton.addEventListener("click",addNote)

    document.addEventListener("keydown", (e) => {
        if (e.key == "Enter"){
         addNote()
         }
        })
   
   this.setInterval(printGRDate,1000)
})

function printGRDate() {
    const myDate = new Date()

    const daysList = ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο']
    const monthsList = ['Ιανουαρίου', 'Φεβρουαρίου', 'Μαρτίου', 'Απριλίου', 'Μαΐου', 'Ιουνίου', 'Ιουλίου', 'Αυγούστου', 'Σεπτεμβρίου', 'Αυγούστου', 'Οκτωβρίου', 'Νοεμβρίου', 'Δεκεμβρίου']


    const date = myDate.getDate()
    const month = monthsList[myDate.getMonth()]
    const year = myDate.getFullYear()
    const day = daysList[myDate.getDay()]
    const hour = myDate.getHours() 
    const minute = myDate.getMinutes()
    const second = myDate.getSeconds()
    const presentedHour =  hour.toString().length < 2 ? "0" + hour : hour
    const presentedMinute = minute.toString().length < 2 ? "0" + minute : minute
    const presentedSecond =  second.toString().length < 2 ? "0" + second : second

    const today = `${day}, ${date} ${month} ${year}`
    const time = ` ${presentedHour} : ${presentedMinute} : ${presentedSecond}`

    const header = document.querySelector('.header')
    header.innerHTML = `<div>${today}</div>`
    header.innerHTML += `<div>${time}</div>`
}

function addNote() {
    const main = document.querySelector(".main")
    const noteText = document.getElementById("noteText")
    const row = document.querySelector(".row")
    const rowClone = row.cloneNode(true)
   
    rowClone.children[0].children[0].checked = false
    rowClone.children[0].children[1].classList.remove("strike-through")
    rowClone.children[0].children[0].setAttribute("name", "ch")
    rowClone.children[1].addEventListener("click", function() {
        rowClone.children[1].parentElement.remove()
       })
    rowClone.children[0].children[1].innerHTML = noteText.value
    rowClone.classList.remove("hidden")
    noteText.value = ""
    main.append(rowClone)
}


const main = document.querySelector(".main")
main.addEventListener("click",function () {
const checkBoxes = document.getElementsByName('ch')
for (let i = 0; i < checkBoxes.length; i++) {
    if (checkBoxes[i].checked) {
        checkBoxes[i].nextElementSibling.classList.add("strike-through")
        } else {
            checkBoxes[i].nextElementSibling.classList.remove("strike-through")
        }
    }
})




