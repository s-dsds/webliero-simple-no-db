var admins = new Set(CONFIG.admins);
var hidden = new Set(CONFIG.hidden);

let auth = new Map();
var fdb;

var commentsRef;
var notifsRef;

var commands;

(async function () {
	console.log("Running Server...");
	var room = WLInit({
		token: window.WLTOKEN,
		roomName: CONFIG.room_name,
		maxPlayers: 12,	
		public: CONFIG.public
	});

	room.setSettings({
		scoreLimit: 15,
        timeLimit: 10,
        loadingTimes: 0.4,
		gameMode: "dm",
		levelPool: "arenasBest",
		respawnDelay: 3,
        bonusDrops: "healthAndWeapons",
        maxDuplicateWeapons: 0,
        bonusSpawnFrequency: 6,
		teamsLocked: false,
	});
	window.WLROOM = room;

	room.onRoomLink = (link) => console.log(link);
	room.onCaptcha = () => console.log("Invalid token");
})();