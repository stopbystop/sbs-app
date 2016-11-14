/**
 * @author Jason Roy for CompareNetworks Inc.
 * Thanks to mikejbond for suggested udaptes
 *
 * Version 1.1
 * Copyright (c) 2009 CompareNetworks Inc.
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
(function($)
{

    // Private variables
    
    var _options = {};
    var _container = {};
    var _breadCrumbElements = {};
    var _autoIntervalArray = [];
	var _easingEquation;
    
    // Public functions
    
    jQuery.fn.jBreadCrumb = function(options)
    {
        _options = $.extend({}, $.fn.jBreadCrumb.defaults, options);
        
        return this.each(function()
        {
            _container = $(this);
            setupBreadCrumb();
        });
        
    };
    
    // Private functions
    
    function setupBreadCrumb()
    {
		//Check if easing plugin exists. If it doesn't, use "swing"
		if(typeof(jQuery.easing) == 'object')
		{
			_easingEquation = 'easeOutQuad'
		}
		else
		{
			_easingEquation = 'swing'
		}
    
        //The reference object containing all of the breadcrumb elements
        _breadCrumbElements = jQuery(_container).find('li');
        
        //Keep it from overflowing in ie6 & 7
        /* alexb: commenting out the next line so it shows up after jqm transition */
        //jQuery(_container).find('ul').wrap('<div style="overflow:hidden; position:relative;  width: ' + jQuery(_container).css("width") + ';"><div>');
        /* end of comment */
        //Set an arbitrary width width to avoid float drop on the animation
        jQuery(_container).find('ul').width(5000);
        
        //If the breadcrumb contains nothing, don't do anything
        if (_breadCrumbElements.length > 0) 
        {
            jQuery(_breadCrumbElements[_breadCrumbElements.length - 1]).addClass('last');
            jQuery(_breadCrumbElements[0]).addClass('first');
            
            //If the breadcrumb object length is long enough, compress.
            
            if (_breadCrumbElements.length > _options.minimumCompressionElements) 
            {
                compressBreadCrumb();
            };
                    };
            };
    
    function compressBreadCrumb()
    {
    
        // Factor to determine if we should compress the element at all
        var finalElement = jQuery(_breadCrumbElements[_breadCrumbElements.length - 1]);
        
        
        // If the final element is really long, compress more elements
        if (jQuery(finalElement).width() > _options.maxFinalElementLength) 
        {
            if (_options.beginingElementsToLeaveOpen > 0) 
            {
                _options.beginingElementsToLeaveOpen--;
                
            }
            if (_options.endElementsToLeaveOpen > 0) 
            {
                _options.endElementsToLeaveOpen--;
            }
        }
        // If the final element is within the short and long range, compress to the default end elements and 1 less beginning elements
        if (jQuery(finalElement).width() < _options.maxFinalElementLength && jQuery(finalElement).width() > _options.minFinalElementLength) 
        {
            if (_options.beginingElementsToLeaveOpen > 0) 
            {
                _options.beginingElementsToLeaveOpen--;
                
            }
        }
        
        var itemsToRemove = _breadCrumbElements.length - 1 - _options.endElementsToLeaveOpen;
        
        // We compress only elements determined by the formula setting below
        
        //TODO : Make this smarter, it's only checking the final elements length.  It could also check the amount of elements.
        jQuery(_breadCrumbElements[_breadCrumbElements.length - 1]).css(
        {
            background: 'none'
        });
        
        $(_breadCrumbElements).each(function(i, listElement)
        {
            if (i > _options.beginingElementsToLeaveOpen && i < itemsToRemove) 
            {
            
                jQuery(listElement).find('a').wrap('<span></span>').width(jQuery(listElement).find('a').width() + 10);
                
                // Add the overlay png.
                jQuery(listElement).append(jQuery('<div class="' + _options.overlayClass + '"></div>').css(
                {
                    display: 'block'
                })).css(
                {
                    background: 'none'
                });
                if (isIE6OrLess()) 
                {
                    fixPNG(jQuery(listElement).find('.' + _options.overlayClass).css(
                    {
                        width: '20px',
                        right: "-1px"
                    }));
                }
                var options = 
                {
                    id: i,
                    width: jQuery(listElement).width(),
                    listElement: jQuery(listElement).find('span'),
                    isAnimating: false,
                    element: jQuery(listElement).find('span')
                
                };
                jQuery(listElement).bind('mouseover', options, expandBreadCrumb).bind('mouseout', options, shrinkBreadCrumb);
                jQuery(listElement).find('a').unbind('mouseover', expandBreadCrumb).unbind('mouseout', shrinkBreadCrumb);
                listElement.autoInterval = setInterval(function()
                {
                    clearInterval(listElement.autoInterval);
                    jQuery(listElement).find('span').animate(
                    {
                        width: _options.previewWidth
                    }, _options.timeInitialCollapse, _options.easing);
                }, (150 * (i - 2)));
                
            }
        });
        
    };
    
    function expandBreadCrumb(e)
    {
        var elementID = e.data.id;
        var originalWidth = e.data.width;
        jQuery(e.data.element).stop();
        jQuery(e.data.element).animate(
        {
            width: originalWidth
        }, 
        {
            duration: _options.timeExpansionAnimation,
            easing: _options.easing,
            queue: false
        });
        return false;
        
    };
    
    function shrinkBreadCrumb(e)
    {
        var elementID = e.data.id;
        jQuery(e.data.element).stop();
        jQuery(e.data.element).animate(
        {
            width: _options.previewWidth
        }, 
        {
            duration: _options.timeCompressionAnimation,
            easing: _options.easing,
            queue: false
        });
        return false;
    };
    
    function isIE6OrLess()
    {
        var isIE6 = $.browser.msie && /MSIE\s(5\.5|6\.)/.test(navigator.userAgent);
        return isIE6;
    };
    // Fix The Overlay for IE6
    function fixPNG(element)
    {
        var image;
        if (jQuery(element).is('img')) 
        {
            image = jQuery(element).attr('src');
        }
        else 
        {
            image = $(element).css('backgroundImage');
            image.match(/^url\(["']?(.*\.png)["']?\)$/i);
            image = RegExp.$1;
            ;
        }
        $(element).css(
        {
            'backgroundImage': 'none',
            'filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=scale, src='" + image + "')"
        });
    };
    
    // Public global variables
    
    jQuery.fn.jBreadCrumb.defaults = 
    {
        maxFinalElementLength: 400,
        minFinalElementLength: 200,
        minimumCompressionElements: 4,
        endElementsToLeaveOpen: 1,
        beginingElementsToLeaveOpen: 1,
        timeExpansionAnimation: 800,
        timeCompressionAnimation: 500,
        timeInitialCollapse: 600,
        easing: _easingEquation,
        overlayClass: 'chevronOverlay',
        previewWidth: 5
    };
    
})(jQuery);

/*!
 Ridiculously Responsive Social Sharing Buttons
 Team: @dbox, @joshuatuscan
 Site: http://www.kurtnoble.com/labs/rrssb
 Twitter: @therealkni

        ___           ___
       /__/|         /__/\        ___
      |  |:|         \  \:\      /  /\
      |  |:|          \  \:\    /  /:/
    __|  |:|      _____\__\:\  /__/::\
   /__/\_|:|____ /__/::::::::\ \__\/\:\__
   \  \:\/:::::/ \  \:\~~\~~\/    \  \:\/\
    \  \::/~~~~   \  \:\  ~~~      \__\::/
     \  \:\        \  \:\          /__/:/
      \  \:\        \  \:\         \__\/
       \__\/         \__\/
*/

+(function (window, $, undefined) {
    'use strict';

    var support = {
        calc: false
    };

    /*
	 * Public Function
	 */

    $.fn.rrssb = function (options) {

        // Settings that $.rrssb() will accept.
        var settings = $.extend({
            description: undefined,
            emailAddress: undefined,
            emailBody: undefined,
            emailSubject: undefined,
            image: undefined,
            title: undefined,
            url: undefined
        }, options);

        // Return the encoded strings if the settings have been changed.
        for (var key in settings) {
            if (settings.hasOwnProperty(key) && settings[key] !== undefined) {
                settings[key] = encodeString(settings[key]);
            }
        };

        if (settings.url !== undefined) {
            $(this).find('.rrssb-facebook a').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + settings.url);
            $(this).find('.rrssb-tumblr a').attr('href', 'http://tumblr.com/share/link?url=' + settings.url + (settings.title !== undefined ? '&name=' + settings.title : '') + (settings.description !== undefined ? '&description=' + settings.description : ''));
            $(this).find('.rrssb-linkedin a').attr('href', 'http://www.linkedin.com/shareArticle?mini=true&url=' + settings.url + (settings.title !== undefined ? '&title=' + settings.title : '') + (settings.description !== undefined ? '&summary=' + settings.description : ''));
            $(this).find('.rrssb-twitter a').attr('href', 'https://twitter.com/intent/tweet?text=' + (settings.description !== undefined ? settings.description : '') + '%20' + settings.url);
            $(this).find('.rrssb-hackernews a').attr('href', 'https://news.ycombinator.com/submitlink?u=' + settings.url + (settings.title !== undefined ? '&text=' + settings.title : ''));
            $(this).find('.rrssb-reddit a').attr('href', 'http://www.reddit.com/submit?url=' + settings.url + (settings.description !== undefined ? '&text=' + settings.description : '') + (settings.title !== undefined ? '&title=' + settings.title : ''));
            $(this).find('.rrssb-googleplus a').attr('href', 'https://plus.google.com/share?url=' + (settings.description !== undefined ? settings.description : '') + '%20' + settings.url);
            $(this).find('.rrssb-pinterest a').attr('href', 'http://pinterest.com/pin/create/button/?url=' + settings.url + ((settings.image !== undefined) ? '&amp;media=' + settings.image : '') + (settings.description !== undefined ? '&amp;description=' + settings.description : ''));
            $(this).find('.rrssb-pocket a').attr('href', 'https://getpocket.com/save?url=' + settings.url);
            $(this).find('.rrssb-github a').attr('href', settings.url);
        }

        if (settings.emailAddress !== undefined) {
            $(this).find('.rrssb-email a').attr('href', 'mailto:' + settings.emailAddress + '?' + (settings.emailSubject !== undefined ? 'subject=' + settings.emailSubject : '') + (settings.emailBody !== undefined ? '&amp;body=' + settings.emailBody : ''));
        }

    };

    /*
	 * Utility functions
	 */
    var detectCalcSupport = function () {
        //detect if calc is natively supported.
        var el = $('<div>');
        var calcProps = [
			'calc',
			'-webkit-calc',
			'-moz-calc'
        ];

        $('body').append(el);

        for (var i = 0; i < calcProps.length; i++) {
            el.css('width', calcProps[i] + '(1px)');
            if (el.width() === 1) {
                support.calc = calcProps[i];
                break;
            }
        }

        el.remove();
    };

    var encodeString = function (string) {
        // Recursively decode string first to ensure we aren't double encoding.
        if (string !== undefined && string !== null) {
            if (string.match(/%[0-9a-f]{2}/i) !== null) {
                string = decodeURIComponent(string);
                encodeString(string);
            } else {
                return encodeURIComponent(string);
            }
        }
    };

    var setPercentBtns = function () {
        // loop through each instance of buttons
        $('.rrssb-buttons').each(function (index) {
            var self = $(this);
            var buttons = $('li:visible', self);
            var numOfButtons = buttons.length;
            var initBtnWidth = 100 / numOfButtons;

            // set initial width of buttons
            buttons.css('width', initBtnWidth + '%').attr('data-initwidth', initBtnWidth);
        });
    };

    var makeExtremityBtns = function () {
        // loop through each instance of buttons
        $('.rrssb-buttons').each(function (index) {
            var self = $(this);
            //get button width
            var containerWidth = self.width();
            var buttonWidth = $('li', self).not('.small').first().width();

            // enlarge buttons if they get wide enough
            if (buttonWidth > 170 && $('li.small', self).length < 1) {
                self.addClass('large-format');
            } else {
                self.removeClass('large-format');
            }

            if (containerWidth < 200) {
                self.removeClass('small-format').addClass('tiny-format');
            } else {
                self.removeClass('tiny-format');
            }
        });
    };

    var backUpFromSmall = function () {
        // loop through each instance of buttons
        $('.rrssb-buttons').each(function (index) {
            var self = $(this);

            var buttons = $('li', self);
            var smallButtons = buttons.filter('.small');
            var totalBtnSze = 0;
            var totalTxtSze = 0;
            var upCandidate = smallButtons.first();
            var nextBackUp = parseFloat(upCandidate.attr('data-size')) + 55;
            var smallBtnCount = smallButtons.length;

            if (smallBtnCount === buttons.length) {
                var btnCalc = smallBtnCount * 42;
                var containerWidth = self.width();

                if ((btnCalc + nextBackUp) < containerWidth) {
                    self.removeClass('small-format');
                    smallButtons.first().removeClass('small');

                    sizeSmallBtns();
                }

            } else {
                buttons.not('.small').each(function (index) {
                    var button = $(this);
                    var txtWidth = parseFloat(button.attr('data-size')) + 55;
                    var btnWidth = parseFloat(button.width());

                    totalBtnSze = totalBtnSze + btnWidth;
                    totalTxtSze = totalTxtSze + txtWidth;
                });

                var spaceLeft = totalBtnSze - totalTxtSze;

                if (nextBackUp < spaceLeft) {
                    upCandidate.removeClass('small');
                    sizeSmallBtns();
                }
            }
        });
    };

    var checkSize = function (init) {
        // loop through each instance of buttons
        $('.rrssb-buttons').each(function (index) {

            var self = $(this);
            var buttons = $('li', self);

            // get buttons in reverse order and loop through each
            $(buttons.get().reverse()).each(function (index, count) {

                var button = $(this);

                if (button.hasClass('small') === false) {
                    var txtWidth = parseFloat(button.attr('data-size')) + 55;
                    var btnWidth = parseFloat(button.width());

                    if (txtWidth > btnWidth) {
                        var btn2small = buttons.not('.small').last();
                        $(btn2small).addClass('small');
                        sizeSmallBtns();
                    }
                }

                if (!--count) backUpFromSmall();
            });
        });

        // if first time running, put it through the magic layout
        if (init === true) {
            rrssbMagicLayout(sizeSmallBtns);
        }
    };

    var sizeSmallBtns = function () {
        // loop through each instance of buttons
        $('.rrssb-buttons').each(function (index) {
            var self = $(this);
            var regButtonCount;
            var regPercent;
            var pixelsOff;
            var magicWidth;
            var smallBtnFraction;
            var buttons = $('li', self);
            var smallButtons = buttons.filter('.small');

            // readjust buttons for small display
            var smallBtnCount = smallButtons.length;

            // make sure there are small buttons
            if (smallBtnCount > 0 && smallBtnCount !== buttons.length) {
                self.removeClass('small-format');

                //make sure small buttons are square when not all small
                smallButtons.css('width', '42px');
                pixelsOff = smallBtnCount * 42;
                regButtonCount = buttons.not('.small').length;
                regPercent = 100 / regButtonCount;
                smallBtnFraction = pixelsOff / regButtonCount;

                // if calc is not supported. calculate the width on the fly.
                if (support.calc === false) {
                    magicWidth = ((self.innerWidth() - 1) / regButtonCount) - smallBtnFraction;
                    magicWidth = Math.floor(magicWidth * 1000) / 1000;
                    magicWidth += 'px';
                } else {
                    magicWidth = support.calc + '(' + regPercent + '% - ' + smallBtnFraction + 'px)';
                }

                buttons.not('.small').css('width', magicWidth);

            } else if (smallBtnCount === buttons.length) {
                // if all buttons are small, change back to percentage
                self.addClass('small-format');
                setPercentBtns();
            } else {
                self.removeClass('small-format');
                setPercentBtns();
            }
        }); //end loop

        makeExtremityBtns();
    };

    var rrssbInit = function () {
        $('.rrssb-buttons').each(function (index) {
            $(this).addClass('rrssb-' + (index + 1));
        });

        detectCalcSupport();

        setPercentBtns();

        // grab initial text width of each button and add as data attr
        $('.rrssb-buttons li .rrssb-text').each(function (index) {
            var buttonTxt = $(this);
            var txtWdth = buttonTxt.width();
            buttonTxt.closest('li').attr('data-size', txtWdth);
        });

        checkSize(true);
    };

    var rrssbMagicLayout = function (callback) {
        //remove small buttons before each conversion try
        $('.rrssb-buttons li.small').removeClass('small');

        checkSize();

        callback();
    };

    var popupCenter = function (url, title, w, h) {
        // Fixes dual-screen position                         Most browsers      Firefox
        var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
        var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        var left = ((width / 2) - (w / 2)) + dualScreenLeft;
        var top = ((height / 3) - (h / 3)) + dualScreenTop;

        var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

        // Puts focus on the newWindow
        if (window.focus) {
            newWindow.focus();
        }
    };

    var waitForFinalEvent = (function () {
        var timers = {};
        return function (callback, ms, uniqueId) {
            if (!uniqueId) {
                uniqueId = "Don't call this twice without a uniqueId";
            }
            if (timers[uniqueId]) {
                clearTimeout(timers[uniqueId]);
            }
            timers[uniqueId] = setTimeout(callback, ms);
        };
    })();

    // init load
    $(document).ready(function () {
        /*
		 * Event listners
		 */

        $(document).on('click', '.rrssb-buttons a.popup', {}, function popUp(e) {
            var self = $(this);
            popupCenter(self.attr('href'), self.find('.rrssb-text').html(), 580, 470);
            e.preventDefault();
        });

        // resize function
        $(window).resize(function () {

            rrssbMagicLayout(sizeSmallBtns);

            waitForFinalEvent(function () {
                rrssbMagicLayout(sizeSmallBtns);
            }, 200, "finished resizing");
        });

        rrssbInit();
    });

    // Make global
    window.rrssbInit = rrssbInit;
    window.rrssbResize = function () {
        rrssbMagicLayout(sizeSmallBtns);
    };

})(window, jQuery);
(function (document, navigator, CACHE, IE9TO11) {
    if (IE9TO11) document.addEventListener('DOMContentLoaded', function () {
        [].forEach.call(document.querySelectorAll('use'), function (use) {
            var
			svg = use.parentNode,
			url = use.getAttribute('xlink:href').split('#'),
			url_root = url[0],
			url_hash = url[1],
			xhr = CACHE[url_root] = CACHE[url_root] || new XMLHttpRequest();

            if (!xhr.s) {
                xhr.s = [];

                xhr.open('GET', url_root);

                xhr.onload = function () {
                    var x = document.createElement('x'), s = xhr.s;

                    x.innerHTML = xhr.responseText;

                    xhr.onload = function () {
                        s.splice(0).map(function (array) {
                            var g = x.querySelector('#' + array[2]);

                            if (g) array[0].replaceChild(g.cloneNode(true), array[1]);
                        });
                    };

                    xhr.onload();
                };

                xhr.send();
            }

            xhr.s.push([svg, use, url_hash]);

            if (xhr.responseText) xhr.onload();
        });
    });
})(
	document,
	navigator,
	{},
	/Trident\/[567]\b/.test(navigator.userAgent)
);
"use strict";
String.prototype.f = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    var s = this, i = args.length;
    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), args[i]);
    }
    return s;
};
//# sourceMappingURL=extensions.js.map

