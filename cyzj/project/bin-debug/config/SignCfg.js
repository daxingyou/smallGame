var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SignCfg = (function () {
    function SignCfg() {
    }
    SignCfg.signCfgs = [
        {
            reward: 10016,
            num: 60,
        },
        {
            reward: 10001,
            num: 10,
        },
        {
            reward: 10009,
            num: 1,
        },
        {
            reward: 10003,
            num: 5,
        },
        {
            reward: 10010,
            num: 1,
        },
        {
            reward: 10006,
            num: 3,
        },
        {
            reward: 10015,
            num: 10,
        }
    ];
    return SignCfg;
}());
__reflect(SignCfg.prototype, "SignCfg");
//# sourceMappingURL=SignCfg.js.map