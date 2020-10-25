/*:
 * @plugindesc Add menu entries to exit the game.
 * @author Paul Joannon
 * 
 * @help
 *
 * @param title
 * @desc Show in Title menu
 * @type boolean
 * @default true
 *
 * @param gameEnd
 * @desc Show in Game End menu
 * @type boolean
 * @default true
 */

(function() {
    var parameters = PluginManager.parameters('PLZ_QuitGameMenu');

    var commandGameEnd = function() {
        SceneManager.exit();
    };

    if (parameters['title']) {
        Window_TitleCommand.prototype.makeCommandList = (function(_super) {
            return function() {
                _super.call(this);
                this.addCommand(TextManager.gameEnd, 'gameEnd');
            }
        })(Window_TitleCommand.prototype.makeCommandList);
    
        Scene_Title.prototype.createCommandWindow = (function(_super) {
            return function() {
                _super.call(this);
                this._commandWindow.setHandler('gameEnd', commandGameEnd.bind(this));
            };
        })(Scene_Title.prototype.createCommandWindow);
    }

    if (parameters['gameEnd']) {
        Window_GameEnd.prototype.makeCommandList = (function(_super) {
            return function() {
                _super.call(this);
                this.addCommand(TextManager.gameEnd, 'gameEnd');
                // Move the new option one step up.
                var length = this._list.length;
                this._list = this._list.slice(0, length - 2)
                                       .concat(this._list.slice(length - 1))
                                       .concat(this._list.slice(length - 2, length - 1));
            };
        })(Window_GameEnd.prototype.makeCommandList);

        Scene_GameEnd.prototype.createCommandWindow = (function(_super) {
            return function() {
                _super.call(this);
                this._commandWindow.setHandler('gameEnd', commandGameEnd.bind(this));
            };
        })(Scene_GameEnd.prototype.createCommandWindow);
    }
})();