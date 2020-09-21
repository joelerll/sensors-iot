const redis = require("redis")

class Redis {
    constructor () {
        this.client = redis.createClient();  
        console.info("Redis connected!!!");
    }

    connect () {
        return new Promise((resolve, reject) => {
            this.client.on("ready", (error) => {
                if (error) {
                    return reject(error)
                }
                
                return resolve(true)
            });
        })
    }

    Set(key, value, time = 24*60*60) {
        return new Promise((resolve, reject) => {
            this.client.setex(key, time, value, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result)
            });
        })
    }

    Get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            })
        })
    }

    SetCacheInamhi(body, data) {
        return this.Set(`${body.type}|${body.id_esta}|${body.init_date}|${body.end_date}`, JSON.stringify(data))
    }

    GetCacheInamhi(body) {
        return this.Get(`${body.type}|${body.id_esta}|${body.init_date}|${body.end_date}`)
    }

    Clean () {
        return new Promise((resolve, reject) => {
            return client.flushdb((err, succeeded) => {
                if (err) {
                    return reject(err);
                }
                return resolve(succeeded);
            });
        })
    }
}

module.exports = Redis