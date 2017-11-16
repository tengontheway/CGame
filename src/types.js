/**
 * 全局枚举
 */
var types = {
    SHOW_CARDS_SELF: 0,     // 只亮出自己的牌
    SHOW_CARDS_ALL: 1,      // 所有的牌都亮出

    SORT_RULE_DEF: 0,       // 默认排序
    SORT_RULE_WEIGHT_BIG: 1,     // 按照大端序权重排序
    SORT_RULE_WEIGHT_SMALL: 2,     // 按照小端序权重排序
    SORT_RULE_CUSTOM: 3,    // 自定义排序


}

types.SORT_RULE_NAMES = {
    [types.SORT_RULE_DEF] : "花色", // 花色排序
    [types.SORT_RULE_WEIGHT_BIG] : "大端序", // 花色排序
    [types.SORT_RULE_WEIGHT_SMALL] : "小端序", // 花色排序
}



