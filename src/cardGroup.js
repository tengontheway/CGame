/**
 * 一组卡牌
 */
var cardGroup = cc.Node.extend({
    isShowFront:null,       // 显示正面
    interval: 0.02,         // 动画播放时间, 0直接显示
    datas: [],              // 卡牌的数据
    cards: [],              // 卡牌正面
    cardbgs: [],            // 卡牌背面
    counter: 0,             // 计数器
    onFinishedCB: null,     // 动画回调

    ctor:function (attr) {
        this._super(attr);

        this.isShowFront = attr.isShowFront
        this.interval = attr.interval
        this.datas = attr.datas || []
        this.space = attr.space || 15
        this.onFinishedCB = attr.onFinishedCB

       this.initData(this.datas)

        return true;
    },

    // 初始化数据 todo:优化
    initData: function(datas) {

        // cc.log("-------initData:" + datas.toString())
        // let arr = []
        // for (let i = 0; i < datas.length; ++i) {
        //     let idx = datas[i]
        //     arr.push(utils.cardsWeight[idx])
        // }
        // cc.log("-------initWeight:" + arr.toString())

        for (let i = 0; i < this.cards.length; ++i) {
            this.removeChild(this.cards[i])
            this.removeChild(this.cardbgs[i])
        }

        this.cards = []
        this.cardbgs = []

         // 创建图片列表
         for (let i = 0; i < datas.length; ++i) {
            let card = new cardItem(datas[i])
            card.setVisible(false)
            this.cards.push(card)

            let cardbg = new cardItem(-1)
            cardbg.setVisible(false)
            this.cardbgs.push(cardbg)

            this.addChild(card)
            this.addChild(cardbg)
        }

        // 显示所有图片
        if (this.interval <= 0) {
            this.showCard(datas.length)
            
            if (this.onFinishedCB) {
                this.onFinishedCB()
            }
        } else {
            this.showFrameCard && this.unschedule(this.showFrameCard)
            this.schedule(this.showFrameCard, this.interval, datas.length - 1)
        }
    },

    // 重置显示数据
    resetDatas: function(attr) {
        this.datas = attr.datas || []

        if (attr.isShowFront !== undefined) {
            this.isShowFront = attr.isShowFront
        }

        this.counter = 0

        cc.log("reset data length;" + this.datas.length)
        this.initData(this.datas)
    },

    // 显示卡牌
    showCard: function(cnt) {
        let half = Math.floor(cnt/2)

        for (let i = 0; i < this.datas.length; ++i) {
            if (i < cnt) {
                let offset = cnt % 2 == 0 ? i - half + 0.5 : i - half

                if (this.isShowFront) {
                    this.cards[i].setVisible(true)
                    this.cards[i].attr({
                        x: Math.floor(offset * this.space)
                    })

                    this.cardbgs[i].setVisible(false)
                } else {
                    this.cardbgs[i].setVisible(true)
                    this.cardbgs[i].attr({
                        x: Math.floor(offset * this.space)
                    })

                    this.cards[i].setVisible(false)
                }
                
            } else {
                this.cards[i].setVisible(false)
                this.cardbgs[i].setVisible(false)
            }
        }

    },

    // 显示指定数量的卡牌
    showFrameCard: function() {
        ++this.counter
        this.showCard(this.counter)

        if (this.counter >= this.datas.length) {
            if (this.onFinishedCB) {
                this.onFinishedCB()
            }
        }
    },

    // 显示正面
    setShowFront: function(isShow) {
        this.setShowFront(isShow)

        this.initData(this.datas)
    }   
    

});