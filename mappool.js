var mapCache = new Map();
var baseURL = "https://webliero.gitlab.io/webliero-maps";

var currentMap = 0;
var currentMapName = "";

function loadPool(name) {
	(async () => {
	mypool = await (await fetch(baseURL + '/' +  name)).json();
	})();
}

async function getMapData(mapUrl) {
    let obj = mapCache.get(mapUrl)
    if (obj) {
      return obj;
    }
    try {
        obj = await (await fetch(baseURL + '/' + mapUrl)).arrayBuffer();
    }catch(e) {
        return null;
    }

    
    mapCache.set(mapUrl, obj)
    return obj;
}

function resolveNextMap() {
    currentMap=currentMap+1<mypool.length?currentMap+1:0;
    currentMapName = mypool[currentMap];
}

function next() {
    resolveNextMap();

    loadMapByName(currentMapName);
}

function loadMapByName(name) {
    console.log(name);
    (async () => {
        let data = await getMapData(name);
        if (data == null) {
            notifyAdmins(`map ${name} could not be loaded`)
            window.WLROOM.restartGame();
        } else if (name.split('.').pop()=="png") {    
            window.WLROOM.loadPNGLevel(name, data);
        } else {
            window.WLROOM.loadLev(name, data);
        }
    })();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function shuffle() {
    shuffleArray(pool);
}


COMMAND_REGISTRY.add("map", ["!map #mapname#: load lev map from gitlab webliero.gitlab.io"], (player, ...name) => {
    let n = name.join(" ").trim();
    if (n == "") {
        announce("map name is empty ",player, 0xFFF0000);
    }
    currentMapName = n;
    loadMapByName(currentMapName);
    return false;
}, true);

COMMAND_REGISTRY.add("addmap", ["!addmap #mapname#: adds lev map from gitlab webliero.gitlab.io to pool"], (player, ...name) => {
    let n = name.join(" ").trim();
    if (n == "") {
        announce("map name is empty ",player, 0xFFF0000);
    }
    
    mypool.push(n);
    announce(`${n} added to the pool`,player, 0xFFF0000);
    return false;
}, true);

COMMAND_REGISTRY.add("delmap", ["!delmap #mapname#: removes lev map from gitlab webliero.gitlab.io from pool"], (player, ...name) => {
    let n = name.join(" ").trim();
    if (n == "") {
        announce("map name is empty ", player, 0xFFF0000);
    }
    const idx = mypool.indexOf(n);
    if (idx == -1) {
        announce(`${n} was not found in the pool`, player, 0xFFF0000);
        return false;
    }
    mypool.splice(idx, 1);
    announce(`${n} removed from the pool`, player, 0xFFF0000);
    return false;
}, true);

COMMAND_REGISTRY.add("mapi", ["!mapi #index#: load map by pool index"], (player, idx) => {
    if (typeof idx=="undefined" || idx=="" || isNaN(idx) || idx>=mypool.length) {
        announce("wrong index, choose any index from 0 to "+(mypool.length-1),player, 0xFFF0000);
        return false;
    }
    currentMapName = mypool[idx];
    loadMapByName(currentMapName);
    return false;
}, true);

COMMAND_REGISTRY.add("clearcache", ["!clearcache: clears local map cache"], (player) => {
    mapCache = new Map();
    return false;
}, true);
