const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const InamhiSchema = Schema(
    {
        headers: { type: Array },
        data: {
          type: Array,
        },
        id_esta: { type: Number },
        name: { type: String },
        type: { type: String },
        fecha: { type: Date },
    },
    { timestamps: true, versionKey: false, collection: "inamhi" }
);

InamhiSchema.statics = {
    findRow({ fecha, id_esta, type }) {
        const self = this
        return new Promise(function(resolve) {
          resolve(self.findOne({ fecha, id_esta, type }))
        })
    },
}

InamhiSchema.methods = {
    create() {
      return new Promise((resolve) => {
        resolve(this.save())
      })
    }
}  

module.exports = mongoose.model("Inamhi", InamhiSchema);