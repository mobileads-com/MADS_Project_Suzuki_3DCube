/*
 *
 * mads - version 2.00.01
 * Copyright (c) 2015, Ninjoe
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * https://en.wikipedia.org/wiki/MIT_License
 * https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html
 *
 */
var mads = function () {
    /* Get Tracker */
    if (typeof custTracker == 'undefined' && typeof rma != 'undefined') {
        this.custTracker = rma.customize.custTracker;
    } else if (typeof custTracker != 'undefined') {
        this.custTracker = custTracker;
    } else {
        this.custTracker = [];
    }

    /* Unique ID on each initialise */
    this.id = this.uniqId();

    /* Tracked tracker */
    this.tracked = [];

    /* Body Tag */
    this.bodyTag = document.getElementsByTagName('body')[0];

    /* Head Tag */
    this.headTag = document.getElementsByTagName('head')[0];

    /* RMA Widget - Content Area */
    this.contentTag = document.getElementById('rma-widget');

    /* URL Path */
    this.path = typeof rma != 'undefined' ? rma.customize.src : '';
};

/* Generate unique ID */
mads.prototype.uniqId = function () {
    return new Date().getTime();
};

/* Link Opner */
mads.prototype.linkOpener = function (url) {

    if (typeof url != "undefined" && url != "") {
        if (typeof mraid !== 'undefined') {
            mraid.open(url);
        } else {
            window.open(url);
        }
    }
};

/* tracker */
mads.prototype.tracker = function (tt, type, name) {

    /*
     * name is used to make sure that particular tracker is tracked for only once
     * there might have the same type in different location, so it will need the name to differentiate them
     */
    name = name || type;

    if (typeof this.custTracker != 'undefined' && this.custTracker != '' && this.tracked.indexOf(name) == -1) {
        for (var i = 0; i < this.custTracker.length; i++) {
            var img = document.createElement('img');

            /* Insert Macro */
            var src = this.custTracker[i].replace('{{type}}', type);
            src = src.replace('{{tt}}', tt);
            /* */
            img.src = src + '&' + this.id;

            img.style.display = 'none';
            this.bodyTag.appendChild(img);

            this.tracked.push(name);
        }
    }
};

/* Load JS File */
mads.prototype.loadJs = function (js, callback) {
    var script = document.createElement('script');
    script.src = js;

    if (typeof callback != 'undefined') {
        script.onload = callback;
    }

    this.headTag.appendChild(script);
};

/* Load CSS File */
mads.prototype.loadCss = function (href) {
    var link = document.createElement('link');
    link.href = href;
    link.setAttribute('type', 'text/css');
    link.setAttribute('rel', 'stylesheet');

    this.headTag.appendChild(link);
};

var suzuki = function () {
    var _this = this;
    this.sdk = new mads();

    this.sdk.loadCss(this.sdk.path + 'css/style.css');

    this.sdk.loadJs(this.sdk.path + 'js/utility.js');
    //this.sdk.loadJs(this.sdk.path + 'js/box.js');

    this.sdk.loadJs(this.sdk.path + 'js/jquery.js', function () {
        _this.parent = $('#rma-widget');
        _this.parent.addClass('popup');
        _this.sdk.loadJs(_this.sdk.path + 'js/jquery.lightbox_me.js', function () {
            _this.firstScreen();

            var init = function () {
                var box = document.querySelector('.container').children[0],
                    showPanelButtons = document.querySelectorAll('area'),
                    panelClassName = 'show-front';

                onButtonClick = function (event) {
                    box.removeClassName(panelClassName);
                    panelClassName = event.target.className;
                    box.addClassName(panelClassName);
                };

                $('.sfront').on('click', function () {
                    box.removeClassName(panelClassName);
                    panelClassName = 'show-front';
                    box.addClassName('show-front');
                });
                $('.sright').on('click', function () {
                    box.removeClassName(panelClassName);
                    panelClassName = 'show-right';
                    box.addClassName('show-right');
                });
                $('.sback').on('click', function () {
                    box.removeClassName(panelClassName);
                    panelClassName = 'show-back';
                    box.addClassName('show-back');
                });
                $('.sleft').on('click', function () {
                    box.removeClassName(panelClassName);
                    panelClassName = 'show-left';
                    box.addClassName('show-left');
                });
                $('.link.btn-link').on('click', function () {
                    var s = 'http://ngage.nimbuzz.com/?adlink%7C3.0%7C1635%7C5672686%7C1%7C16%7CAdId=13477317;BnId=1;link=http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=20&mc=click&pli=15429493&PluID=0&ord=[timestamp]'.replace('[timestamp]', Date.now());
                    _this.sdk.linkOpener(s);
                });

                for (var i = 0, len = showPanelButtons.length; i < len; i++) {
                    showPanelButtons[i].addEventListener('click', onButtonClick, false);
                }
            };

            init();
        });
    });
};

