/*:
 * @plugindesc Fine tune item targeting.
 * @author Paul Joannon
 *
 * @help
 * 
 * Define valid targets with note tags.
 * Use Actor IDs or Enemy IDs depending on Item Scope. 
 *
 * Item Note:
 * <CanTarget:actorId,actorId,...>
 * <CanTarget:enemyId,enemyId,...>
 */

(function() {
    var _Game_Action_testApply = Game_Action.prototype.testApply;
    Game_Action.prototype.testApply = function(target) {
        return _Game_Action_testApply.call(this, target)
            && (!this.isItem() || this.hasItemAnyValidTargets(target));
    };

    Game_Action.prototype.hasItemAnyValidTargets = function(target) {
        return (
            !this.item().meta['CanTarget'] || this.item().meta['CanTarget'].split(",").some(function(idx) {
                return parseInt(idx) === (this.isForFriend() ? target.actorId() : target.enemyId());
            }, this)
        );
    };
})();
