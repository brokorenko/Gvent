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

getUserAjax();
