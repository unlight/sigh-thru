const assert = require("assert");

const ProcessPool = require("process-pool");
const Bacon = require("sigh-core").Bacon;
const Event = require("sigh-core/lib/Event").default;

const lib = require("..");

var context = {};

new Promise(resolve => {
    var event = new Event({
        basePath: "root",
        path: "file.ts",
        type: "add",
        data: "let s = 'dummy'"
    });
    context.stream = Bacon.constant([event]);
    context.procPool = new ProcessPool();
    resolve();
})
.then(() => {

    var op = { stream: context.stream, procPool: context.procPool };
    var handler = function(event) {
        event.data = "42"
        return event;
    };
    return lib(op, handler).toPromise().then(events => {
        assert.equal(events[0].data, "42");
    });

})
.then(() => {
    context.procPool.destroy();
})
.catch(err => {
    console.log(err);
})