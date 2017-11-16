
var utils = {}

// 卡牌小端绪权重排列
// 顺序A、2、3、4、5、6、7、8、9、10、J、Q、K、小王、大王
utils.cardsWeightSmall = [
    1, 5, 9, 13, 17, 21, 25, 29, 33, 37, 41, 45, 49,
    2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42, 46, 50,
    3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43, 47, 51,
    4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52,
    53, 54
]

// 大端序, A、2在高级的位置
// 顺序3、4、5、6、7、8、9、10、J、Q、K、A、2、小王、大王
utils.cardsWeightBig = [
    45, 49, 1, 5, 9, 13, 17, 21, 25, 29, 33, 37, 41,
    46, 50, 2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42,
    47, 51, 3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43,
    48, 52, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44,
    53, 54
]

utils.cardsName = [
    "草A", "草2", "草3", "草4", "草5", "草6", "草7", "草8", "草9", "草10", "草J", "草Q", "草K", 
    "片A", "片2", "片3", "片4", "片5", "片6", "片7", "片8", "片9", "片10", "片J", "片Q", "片K", 
    "黑A", "黑2", "黑3", "黑4", "黑5", "黑6", "黑7", "黑8", "黑9", "黑10", "黑J", "黑Q", "黑K", 
    "心A", "心2", "心3", "心4", "心5", "心6", "心7", "心8", "心9", "心10", "心J", "心Q", "心K", 
    "小王", "大王"
]

// 交换数组元素
utils.exchangeArrayElement = function(arr, idx1, idx2) {    
    let tmp = arr[idx1]
    arr[idx1] = arr[idx2]
    arr[idx2] = tmp    
}

// 洗牌
utils.shuffle = function(arr) {
    let len = arr.length
    for (let i = len-1; i >= 1; --i) {
        let ri = Math.floor(Math.random() * (i+1))
        // cc.log(" i: " + i + 'random:' + ri)
        this.exchangeArrayElement(arr, i, ri)
    }
}

// 排序卡牌数据
utils.sortCards = function(arr, rule = types.SORT_RULE_DEF, reverse = false, custom_sort_func = null) {
    let new_arr
    switch(rule) {
        case types.SORT_RULE_DEF: {     // 默认排序(花色排序)
            new_arr = arr.sort((e1, e2) => {
                return reverse ? e2 - e1 : e1 - e2
            })
            break
        }
        case types.SORT_RULE_WEIGHT_BIG: {   // 根据权重比较排序

            new_arr = arr.sort((e1, e2) => {

                let w1 = this.cardsWeightBig[e1]
                let w2 = this.cardsWeightBig[e2]

                let n1 = this.cardsName[e1]
                let n2 = this.cardsName[e2]

                if (w1 < w2) {
                    return -1;
                } else if (w1 > w2) {
                    return 1;
                } else {
                    return 0;
                }

            })
            break
        }
        case types.SORT_RULE_WEIGHT_SMALL: {   // 根据权重比较排序
            
            new_arr = arr.sort((e1, e2) => {

                let w1 = this.cardsWeightSmall[e1]
                let w2 = this.cardsWeightSmall[e2]

                let n1 = this.cardsName[e1]
                let n2 = this.cardsName[e2]

                if (w1 < w2) {
                    return -1;
                } else if (w1 > w2) {
                    return 1;
                } else {
                    return 0;
                }

            })
            break
        }
        case types.SORT_RULE_CUSTOM: {  // 自定义排序
            new_arr = arr.sort((e1, e2) => {
                let ret = custom_sort_func(e1, e2)
                return reverse ? !ret : ret
            })
            break
        }
    }
    return new_arr
}