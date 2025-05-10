const mongoose = require('mongoose');
require('dotenv').config({ path: 'src/config.env' });
async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ Kết nối MongoDB thành công!');
    } catch (error) {
        console.log("Ket noi that bai", error)
    }

}

module.exports = { connect };