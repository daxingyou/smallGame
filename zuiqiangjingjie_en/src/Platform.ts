/** 
 * Platform data interface。
 * Because each game usually needs to be released to multiple platforms，Therefore, a unified interface is extracted for developers to obtain platform data information
 * Recommend developers to encapsulate the platform logic in this way，To ensure the stability of the overall structure
 * Because the interface forms of different platforms are different，Egret recommends that developers encapsulate all interfaces as Promise Asynchronous form of
 */
declare interface Platform {

    getUserInfo(): Promise<any>;

    login(): Promise<any>

}

class DebugPlatform implements Platform {
    async getUserInfo() {
        return { nickName: "username" }
    }
    async login() {

    }
}


if (!window.platform) {
    window.platform = new DebugPlatform();
}



declare let platform: Platform;

declare interface Window {

    platform: Platform
}





