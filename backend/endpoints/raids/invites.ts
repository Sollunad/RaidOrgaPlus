import * as db from '../../db/connector';

export {
	invitePlayer, invitablePlayers as invitable, pendingInvitesForPlayer as pendingForPlayer, pendingInvitesForRaid as pendingForRaid,
	acceptInvite as accept, deleteInvite as delete, isInvited
};

async function invitePlayer(user, raid) {
    const stmt = 'INSERT INTO Einladung (fk_raid, fk_spieler) VALUES (?, ?)';
    try {
        return await db.queryV(stmt, [raid, user]);
    } catch(e) {
        throw e;
    }
}

async function invitablePlayers(raid) {
    const stmt = 'SELECT Spieler.id, Spieler.name, Spieler.accname FROM Spieler ' +
        'WHERE NOT Spieler.id IN (' +
            'SELECT fk_spieler FROM Spieler_Raid WHERE fk_raid = ?' +
        ') AND Spieler.id > 9 ' +
        'ORDER BY Spieler.name';
    try {
        return await db.queryV(stmt, [raid, raid]);
    } catch(e) {
        throw e;
    }
}

async function pendingInvitesForPlayer(spieler) {
    const stmt = 'SELECT Einladung.fk_raid as id, Raid.name as name FROM Einladung JOIN Raid ON Raid.id = Einladung.fk_raid WHERE fk_spieler = ?';
    try {
        return await db.queryV(stmt, spieler);
    } catch(e) {
        throw e;
    }
}

async function pendingInvitesForRaid(raid) {
    const stmt = 'SELECT fk_spieler as spieler FROM Einladung WHERE fk_raid = ?';
    try {
        return await db.queryV(stmt, raid);
    } catch(e) {
        throw e;
    }
}

async function acceptInvite(raid, spieler) {
    const stmt = 'INSERT INTO Spieler_Raid (fk_raid, fk_spieler) VALUES (?,?)';
    try {
        await deleteInvite(raid, spieler);
        return await db.queryV(stmt, [raid, spieler]);;
    } catch(e) {
        throw e;
    }
}

async function deleteInvite(raid, spieler) {
    const stmt = 'DELETE FROM Einladung WHERE fk_raid = ? AND fk_spieler = ?';
    try {
        return await db.queryV(stmt, [raid, spieler]);;
    } catch(e) {
        throw e;
    }
}

async function isInvited(raid, spieler) {
    const stmt = 'SELECT * FROM Einladung WHERE fk_raid = ? AND fk_spieler = ?';
    try {
        const response: any = await db.queryV(stmt, [raid, spieler]);
        return response.length > 0;
    } catch(e) {
        throw e;
    }
}
