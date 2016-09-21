"use strict";

const mapEvents = require("sigh-core/lib/stream").mapEvents;
// const log = require("sigh-core").log;
// const Bacon = require("sigh-core").Bacon;

module.exports = function(op, handler) {
    return mapEvents(op.stream, handler);
};