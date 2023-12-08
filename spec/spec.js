describe("Interactive Music Visualization", function () {
  let slider1;

  beforeEach(function () {
    slider1 = { value: jasmine.createSpy("value").and.returnValue(5) };

    window.ellipse = jasmine.createSpy("ellipse");
  });

  describe("bulb1 function", function () {
    it("should draw an ellipse at the correct position based on slider1 value", function () {
      bulb1(slider1, 1, 1);

      let expectedX = 400 / 25 / 2 + (400 / 25) * 2;
      let expectedY = (400 / 26) * slider1.value() + 400 / 26 / 2;
      expect(window.ellipse).toHaveBeenCalledWith(
        expectedX,
        expectedY,
        jasmine.any(Number),
        jasmine.any(Number)
      );
    });
  });
});
