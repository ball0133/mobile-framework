// JavaScript Document
var pages = [];
var numLinks = 0;
var numPages = 0;

//document.addEventListener("DOMContentLoaded", function () {

document.addEventListener("deviceready", function () {
    console.log("device ready");

    //Contacts
    var options = new ContactFindOptions();

    options.filter = ""; //leaving this empty will find return all contacts
    options.multiple = true; //return multiple results

    var filter = ["displayName"]; //an array of fields to compare against the options.filter 

    navigator.contacts.find(filter, successFunc, errFunc, options);
    //successFunc is the callback function which will run after finding the matches
    //errFunc is the function to run when there is a problem finding the contacts

    //Pages
    pages = document.querySelectorAll('[data-role="page"]');
    numPages = pages.length;
    var links = document.querySelectorAll('[data-role="pagelink"]');
    numLinks = links.length;
    for (var i = 0; i < numLinks; i++) {
        //console.log( links[i] );
        links[i].addEventListener("click", handleNav, false);
    }
    loadPage(null);
});

function handleNav(ev) {
    ev.preventDefault();
    var href = ev.target.href;
    var parts = href.split("#");
    loadPage(parts[1]);
    return false;
}

function loadPage(url) {
    if (url == null) {
        //home page first call
        pages[0].style.display = 'block';
        history.replaceState(null, null, "#home");
    } else {
        //no longer on the home page... show the back
        document.querySelector('[data-rel="back"]').style.display = "block";

        for (var i = 0; i < numPages; i++) {
            if (pages[i].id == url) {
                pages[i].style.display = "block";
                history.pushState("#" + url);
            } else {
                pages[i].style.display = "none";
            }
        }
    }
    //if (url == "contact") {
    //    getContacts();
    //}
}

//Touch Delay

function detectTouchSupport() {
    msGesture = navigator && navigator.msPointerEnabled && navigator.msMaxTouchPoints > 0 && MSGesture;
    var touchSupport = (("ontouchstart" in window) || msGesture || (window.DocumentTouch && document instanceof DocumentTouch));
    return touchSupport;
}

function touchHandler(ev) {
    //this function will run when the touch events happen
    if (ev.type == "touchend") {
        ev.preventDefault();
        var touch = evt.changedTouches[0]; //this is the first object touched

        var newEvt = document.createEvent("MouseEvent"); //old method works across browsers, though it is deprecated.
        /**
        event.initMouseEvent(type, canBubble, cancelable, view,
                         detail, screenX, screenY, clientX, clientY,
                         ctrlKey, altKey, shiftKey, metaKey,
                         button, relatedTarget); **/
        newEvt.initMouseEvent("click", true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY);
        //var newEvt = new MouseEvent("click");				//new method
        //REF: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent.MouseEvent
        ev.currentTarget.dispatchEvent(newEvt);
        //change the touchend event into a click event and dispatch it immediately
        //this will skip the built-in 300ms delay before the click is fired by the browser
    }
}

//Contacts

function successFunc(matches) {
    var cont = matches[Math.floor(Math.random() * matches.length)];
    console.log(cont);

    var displayName = cont.displayName;
    var phoneNumbers = cont.phoneNumbers[0].value;
    var emails = "";

    if (cont.emails) {
        emails = cont.emails;
    } else {
        emails = "No email on file";
    }

    var info = "";
    info += "<p>" + displayName + "</p>";
    info += "<p>" + phoneNumbers + "</p>";
    info += "<p>" + emails + "</p>";

    var contactTitle = document.getElementById("contactInfo");
    console.log(contactTitle);
    contactTitle.innerHTML += info;

}

function errFunc() {
    console.log("Cannot locate contacts");
}