suzuki.prototype.isEmpty = function (value) {
    return typeof value != 'undefined' && $.trim(value) ? false : true;
};

suzuki.prototype.firstScreen = function () {
    var _this = this;
    this.parent.append('<div class="mads_container"><section id="options" class="first-frame"> ' +
        '<img src="' + _this.sdk.path + 'img/5.jpg" border="0" usemap="#Map" style="float: left;"> ' +
        '<map name="Map"> ' +
        '<area alt="" title="" class="show-front" href="#" shape="rect" coords="92,71,155,136" />' +
        '<area alt="" title="" class="show-right" href="#" shape="rect" coords="161,71,225,135" />' +
        '<area alt="" title="" class="show-back" href="#" shape="rect" coords="91,140,155,203" />' +
        '<area alt="" title="" class="show-left" href="#" shape="rect" coords="161,140,223,203" />' +
        '</map> ' +
        '</section><section class="container">' +
        '<div id="cube" class="show-front">' +
        '<figure class="front"><img src="' + _this.sdk.path + 'img/1.jpg" border="0" usemap="#Map2" class="" style="float: left;">' +
        '</figure>' +
        '<figure class="back"><img src="' + _this.sdk.path + 'img/2.jpg" border="0" usemap="#Map3" class="" style="float: left;">' +
        '</figure>' +
        '<figure class="right"><img src="' + _this.sdk.path + 'img/3.jpg" border="0" usemap="#Map4" class="" style="float: left;">' +
        '</figure>' +
        '<figure class="left"> ' +
        '<img src="' + _this.sdk.path + 'img/4.jpg" border="0" usemap="#Map5" class="" style="float: left;">' +
        '</figure>' +
        '<figure class="top"><img src="' + _this.sdk.path + 'img/1.jpg" style="float: left;" /></figure>' +
        '<figure class="bottom"><img src="' + _this.sdk.path + 'img/2.jpg" style="float: left;" /></figure>' +
        '</div>' +
        '<div class="sfront btn-corner"></div>' +
        '<div class="sright btn-corner"></div>' +
        '<div class="sback btn-corner"></div>' +
        '<div class="sleft btn-corner"></div>' +
        '<div class="link  btn-link"></div>' +
        '</section></div>');
    _this.init();
}

suzuki.prototype.init = function () {
    $(function () {
        $('#rma-widget').lightbox_me({
            centered: true, onLoad: function () {
                $('#rma-widget').find('input:first').focus()
            }
        });
        $("#cube").hide();
        $("#options").show();
    });

    $('#options').on('click', function () {
        $("#rma-widget").lightbox_me({
            centered: true, onLoad: function () {
                $("#rma-widget").find("input:first").focus();
            }
        });
        $("#cube").show();
        $("#options").hide();
    });

    $('area.inframe').click(function (event) {
        $('#cube').removeClass().addClass(event.target.className);
    })
};

var u = new suzuki();


