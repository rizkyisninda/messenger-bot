module.exports = (db) => {
    try {
        const createMessageTable = `
        CREATE TABLE IF NOT EXISTS message (
            id int(11) NOT NULL AUTO_INCREMENT,
            message varchar(100) NOT NULL DEFAULT '',
            sender_id varchar(255) DEFAULT NULL,
            created_at int(11) DEFAULT NULL,
            updated_at int(11) DEFAULT NULL,
            deleted_at int(11) DEFAULT NULL,
            PRIMARY KEY (id)
        ) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
        `

        db.query(createMessageTable)
        return db
    } catch (error) {
        throw error
    }
}
