"use strict";

interface String {
    f(...args: string[]);
}

String.prototype.f = function (...args) {
    var s = this,
        i = args.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), args[i]);
    }
    return s;
};