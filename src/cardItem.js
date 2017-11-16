/**
 * 单个卡牌
 */
var cardItem = cc.Node.extend({
    ctor:function (idx) {
        this._super(idx);

        let bgpath
        if (idx < 0) {
            bgpath = res.cardbg
        } else {
            bgpath = res.cards[idx]
        }
        // cc.log("bgpath:" + bgpath)

        let sp = new cc.Sprite(bgpath)
        this.addChild(sp, 0);

        return true
    }
});

