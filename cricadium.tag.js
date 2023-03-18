var AdMscript = document.createElement("script");
AdMscript.id = "AdSlotLoad";
AdMscript.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
AdMscript.setAttribute("async", "true")
document.getElementsByTagName("head")[0].appendChild(AdMscript);

window.googletag = window.googletag || { cmd: [] };
window.allAds = window.allAds || [];
window.adConfig = {"toplevel": "/269265836/cricadium", "leaderboard": [[728, 90], [970, 90]], "inarticle": [[728, 90]], "sidebar": [[300, 250], [338, 280], [320, 50]], "/": "home", "blog": "article", "desktop": { "leaderboard": [[728, 90], [970, 90], 'fluid'], "inarticle": [[728, 90], 'fluid'], "header": [[728, 90], [970, 90], 'fluid'], "sidebar": [[300, 250], [338, 280], [320, 50], 'fluid'], "comments": [[728, 90], [970, 90], 'fluid'], "content": [[728, 90], [320, 50], [320, 100], [300, 100], 'fluid'], "righrail": [[338, 280], [300, 250], 'fluid'], "reactions": [[728, 90], [970, 90], 'fluid'], }, "mobile": { "header": [[300, 250], [336, 280], [320, 50], [320, 100], [300, 100]], "leaderboard": [[300, 250], [336, 280], [320, 50], [320, 100]], "inarticle": [[300, 250], [336, 280], [320, 50], [320, 100]], "sidebar": [[300, 250], [338, 280], [320, 50], 'fluid'], "comments": [[320, 50], [320, 100], [300, 100], 'fluid'], "content": [[320, 50], [320, 100], [300, 100], 'fluid'], "reactions": [[320, 50], [320, 100], [300, 100], [300, 250], 'fluid'], "righrail": [[320, 50], [320, 100], [300, 100], [300, 250], 'fluid'], } };
window.adstyle = {"mobile": "width:90%;min-height:60px;height:min-content;margin:auto;padding:1%;", "desktop": "width:100%;min-height:100px;margin:auto;text-align:center;" };
function defineAdmanager(id, type) {
    try {
        var page = window.location.pathname;
        page = (page == "/" || page.includes("/page/")) ? "/" : "blog";
        window.device = window.innerWidth < 728 ? "mobile" : "desktop";
        var adUnitName = adConfig[page];
        var adSizes = adConfig[window.device];
        if (adSizes[type] && adSizes) {
            var newAdslot;
            googletag.cmd.push(function () {
                newAdslot = googletag.defineSlot(`${adConfig.toplevel}/${adUnitName}`, adSizes[type], id).addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.enableServices();
                googletag.display(id)
            });
            return newAdslot;
        }
    }
    catch (error) {
        console.info("Adops Items", error);
        return null
    }
};
function loadSlots(adslotsDivs) {
    window.googletag = window.googletag || { cmd: [] };
    var adSlotIDs = [];
    adslotsDivs.forEach((adslot, i) => {
        adslot.style = window.adstyle[window.innerWidth < 728 ? "mobile" : "desktop"];
        var id = adslot.getAttribute('id');
        if (adSlotIDs.includes(id)) { //Updates the duplicate ID
            var oldID = id.split('-')[2];
            var newID = `${oldID}-pos${i + 1}-onpage-${Math.random()}`;
            adslot.setAttribute("id", newID);
            allAds.push(defineAdmanager(newID, oldID));
        }
        allAds.push(defineAdmanager(id, id)); //No duplicates IDs will be same
        adSlotIDs.push(id);
    });
    if (allAds) {
        setInterval(40000, function () { 
            googletag.cmd.push(function () { googletag.pubads().refresh() }) 
        })
    }
};
window.loadSlots = loadSlots;
window.defineAdmanager = defineAdmanager;
window.adslots = document.querySelectorAll('[id*="adops"]');
if (window.adslots) {
    loadSlots(window.adslots); 
}
var resizeObserver = new ResizeObserver(e => {
    window.device = window.innerWidth < 728 ? "mobile" : "desktop";
    var newAdSlot = document.querySelectorAll('[id*="adops"]');
    if (newAdSlot) {
        loadSlots(newAdSlot)
    }
});
resizeObserver.observe(document.querySelector("ul.g1-collection-items"));
