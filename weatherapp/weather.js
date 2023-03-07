$(document).ready(function() {

$('.btn').on('click', function() {
    getCity($('#noteText').val().trim())
    reset()
})


$('#noteText').on('keyup', function(e) {
    if (e.key === 'Enter') {
        getCity($(this).val().trim())
        reset()
    }
})
  
})


function getCity(city) {
    if (!city) {
        return
    }

onBeforeSend()
fetchWeatherFromApi(city)
}



function fetchWeatherFromApi(city) {
    
    let ajaxRequest = new XMLHttpRequest()
    ajaxRequest.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={APIKEY}&units=metric`, true)
    
    ajaxRequest.onreadystatechange = function() {
        if (ajaxRequest.readyState == 4) {
            if (ajaxRequest.status === 200) {
                handleResults(JSON.parse(ajaxRequest.responseText)) 
            } else {
                onAppiError()
            }
        }
    }

    ajaxRequest.send()
}

function onAppiError() {
    let error = $("<div class='error'><strong>ERROR IN SEARCHING</strong></div>")
    $(".main").html(error)
}


function handleResults(apiResponse) {
    if (!apiResponse) {
        return
    }

    let clone = $('.row.hidden').clone()
    clone.removeClass('hidden')

    handleLiterals(clone,apiResponse)
    handleImage(clone,apiResponse)
    $('.main').append(clone)
   
}

function handleImage(clone,apiResponse) {
    var iconcode = apiResponse.weather[0].icon
                var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                clone.find('#wicon').attr('src', iconurl)
}

function handleLiterals(clone,apiResponse) {
    clone.find('[id]').each((index, item) => {
            let valueElement = $(item).children('span')
            let metadataValue = null
            if (apiResponse[item.id]) {
                metadataValue = apiResponse[item.id]
                valueElement.length ? valueElement.text(metadataValue) : $(item).text(metadataValue)
            } else  if (apiResponse.main[item.id]) {
                metadataValue = apiResponse.main[item.id]
                valueElement.length ? valueElement.text(metadataValue) : $(item).text(metadataValue)
            } else {
                metadataValue = '-'
            }    
        }
    )
}

function onBeforeSend(){
 $(".main").find(".row").remove()
 $(".main").find(".error").remove()
}


function reset() {
    $('#noteText').val('')

}