ko.bindingHandlers.jqmchecked = {
    init: ko.bindingHandlers.checked.init,
    update: function (element, valueAccessor) {
        //KO v3 and previous versions of KO handle this differently
        //KO v3 does not use 'update' for 'checked' binding
        if (ko.bindingHandlers.checked.update)
            ko.bindingHandlers.checked.update.apply(this, arguments); //for KO < v3, delegate the call
        else
            ko.utils.unwrapObservable(valueAccessor()); //for KO v3, force a subscription to get further updates

        
        if ($(element).data("mobile-checkboxradio")) //calling 'refresh' only if already enhanced by JQM
            $(element).checkboxradio('refresh');
        
    }
};

http://stackoverflow.com/questions/10757674/knockoutjs-get-the-bound-element-from-a-model-instance
// data-bind="element: observable"
// sets observable to element ..
    ko.bindingHandlers.element = {
        init: function (element, valueAccessor) {
            var target = valueAccessor();
            if (target) {
                target(element);
            }
        }
    };


/*
http://jsfiddle.net/sukobuto/y53mza3p/
    var primitive_if_binding = ko.bindingHandlers['if'];
ko.bindingHandlers['if'] = {
    'init': primitive_if_binding.init,
    'update': function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var ret = null;
        if (primitive_if_binding.update) {
            ret = primitive_if_binding.update(element, valueAccessor, allBindings, viewModel, bindingContext);
        }
        var afterRender = allBindings.get('afterRender');
        if (afterRender && typeof afterRender == 'function') {
            afterRender(element);
        }

        return ret;
    }
}
*/

