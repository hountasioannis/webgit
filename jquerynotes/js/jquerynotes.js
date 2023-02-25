const daysGR = ['Κυριακή', ' Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 
                'Παρασκευή', 'Σάββατο'
            ]
const monthsGR = ['Ιανουαρίου', 'Φεβρουαρίου', 'Μαρτίου', 
                    'Απριλίου', 'Μαΐου', 'Ιουνίου', 'Ιουλίου', 
                    'Αυγούστου', 'Σεπτεμβρίου', 'Οκτωβρίου', 'Νοεμβρίου', 
                    'Δεκεμβρίου'
                ]


$(document).ready(function() {
    /*
     *  
     */
   setInterval(printGRDate, 1000)

    /*
     * onclick event on insertnote btn
     */
    $('.btn').on('click', function() {
        insertNote($('#noteText').val().trim())
        reset()
    })

    /*
     * on-keydown / on-keyup
     */ 
    $('#noteText').on('keyup', function(e) {
        if (e.key === 'Enter') {
            insertNote($(this).val().trim())
            reset()
        }
    })
})

function printGRDate() {
    const currentDate = new Date()
    const day = currentDate.getDay()
    const date = currentDate.getDate()
    const month = currentDate.getMonth()
    const year = currentDate.getFullYear()
    const hours = currentDate.getHours()
    const minutes = currentDate.getMinutes()
    const seconds = currentDate.getSeconds()

    let formatedDay = daysGR[day]
    let formatedMonth = monthsGR[month]

    let formatedDate = `${formatedDay}, ${date} ${formatedMonth} ${year}`
    let formatedTime = `${(hours < 10) ? '0' : ''}${hours}:${(minutes < 10) ? '0' : ''}${minutes}:${(seconds < 10) ? '0' : ''}${seconds}`

    $('.header').html(formatedDate + "<br>" + formatedTime)
}

function insertNote(note) {
    if (!note) {
        return
    }

    let clone = $('.row.hidden').clone()
    clone.removeClass('hidden')

    clone.find('input').on('click', function() {
        strikeThrough(clone.find('label'))
    })

   clone.find('button').on('click', function() {
        deleteNote(clone)
    })

   clone.find('label').html(note) 
    $('.main').append(clone)
   
}

function strikeThrough(lbl) {
    lbl.toggleClass('line-through')
}

function deleteNote(note) {
    note.remove()
}

function reset() {
    $('#noteText').val('')

}