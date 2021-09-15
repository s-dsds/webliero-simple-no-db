window.WLROOM.onPlayerLeave = function(player) {  
	auth.delete(player.id);
}

window.WLROOM.onGameEnd2 = function() {
	next();
}

function announce(msg, player, color, style) {
	window.WLROOM.sendAnnouncement(msg, typeof player =='undefined' || player == null?null:player.id, color!=null?color:0xb2f1d3, style !=null?style:"", 1);
}

function notifyAdmins(msg, logNotif = false) {
	getAdmins().forEach((a) => { window.WLROOM.sendAnnouncement(msg, a.id); });
}

function getAdmins() {
	return window.WLROOM.getPlayerList().filter((p) => p.admin);
}

function moveAllPlayersToSpectator() {
    for (let p of window.WLROOM.getPlayerList()) {
        window.WLROOM.setPlayerTeam(p.id, 0);
    }
}