$(document).on("mobileinit", function () {
    console.log("mobileinit");
    // TODO: enabled ajax navigation and fix the following: (1) sidebar not correctly size, (2) check navigation buttons

    //TODO enable ajax for Cordova only
    //$.mobile.ajaxEnabled = false;

    /* For SPA inject header and footer */
    //$("[data-role='header'], [data-role='footer']").toolbar();
    //$.mobile.resetActivePageHeight();

    // Extension to listview to add keyboard navigation
    (function ($, undefined) {
        $.widget("mobile.listview", $.mobile.listview, {
            options: {
                arrowKeyNav: false,
                enterToNav: false,
                highlight: false,
                submitTo: false
            },
            _create: function () {
                this._super();

                if (this.options.arrowKeyNav) {
                    this._on(document, { "pageshow": "arrowKeyNav" });
                }

                if (this.options.enterToNav) {
                    this._on(document, { "pageshow": "enterToNav" });
                }

            },
            submitTo: function () {
                var url,
                    form = this.element.parent().find("form");

                form.attr("method", "get")
                    .attr("action", this.options.submitTo);

                url = this.options.submitTo + "?search=" + this.element.parent().find("input").val();

                window.location = url;
            },
            enterToNav: function () {
                var form = this.element.parent().find("form");

                form.append("<button type='submit' data-icon='carat-r' data-inline='true' class='ui-hidden-accessible' data-iconpos='notext'>Submit</button>")
                    .parent()
                    .trigger("create");

                this.element.parent().find("form").children(".ui-btn").addClass("ui-hidden-accessible");

                this._on(form, {
                    "submit": "submitHandler"
                });
            },
            enhanced: false,
            arrowKeyNav: function () {
                var input = this.element.prev("form").find("input");

                if (!this.enhanced) {
                    this._on(input, {
                        "keyup": "handleKeyUp"
                    });

                    this.enhanced = true;
                }
            },
            handleKeyUp: function (e) {
                var search,
                    input = this.element.prev("form").find("input");

                if (e.which === $.ui.keyCode.DOWN) {
                    if (this.element.find("li.ui-btn-active").length === 0) {
                        this.element.find("li:first").toggleClass("ui-btn-active").find("a").toggleClass("ui-btn-active");
                    } else {
                        this.element.find("li.ui-btn-active a").toggleClass("ui-btn-active");
                        this.element.find("li.ui-btn-active").toggleClass("ui-btn-active").next().toggleClass("ui-btn-active").find("a").toggleClass("ui-btn-active");
                    }

                    this.highlightDown();
                } else if (e.which === $.ui.keyCode.UP) {
                    if (this.element.find("li.ui-btn-active").length !== 0) {
                        this.element.find("li.ui-btn-active a").toggleClass("ui-btn-active");
                        this.element.find("li.ui-btn-active").toggleClass("ui-btn-active").prev().toggleClass("ui-btn-active").find("a").toggleClass("ui-btn-active");
                    } else {
                        this.element.find("li:last").toggleClass("ui-btn-active").find("a").toggleClass("ui-btn-active");
                    }
                    this.highlightUp();
                } else if (typeof e.which !== "undefined") {
                    this.element.find("li.ui-btn-active").removeClass("ui-btn-active");

                    if (this.options.highlight) {
                        search = input.val();

                        this.element.find("li").each(function () {
                            $(this).removeHighlight();
                            $(this).highlight(search);
                        });
                    }
                }
            },
            submitHandler: function () {
                if (this.element.find("li.ui-btn-active").length !== 0) {
                    var href = this.element.find("li.ui-btn-active a").attr("href");

                    $(":mobile-pagecontainer").pagecontainer("change", href);
                    return false;
                }

                if (this.options.submitTo) {
                    this.submitTo();
                }
            },
            highlightDown: function () {
                if (this.element.find("li.ui-btn-active").hasClass("ui-screen-hidden")) {
                    this.element.find("li.ui-btn-active").find("a").toggleClass("ui-btn-active");
                    this.element.find("li.ui-btn-active").toggleClass("ui-btn-active").next().toggleClass("ui-btn-active").find("a").toggleClass("ui-btn-active");
                    this.highlightDown();
                }
                return;
            },
            highlightUp: function () {
                if (this.element.find("li.ui-btn-active").hasClass("ui-screen-hidden")) {
                    this.element.find("li.ui-btn-active").find("a").toggleClass("ui-btn-active");
                    this.element.find("li.ui-btn-active").toggleClass("ui-btn-active").prev().toggleClass("ui-btn-active").find("a").toggleClass("ui-btn-active");
                    this.highlightUp();
                }
                return;
            }
        });
    })(jQuery);
});