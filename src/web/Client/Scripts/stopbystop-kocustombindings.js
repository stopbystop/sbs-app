
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
