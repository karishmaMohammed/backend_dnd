const { poPositionModel } = require('../models/poPosition');


async function createDNDPo(req, res) {
    let responseData;
    try {
        const layout = req.body.layout;


        if (!layout || !Array.isArray(layout)) {
            return res.status(400).json({ error: 'Invalid layout data' });
        }


        // Loop through the layout to either update or create new positions
        const positionPromises = layout.map(async (box) => {
            const updateData = {
                x_direction: box.x.toString(),
                y_direction: box.y.toString(),
                width: box.width.toString(),
                min_width: box.minWidth.toString(),
                styles:box.styles
            };


            // Find the position by position_num, if it exists update it, else create a new one
            const updatedPosition = await poPositionModel.findOneAndUpdate(
                { position_num: box.id }, // Check if position_num exists
                { $set: updateData }, // Update the fields
                { new: true, upsert: true } // 'new' returns the updated document, 'upsert' creates a new one if not found
            );


            return updatedPosition; // Return the updated or newly created position
        });


        responseData = await Promise.all(positionPromises);


        return res.status(200).json({
            message: 'Layout data processed successfully',
            data: responseData
        });


    } catch (error) {
        console.error('Error saving or updating layout data:', error);
        return res.status(500).json({ error: 'Failed to save or update layout data' });
    }
}
async function getDNDPo(req, res) {
    try {
        // Retrieve all layout positions from the database
        const layoutData = await poPositionModel.find();


        // If no layout data exists, return an empty array
        if (!layoutData || layoutData.length === 0) {
            return res.status(404).json({ message: 'No layout data found' });
        }


        // Return the fetched layout data
        return res.status(200).json({
            message: 'Layout data fetched successfully',
            data: layoutData
        });


    } catch (error) {
        console.error('Error fetching layout data:', error);
        return res.status(500).json({ error: 'Failed to fetch layout data' });
    }
}



async function deleteDNDPo(req, res) {
    let responseData;
    try {
        const {item} = req.body;
        await poPositionModel.findByIdAndDelete({_id:item});
        return res.status(200).json({
            message: 'Layout data fetched successfully',
            data: responseData
        });


    } catch (error) {
        console.error('Error saving or updating layout data:', error);
        return res.status(500).json({ error: 'Failed to save or update layout data' });
    }
}





module.exports = {
    createDNDPo,
    getDNDPo,
    deleteDNDPo
}





