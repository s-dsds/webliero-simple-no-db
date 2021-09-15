COMMAND_REGISTRY.init(window.WLROOM, {});

COMMAND_REGISTRY.add("admin", ["!admin: gives you admin if you're entitled to it"], (player) => {
    let a = auth.get(player.id);
    if (!(admins.has(a) || hidden.has(a))) {
        announce("sorry you can't do that 😅😅", player)
        return true;
    } 
    window.WLROOM.setPlayerAdmin(player.id, true);
    return false;
}, false);
