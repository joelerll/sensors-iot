const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const LandingSchema = Schema(
    {
        titulo: { type: String, default: "Iniciativa de datos abiertos de Guayaquil" },
        titulo_tab: { type: String, default: "Destacados" },
        titulo_tab_1: { type: String, default: "Medicion" },
        titulo_tab_2: { type: String, default: "Impacto" },
        texto_tab_1: { type: String, default: "Nunc euismod vel nunc dolor curabitur enim libero laoreet adipiscing id condimentum sit dolor a odio viverra libero a auctor nec vitae condimentum libero libero auctor vitae laoreet curabitur viverra enim consectetur dolor amet elit vel curabitur tincidunt atlorem in elit libero dolor ipsum id laoreet libero condimentum est euismod condimentum dolor atlorem nullam condimentum libero nullam odio id id sit elit odio libero a auctor est consectetur at ipsum consectetur vel nec sit sagittis id tincidunt amet amet amet in id vel amet adipiscing sagittis odio dolor auctor consectetur est enim viverra tincidunt nec ipsum euismod vel curabitur adipiscing curabitur sagittis libero sit tincidunt enim nec viverra id atlorem dolor est lorem elit sagittis nullam sit nunc id in adipiscing nullam auctor consectetur vitae est euismod enim elit euismod laoreet id odio vitae nunc atlorem nunc tincidunt laoreet nullam viverra ipsum nec id ipsum in dolor libero a vitae" },
        texto_tab_2: { type: String, default: "Nunc euismod vel nunc dolor curabitur enim libero laoreet adipiscing id condimentum sit dolor a odio viverra libero a auctor nec vitae condimentum libero libero auctor vitae laoreet curabitur viverra enim consectetur dolor amet elit vel curabitur tincidunt atlorem in elit libero dolor ipsum id laoreet libero condimentum est euismod condimentum dolor atlorem nullam condimentum libero nullam odio id id sit elit odio libero a auctor est consectetur at ipsum consectetur vel nec sit sagittis id tincidunt amet amet amet in id vel amet adipiscing sagittis odio dolor auctor consectetur est enim viverra tincidunt nec ipsum euismod vel curabitur adipiscing curabitur sagittis libero sit tincidunt enim nec viverra id atlorem dolor est lorem elit sagittis nullam sit nunc id in adipiscing nullam auctor consectetur vitae est euismod enim elit euismod laoreet id odio vitae nunc atlorem nunc tincidunt laoreet nullam viverra ipsum nec id ipsum in dolor libero a vitae" },
        image_1: { type: String, default: "https://miro.medium.com/max/1024/1*92OdlxNqI3iChI5kNl1MFg.jpeg" },
        image_2: { type: String, default: "https://images.idgesg.net/images/article/2019/02/iot_internet_of_things_mobile_connections_by_avgust01_gettyimages-1055659210_2400x1600-100788447-large.jpg" },
        fecha: { type: Date },
    },
    { timestamps: true, versionKey: false, collection: "landing" }
);

LandingSchema.statics = {
    findRow() {
        const self = this
        return new Promise(function(resolve) {
          resolve(self.findOne({ }).sort({ createdAt: -1  }))
        })
    },
}

LandingSchema.methods = {
    create() {
      return new Promise((resolve) => {
        resolve(this.save())
      })
    }
}  

module.exports = mongoose.model("Landing", LandingSchema);