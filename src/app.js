
/**
 * 游戏入口
 */
var GameLayer = cc.Layer.extend({
    sprite:null,
    cards: [],
    cardbg: null,
    cardbgStack: null,
    cardbgBatch: null,
    shuffleAnimating: false,
    sources: [],            // 数据源
    players: [],            // 用户
    datas: [],              // 随机后的数据
    playersData: [],        // 用户数据[[1,2,3], [3,4,5], ...]

    showCardsType: false,
    debugCardsNumber: 13,       // 分发牌的数量
    debugSortType: types.SORT_RULE_WEIGHT_BIG, // 卡牌排序规则

    ctor:function () {
        this._super();

        let size = cc.winSize;

        this.showCardsType = config.SHOW_CARDS_TYPE
        this.debugSortType = config.SORT_CARDS_TYPE

        // 数据源
        for (let i = 0; i < 54; ++i) {
            this.datas.push(i)
        }
        
        // bg
        this.sprite = new cc.Sprite(res.Background_png);
        let w = size.width / this.sprite.getTextureRect().width
        let h = size.height / this.sprite.getTextureRect().height
        let mscale = w > h ? w : h

        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: mscale  
        });
        this.addChild(this.sprite, 0);

        // start btn
        let item1 = new cc.MenuItemFont("开始发牌", this.onStartGame, this);
        this.startMenu = new cc.Menu(item1);
        this.startMenu.alignItemsVertically();
        this.addChild(this.startMenu);

        // Test btn
        this._addTestButton()
    
        // 所有用户
        let interval = 0.05
        
        this.players = []
        for (let i = 0; i < config.MAX_PLAYERS; ++i) {
            this.players[i] = new cardGroup({
                isShowFront: true,
                interval: interval,
                datas: [],
                onFinishedCB: () => {
                    this.shuffleAnimating = false
                    this.startMenu.setVisible(true)
                }
            })
            this.addChild(this.players[i])
        }

        let height = 50
        this.players[0].attr({
            x: size.width / 2,
            y: height,
        })
        this.players[1].attr({
            x: height,
            y: size.height / 2,
            rotation: 90,
        })
        this.players[2].attr({
            x: size.width / 2,
            y: size.height - height
        })
        this.players[3].attr({
            x: size.width - height,
            y: size.height / 2,
            rotation: 270,
        })

        return true;
    },

    onStartGame:function (sender) {

        if (!this.shuffleAnimating) {
            this.shuffleAnimating = true

            this.startMenu.setVisible(false)

            // 洗牌
            utils.shuffle(this.datas)

            // 重新渲染
            for (let i = 0; i < config.MAX_PLAYERS; ++i) {
                this.playersData[i] = this.datas.slice(i * config.MAX_CARDS_PER_PERSON, (i+1) * config.MAX_CARDS_PER_PERSON)

                this.playersData[i] = utils.sortCards(this.playersData[i], this.debugSortType)

                let isShowFront = true
                if (this.showCardsType === types.SHOW_CARDS_SELF) {
                    if (i > 0)
                        isShowFront = false
                }

                this.players[i].resetDatas({
                    datas: this.playersData[i],
                    isShowFront: isShowFront
                })
            }

        }
    },

    // 添加测试按钮，仅在测试模式下有效
    _addTestButton() {
        if (config.TEST_MODE == false)
            return

        let size = cc.winSize;

        let item1 = new cc.MenuItemFont("显示所有/个别卡牌", this.onChangeShowCardType, this);
        item1.attr({
            x: 0,
            y: 0,
            anchorX: 0,
            fontSize: 10,
        })

        cc.log("this.debugSortType:" + this.debugSortType + " types:" + types.SORT_RULE_NAMES[1])

        // 排列顺序
        let name = types.SORT_RULE_NAMES[this.debugSortType]
        this.sortItem = new cc.MenuItemFont("排列:" + name, this.onChangeSortType, this);
        this.sortItem.attr({
            x: 0,
            y: -20,
            anchorX: 0,
            fontSize: 10,
        })

        this.testMenu = new cc.Menu(item1, this.sortItem);
        this.testMenu.attr({
            x: 60,
            y: size.height - 30,
        })
        this.addChild(this.testMenu);
    },
    
    // 更改显示隐藏卡牌
    onChangeShowCardType: function() {
        switch(this.showCardsType) {
            case types.SHOW_CARDS_SELF: {
                this.showCardsType = types.SHOW_CARDS_ALL
                break
            }
            case types.SHOW_CARDS_ALL: {
                this.showCardsType = types.SHOW_CARDS_SELF
                break
            }
            default:
                this.showCardsType = types.SHOW_CARDS_ALL
            break
        }
    },

    // 更改排序类型
    onChangeSortType: function() {
        this.debugSortType = ++this.debugSortType % types.SORT_RULE_CUSTOM

        let name = "排序:" + types.SORT_RULE_NAMES[this.debugSortType]
        this.sortItem.setString(name)
    }

});

var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var layer = new GameLayer();
        this.addChild(layer);
    }
});

