jest.dontMock(__APPDIR__ + '/stores/image.js');

describe('image', function () {
  var Image = require(__APPDIR__ + '/stores/image.js');
  var Images = require(__APPDIR__ + '/stores/images.js');
  var images = new Images();
  describe("initialization", function () {
    it('sets the parent, selected, url, and index', function () {
      var parent = {};
      var image = new Image({selected: false, url: 'http://something.com', index: 0}, parent);
      expect(image.parent).toEqual(parent);
      expect(image.selected).toEqual(false);
      expect(image.url).toEqual("http://something.com");
      expect(image.index).toEqual(0);
    });
  });
  describe("isPastSelected", function () {
    it("returns true if the index is greater than the result of currentSelected", function () {
      images.currentSelected.mockReturnValue(2);
      var image = new Image({selected: false, url: 'http://something.com', index: 5}, images);
      expect(image.isPastSelected()).toBeTruthy();
    });
    it("returns false if the index is less than or equal than the result of currentSelected", function () {
      images.currentSelected.mockReturnValue(6);
      var image = new Image({selected: false, url: 'http://something.com', index: 5}, images);
      expect(image.isPastSelected()).toBeFalsy();
    });
  });
  describe("toggleSelected", function () {
    it("switches the value of selected", function () {
      var image = new Image({selected: false, url: 'http://something.com', index: 0}, parent);
      image.toggleSelected();
      expect(image.selected).toBeTruthy();
      image.toggleSelected();
      expect(image.selected).toBeFalsy();
    });
  });
  describe("distanceFromSelected", function () {
    it("returns the distance from selected", function () {
      images.currentSelected.mockReturnValue(2);
      var image = new Image({selected: false, url: 'http://something.com', index: 5}, images);
      expect(image.distanceFromSelected()).toEqual(3);
    });
  });
});