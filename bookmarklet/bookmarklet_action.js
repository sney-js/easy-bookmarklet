var $;
if (!window.jQuery) {
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(script);
    script.onload = script.onreadystatechange = function() {
        loadBookmarklet();
    }
} else {
    loadBookmarklet();
}

function loadBookmarklet(fancyExit) {

    $ = window.jQuery;
    var bmActive = false;

    var css = document.getElementsByTagName('style');
    for (var i = css.length; i--;) {
        if (css[i].id == 'bbtb-style') {
            bmActive = true;
            break;
        }
    }

    if (!bmActive) {
        var newSS = document.createElement('style');
        newSS.id = 'bbtb-style';
        newSS.type = 'text/css';
        newSS.innerHTML = OutVar.style;
        document.getElementsByTagName("head")[0].appendChild(newSS);
    }

    var thisBar = document.body.querySelector('#bbtb-main');

    if (thisBar === null) {
        document.body.insertAdjacentHTML("afterbegin", OutVar.bookmarklet);
        $('#bbtb-main').animate({ opacity: 1 }, 'fast');
        $('.bbtb-window').css({ top: "0px", opacity: 1 });
        $('#bbtb-background').click(function() {
            loadBookmarklet();
        });

        // loadView Method of your bookmarklet_view.js
        // --------------------------------
        onViewLoaded();
        // --------------------------------
    } else {
        if (fancyExit === undefined || fancyExit == false) {
            var BHEIGHT = 400;
            $('.bbtb-window').css({ top: "-" + BHEIGHT + "px" });
            $('#bbtb-main').css({ opacity: 0 });
            setTimeout(function() {
                thisBar.parentNode.removeChild(thisBar);
            }, 2000);
        } else {
            $('#bbtb-main').css({ "background-color": "rgba(255,255,255,1)" });
            $('.bbtb-window').css({ "transition": "3s", "opacity": "0" });
            setTimeout(function() {
                $('#bbtb-main').css({ "opacity": "0" });
            }, 2200);
            setTimeout(function() {
                thisBar.parentNode.removeChild(thisBar);
            }, 4000);
        }
    }
}
