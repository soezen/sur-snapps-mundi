var mundi = require("../../node_modules/sur-snapps-mundi.js");

describe("Field", function() {

    var width = 20;
    var height = 10;

    var field;

    beforeEach(function() {
        field = new mundi.Field(width, height);
    });

    it("returns a Field object when using new", function() {
        expect(typeof new mundi.Field(width, height)).toBe('object');
        expect(typeof mundi.Field(width, height)).toBe('object');
    });

    it("generates all points when initialized", function() {
        var view = field.getView(0, 0, width, height);

        expect(view.length).toBe(200);
    });
});