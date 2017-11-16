var res = {
    Background_png : "res/background.png",
    cards: [],
    cardbg: "res/cardbg.gif"
};

for (let i = 0; i < 54; ++i) {
    res.cards[i] = "res/" + (i+1) + ".gif"
}

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}



