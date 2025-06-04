/**
 *  Copyright 2023 Shadowcast
 *  Project Name - Sheepdog-therapeutics
 *  Engineer - Vijayant Jha
 */

const Configuration = require('../models/configuration');

async function createDefaultConfig() {
    try {
        // Check if Configuration document exists
        const config = await Configuration.findOne({});
        // If Configuration doesn't exist, create it with default values
        if (!config) {
            const newConfig = await Configuration.create(

                {
                    creatorEarning:80,
                    platformCommission:20
                }

            );
            console.log('Default Configuration created:', newConfig);
        }
    } catch (error) {
        console.error('Error creating default configuration:', error);
    }
}

module.exports = createDefaultConfig;
