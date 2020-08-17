const Redis = require("./index")
const init = async () => {
    const redis = new Redis();
    // redis.Set("data", "asads")
    console.log(redis.Get("data"))
}

init()