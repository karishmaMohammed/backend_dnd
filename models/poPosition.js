const mongoose = require('mongoose');

const poPositionSchema = new mongoose.Schema({
    item_id:{},
    position_num: {type: Number},
    x_direction : {type: String},
    y_direction : {type: String},
    width: {type: String},
    min_width : {type: String}
}, {
    timestamps: true,
});

const poPositionModel = mongoose.model('po_positions', poPositionSchema);
module.exports = { poPositionModel };
