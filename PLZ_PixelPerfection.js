/*:
 * @plugindesc No more blurry fullscreen.
 * @author Paul Joannon
 *
 * @help
 * 
 * Blurriness is evil.
 */

(function() {

    var styleTag = document.createElement("style");
    styleTag.innerText = "canvas { image-rendering: pixelated; }";
    document.head.appendChild(styleTag);

    ImageManager.loadBitmap = (function(_super) {
        return function(folder, filename, hue, smooth) {
            return _super.call(this, folder, filename, hue, false);
        }
    })(ImageManager.loadBitmap);

    Graphics._updateRealScale = (function(_super) {
        return function() {
            _super.call(this);
            this._realScale = parseInt(this._realScale);
        };
    })(Graphics._updateRealScale);

})();