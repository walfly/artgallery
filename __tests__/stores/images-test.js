jest.dontMock(__APPDIR__ + '/stores/images.js');
jest.dontMock(__APPDIR__ + '/fixtures/images.js');
var each = require('lodash/collection/each');

describe('the images store', function () {
  var Images = require(__APPDIR__ + '/stores/images.js');
  describe('initialization', function () {
    it('calls getImages', function () {
      var spy = spyOn(Images.prototype, 'getImages');
      var images = new Images();
      expect(spy).toHaveBeenCalled();
    });
  });
  describe('getImages', function () {
    it('returns a list of object with url and selected', function () {
      var list = Images.prototype.getImages();
      expect(list[0].url).toEqual(jasmine.any(String));
      expect(list[0].selected).toBeTruthy();
    });
    it('sets the first item to be selected and the rest to be not selected', function () {
      var list = Images.prototype.getImages();
      expect(list[0].selected).toEqual(true);
      for(var i = 1; i < list.length; i ++){
        expect(list[i].selected).toEqual(false);
      }
    });
  });

  describe("resetList", function () {
    it("sets all images to unselected", function () {
      var images = new Images();
      images.resetList();
      each(images.list, function (image) {
        expect(image.selected).toBeFalsy();
      });
    });
  });

  describe("currentSelected", function () {
    it("returns the index of the currently selected image", function () {
      var images = new Images();
      expect(images.currentSelected()).toEqual(0);
      images.goToIndex(5);
      expect(images.currentSelected()).toEqual(5);   
    });
  });

  describe('goToIndex', function () {
    var images;
    beforeEach(function () {
      images = new Images();
    });
    it("moves selected to the passed in image", function () {
      expect(images.list[0].selected).toBeTruthy();
      images.goToIndex(5);
      expect(images.list[0].selected).toBeFalsy();
      expect(images.list[5].selected).toBeTruthy();
    });
  });

  describe('goToNext', function () {
    var images;
    beforeEach(function () {
      images = new Images();
    });
    it("moves selected to the next index", function () {
      expect(images.list[0].selected).toBeTruthy();
      images.goToNext();
      expect(images.list[0].selected).toBeFalsy();
      expect(images.list[1].selected).toBeTruthy();
    });
    it("moves to the first index if at the last", function () {
      images.goToIndex(images.list.length -1);
      expect(images.list[0].selected).toBeFalsy();
      images.goToNext();
      expect(images.list[0].selected).toBeTruthy();
    });
    it("emits a change event", function () {
      images.emitChange = jest.genMockFn();
      images.goToNext();
      expect(images.emitChange).toBeCalled();
    });
  });

  describe("emitChange", function () {
    it('calls emit with change', function () {
      var images = new Images();
      images.emit = jest.genMockFn();
      images.emitChange();
      expect(images.emit).toBeCalledWith('change');
    });
  });

  describe("addChangeListener", function () {
    it('passes the callback to on with change', function () {
      var images = new Images();
      var cb = function () {};
      images.on = jest.genMockFn();
      images.addChangeListener(cb);
      expect(images.on).toBeCalledWith('change', cb);
    });
  });

  describe("removeChangeListener", function () {
    it('passes the callback to removeListener with change', function () {
      var images = new Images();
      var cb = function () {};
      images.removeListener = jest.genMockFn();
      images.removeChangeListener(cb);
      expect(images.removeListener).toBeCalledWith('change', cb);
    });
  });

});