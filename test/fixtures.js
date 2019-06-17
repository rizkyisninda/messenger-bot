module.exports = async (db) => {
    try {
        const truncateTableMessage = 'truncate message;'
        const addMessageData = `INSERT INTO message (id, message, sender_id, created_at, updated_at, deleted_at) VALUES
            (13, 'hai', '2680806365282748', 1560778969, NULL, NULL),
            (14, 'hai', '2680806365282748', 1560778969, NULL, NULL),
            (15, 'hai', '2680806365282748', 1560778969, NULL, NULL),
            (16, 'hai', '2680806365282748', 1560779185, NULL, NULL),
            (17, 'test', '2433361193350736', 1560779185, NULL, NULL),
            (18, 'hai', '2433361193350736', 1560779264, NULL, NULL);
        
        `

        await db.query(truncateTableMessage)
        await db.query(addMessageData)
        return db
    } catch (error) {
        throw error
    }
}
