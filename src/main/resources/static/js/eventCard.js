
var userCookieChecked = false;
var eventsTakePartTriggerLoaded = false;
var eventsCreatorTriggerLoaded= false;
var eventArrParticipant = [];
var eventArrCreator = [];

function getUserAjax() {
    $.ajax({
        type: 'GET',
        url: '/api/user/getUserInfo',
        success: function(data){
            if('auth' in data){
                document.location.href = '/login';
            }
            if('user' in data){
                var user = data.user;
                if (checkCookieValid(user)){
                    console.log("validCookie");
                }else {
                    console.log("newCookie");
                    setSTDCookie(user);
                    console.log("setted");
                }
                userCookieChecked = true;
            }
        },
        error: function () {
            alert('fail');
        }
    });
}

function getMarkersFromDbPrivate(id) {
    // var request = JSON.stringify({"user":id});
    $.ajax({
        type: 'GET',
        url: '/api/user/getUsersEvents/',
        data:'userId='+id,
        success: function(data){
            if('auth' in data){
                document.location.href = '/login';
            }
            if('events' in data){
                console.log(data);
                for(var i=0;i<data.events.length;i++){
                    eventArrCreator.push(data.events[i]);
                }
                eventsCreatorTriggerLoaded= true;
            }
        },
        error: function () {
            alert('fail');
        }
    });
}

function removeEvent(id) {
    $.ajax({
        type: 'DELETE',
        url: '/api/event/removeEvent/'+id,
        success: function(data){
            if('auth' in data){
                document.location.href = '/login';
            }
            if('fail' in data){
                console.log('no such id');
            }
            if('deleted' in data){
                var cardToDelete = $('.deleteEvent[data-id='+id+']');
                var parent = cardToDelete.parent();
                parent.remove();
                // $('.refresh').click();

            }
        },
        error: function () {
            alert('fail');
        }
    });
}

function getEventsFromDbTakePartIn(id) {
    $.ajax({
        type: 'GET',
        url: '/api/user/getUsersEventsTakePart/',
        data: "userId="+id,
        success: function(data){
            if('auth' in data){
                document.location.href = '/login';
            }
            if('events' in data){
                for(var i=0;i<data.events.length;i++){
                    eventArrParticipant.push(data.events[i]);
                }
                eventsTakePartTriggerLoaded = true;
                console.log(data);
            }
        },
        error: function () {
            alert('fail');
        }
    });
}


function setSTDCookie(userJson) {
    $.cookie('userId',userJson.id,{
        expires: 5,
        path: '/'
    });
    $.cookie('userNickname',userJson.username,{
        expires: 5,
        path: '/'
    });
    $.cookie('enabled',userJson.enabled,{
        expires: 5,
        path: '/'
    });
}

function deletSTDCookie() {
    $.cookie('userId',null);
    $.cookie('userNickname',null);
    $.cookie('enabled',null);
}

function checkCookieValid(userJson) {
    var id = $.cookie('userId');
    var nickname = $.cookie('userNickname');
    var enabled = $.cookie('enabled');
    if (id!=null && nickname!=null && enabled!= null){
        return userJson.id == id;
    }
    return false;
}

function createCards() {
    var container = $('.card_container');
    for(var i = 0;i<eventArrCreator.length;i++){
        var del = $('<button>X</button>');
        del.addClass('deleteEvent');
        del.attr('data-id',eventArrCreator[i].id);
        var card = $('<div></div>');
        card.addClass('card_m');
        card.addClass('creator');
        card.attr('draggable','true');
        card.text(eventArrCreator[i].description);
        card.append(del);
        container.append(card);
    }
    for(var i = 0;i<eventArrParticipant.length;i++){
        var card = $('<div></div>');
        card.addClass('card_m');
        card.attr('draggable','true');
        card.text(eventArrParticipant[i].description);
        container.append(card);
    }
}

function run() {
    var timerLoadTP = setInterval(function () {
        if (userCookieChecked){
            console.log('run');
            var id = $.cookie('userId');
            getEventsFromDbTakePartIn(id);
            userCookieChecked = false;
            clearInterval(timerLoadTP);
        }
    },300);
    var timerLoadC = setInterval(function () {
        console.log('wait for creator events');
        if (eventsTakePartTriggerLoaded){
            var id = $.cookie('userId');
            getMarkersFromDbPrivate(id);
            clearInterval(timerLoadC);
        }
    },500);

    var timerAllLoaded = setInterval(function () {
        console.log('check all true');
        if (eventsCreatorTriggerLoaded && eventsTakePartTriggerLoaded){
            console.log('are true');
            createCards();
            clearInterval(timerAllLoaded);
        }
    },500);
}

$(document).on('click','.deleteEvent',function () {
    var b = this.getAttribute('data-id');
    removeEvent(b);
});

getUserAjax();
run();


// show/hide SEND button --------------
$("input").keyup(function () {
    if ($(this).val()) {
        $(".chatBody_btn_send").show();
    }
    else {
        $(".chatBody_btn_send").hide();
    }
});

$(".closeBtn").click(function(){
    $(".cardEvent_chat_wrapper").hide();
});
// CLOSE button END-------------

$(".card_m").click(function(){
    $(".cardEvent_chat_wrapper").show();
});











