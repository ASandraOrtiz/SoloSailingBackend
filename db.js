const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log("Conectado a MongoDB");
});

mongoose.connection.on("error", (err) => {
    console.error("Error en la conexión a MongoDB:", err);
});

module.exports = mongoose;
