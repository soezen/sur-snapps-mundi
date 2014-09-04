var utils = require("../../node_modules/utils.js");

describe("PriorityQueue", function() {

    var a = { number: 1 };
    var b = { number: 2 };
    var c = { number: 3 };
    var queue;
    var comparator = function(a, b) {
        return a.number <= b.number;
    };

    beforeEach(function() {
        queue = new utils.PriorityQueue(comparator);
    });

    it("returns a timer object when using new", function() {
        expect(typeof new utils.PriorityQueue(null)).toBe('object');
        expect(typeof utils.PriorityQueue(null)).toBe('object');
    });

    describe("size function", function() {
        it("gives the correct size after pushing", function() {
            queue.push(a);
            expect(queue.size()).toBe(1);

            queue.push(b);
            expect(queue.size()).toBe(2);

            queue.push(c);
            expect(queue.size()).toBe(3);
        });
        it("gives the correct size after pulling", function() {
            queue.push(a);
            queue.push(b);
            queue.push(c);
            expect(queue.size()).toBe(3);

            queue.next();
            expect(queue.size()).toBe(2);

            queue.next();
            expect(queue.size()).toBe(1);

            queue.next();
            expect(queue.size()).toBe(0);
        });
    });

    describe("contains function", function() {
        it("returns false if item is not in queue", function() {
            expect(queue.contains(a)).toBe(false);
            expect(queue.contains(b)).toBe(false);
            expect(queue.contains(c)).toBe(false);
        });
        it("return true after item has been pushed", function() {
            queue.push(b);

            expect(queue.contains(a)).toBe(false);
            expect(queue.contains(b)).toBe(true);
            expect(queue.contains()).toBe(false);
        });
        it("returns false after item has been pulled", function() {
            queue.push(b);
            queue.push(a);

            expect(queue.contains(a)).toBe(true);
            expect(queue.contains(b)).toBe(true);
            expect(queue.contains(c)).toBe(false);

            queue.next();

            expect(queue.contains(a)).toBe(false);
            expect(queue.contains(b)).toBe(true);
            expect(queue.contains(c)).toBe(false);
        });
    });

    describe("hasNext function", function() {
        it("returns false when queue is empty", function() {
            expect(queue.hasNext()).toBe(false);
        });
        it("returns true after item has been pushed", function() {
            queue.push(a);
            expect(queue.hasNext()).toBe(true);
        });
        it("returns true when pulling item that isn't last", function() {
            queue.push(a);
            queue.push(b);

            queue.next();

            expect(queue.hasNext()).toBe(true);
        })
        it("returns false when pulling last item", function() {
            queue.push(a);
            queue.push(b);
            queue.next();
            queue.next();

            expect(queue.hasNext()).toBe(false);
        });
    });

    describe("next function", function() {
        it("returns null if queue is empty", function() {
            expect(queue.next()).toBe(null);
        });
        it("returns only item in queue and removes the item from the queue", function() {
            queue.push(a);

            expect(queue.next()).toBe(a);
            expect(queue.hasNext()).toBe(false);
            expect(queue.contains(a)).toBe(false);
        });
        it("returns item with highest priority from queue and removes it from queue", function() {
            queue.push(b);
            queue.push(a);
            queue.push(c);

            expect(queue.next()).toBe(a);
            expect(queue.hasNext()).toBe(true);
            expect(queue.contains(a)).toBe(false);
            expect(queue.contains(b)).toBe(true);
            expect(queue.contains(c)).toBe(true);
        });
    });

    describe("push function", function() {
        it("adds given item to queue", function() {
            queue.push(a);

            expect(queue.size()).toBe(1);
            expect(queue.contains(a)).toBe(true);
        });
        it("adds item with highest priority in front of the queue", function() {
            queue.push(c);
            queue.push(a);

            expect(queue.size()).toBe(2);
            expect(queue.hasNext()).toBe(true);
            expect(queue.next()).toBe(a);

            expect(queue.size()).toBe(1);
            expect(queue.hasNext()).toBe(true);
            expect(queue.next()).toBe(c);

            expect(queue.size()).toBe(0);
            expect(queue.hasNext()).toBe(false);
        });
        it("adds item with lowest priority at end of the queue", function() {
            queue.push(a);
            queue.push(c);

            expect(queue.size()).toBe(2);
            expect(queue.hasNext()).toBe(true);
            expect(queue.next()).toBe(a);

            expect(queue.size()).toBe(1);
            expect(queue.hasNext()).toBe(true);
            expect(queue.next()).toBe(c);

            expect(queue.size()).toBe(0);
            expect(queue.hasNext()).toBe(false);
        });
        it("adds item with normal priority in middle of the queue", function() {
            queue.push(a);
            queue.push(c);
            queue.push(b);

            expect(queue.size()).toBe(3);
            expect(queue.hasNext()).toBe(true);
            expect(queue.next()).toBe(a);

            expect(queue.size()).toBe(2);
            expect(queue.hasNext()).toBe(true);
            expect(queue.next()).toBe(b);

            expect(queue.size()).toBe(1);
            expect(queue.hasNext()).toBe(true);
            expect(queue.next()).toBe(c);

            expect(queue.size()).toBe(0);
            expect(queue.hasNext()).toBe(false);
        });
        it("does not add item twice if item is already in queue", function() {
            queue.push(a);
            queue.push(a);

            expect(queue.size()).toBe(1);
        });
        it("adds item again after it was pulled", function() {
            queue.push(a);
            queue.push(b);
            queue.next();
            queue.push(a);

            expect(queue.size()).toBe(2);
        });
    });

    describe("pushAll function", function() {
        it("adds all the given items in the queue", function() {
            queue.pushAll([c, a, b]);

            expect(queue.size()).toBe(3);
            expect(queue.contains(a)).toBe(true);
            expect(queue.contains(b)).toBe(true);
            expect(queue.contains(c)).toBe(true);
        });
        it("adds all the given items in the correct order", function() {
            queue.push(b);
            queue.pushAll([c, a]);

            expect(queue.size()).toBe(3);
            expect(queue.next()).toBe(a);
            expect(queue.next()).toBe(b);
            expect(queue.next()).toBe(c);
        });
        it("does not add duplicates in the queue", function() {
            queue.push(b);
            queue.pushAll([a, b, c]);

            expect(queue.size()).toBe(3);
        });
        it("throws an error when something other then a list was given as input", function() {
            expect(true).toBe(false);
        });
    });

    describe("forEach function", function() {
        it("executes the given method for each item in the queue", function() {
            var items = [];
            var method = function(item) {
                items.push(item);
            };

            queue.pushAll([a, b, c]);
            queue.forEach(method);

            expect(items.length).toBe(3);
            expect(items.indexOf(a)).not.toBe(-1);
            expect(items.indexOf(b)).not.toBe(-1);
            expect(items.indexOf(c)).not.toBe(-1);
        });
        it("executes the given method for each item in the queue in the correct order", function() {
            var items = [];
            var method = function(item) {
                items.push(item);
            };

            queue.pushAll([b, c, a]);
            queue.forEach(method);

            expect(items.length).toBe(3);
            expect(items.indexOf(a)).toBe(0);
            expect(items.indexOf(b)).toBe(1);
            expect(items.indexOf(c)).toBe(2);
        });
        it("executes the given method even for items added by the method", function() {
            var hits = 0;
            var method = function(item) {
                hits++;
                if (item === a) {
                    queue.pushAll([b, c]);
                }
            };

            queue.push(a);
            queue.forEach(method);

            expect(hits).toBe(3);
        });
        it("executes the given method for each item in correct order even for items added by the method", function() {
            var items = [];
            var method = function(item) {
                items.push(item);
                if (item === b) {
                    items.push(a);
                }
            };

            queue.pushAll([b, c]);
            queue.forEach(method);

            expect(items.length).toBe(3);
            expect(items.indexOf(a)).toBe(1);
            expect(items.indexOf(b)).toBe(0);
            expect(items.indexOf(c)).toBe(2);
        });
    });
});