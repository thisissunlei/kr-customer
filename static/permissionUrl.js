(function(window){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "/api/krspace-sso-web/sso/sysOwn/findUserData?forceUpdate=1", true);
    xhr.responseType = 'json';
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            window.resourcesCode=xhr.response.data.resourcesCode;
        }
    };
    xhr.send();
    
})(window)