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