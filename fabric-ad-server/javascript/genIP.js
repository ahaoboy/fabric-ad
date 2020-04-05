function getIPAdress() {
    var interfaces = require("os").networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (
                alias.family === "IPv4" &&
                alias.address !== "127.0.0.1" &&
                !alias.internal
            ) {
                return alias.address;
            }
        }
    }
}

const fs = require("fs");

const PORT = 3000;
const IP = getIPAdress();
const HOST = `http://${IP}`;

console.log("IP==>", IP, PORT);

const str = `
const PORT = ${PORT};
const IP = "${IP}";
const HOST = "${HOST}";
export { PORT, HOST ,IP};
`;

fs.writeFileSync("./config.js", str, "utf8");
