export default class Domain {
    constructor() {
        this.HTTP = location.protocol + "//";
        this.PROJECT_PATH = "/ReactEasyUI/build/";
        this.DOMAIN = {
            ONLINE: "static.dma.cig.com.cn",
            TEST: "static.dmas.cig.com.cn",
            GITHUB: "./",
            FILE: "../"
        };
    }

    staticUrl() {
        let _host = location.host.toLowerCase();
        if (!_host) {
            return this.DOMAIN["FILE"];
        }
        else if (_host.indexOf("dma.cig.com.cn") >= 0) {
            return this.HTTP + this.DOMAIN["ONLINE"] + this.PROJECT_PATH;
        } else if (_host.indexOf("dmas.cig.com.cn") >= 0 || _host.indexOf("test") >= 0) {
            return this.HTTP + this.DOMAIN["TEST"] + this.PROJECT_PATH;
        } else if (_host.indexOf("github.io") >= 0) {
            return this.DOMAIN["GITHUB"];
        } else {
            return this.HTTP + _host + this.PROJECT_PATH;
        }
    }
}