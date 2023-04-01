window.googletag = window.googletag || {cmd: []};
	window.adslots = window.adslots || document.querySelectorAll('[id*="adops"]');  
	window.allAds = window.allAds || [];
    window.adConfig = {"toplevel": "/269265836/cricadium", "leaderboard": [[728, 90], [970, 90]], "inarticle": [[728, 90]], "sidebar": [[300, 250], [338, 280], [320, 50]], "/": "home", "blog": "article", "desktop": { "leaderboard": [[728, 90], [970, 90], [970,250], 'fluid'], "inarticle": [[728, 90],[320, 100], 'fluid'], "header": [[728, 90], [970, 90], 'fluid'], "sidebar": [[300, 250], [338, 280], [320, 50], 'fluid'],  "sidebarbottom": [[300, 250], [300, 600], [300, 1050], [338, 280], [320, 50], 'fluid'], "comments": [[728, 90], [970, 90], 'fluid'], "content": [[728, 90], [320, 50], [320, 100], [300, 100], 'fluid'], "righrail": [[338, 280], [300, 250], 'fluid'], "reactions": [[728, 90], [970, 90], 'fluid'], }, "mobile": { "header": [[300, 250], [336, 280], [320, 50], [320, 100], [300, 100]], "leaderboard": [[300, 250], [336, 280], [320, 50], [320, 100]], "inarticle": [[300, 250], [336, 280], [320, 50], [320, 100]], "sidebarbottom": [[300, 250], [338, 280], [300, 600], [320, 50], 'fluid'] ,"sidebar": [[300, 250], [338, 280], [320, 50], 'fluid'], "comments": [[320, 50], [320, 100], [300, 100], 'fluid'], "content": [[320, 50], [320, 100], [300, 100], 'fluid'], "reactions": [[320, 50], [320, 100], [300, 100], [300, 250], 'fluid'], "righrail": [[320, 50], [320, 100], [300, 100], [300, 250], 'fluid'], } };
    window.adstyle = {"mobile": "width:90%;min-height:60px;height:min-content;margin:auto;padding:1%;", "desktop": "width:100%;min-height:100px;margin:auto;text-align:center;" };
    
    var interstital, anchorad;
    
    googletag.cmd.push(function(){
        anchorad = googletag.defineOutOfPageSlot(`${adConfig.toplevel}/anchortag`, googletag.enums.OutOfPageFormat.BOTTOM_ANCHOR); 
        interstital = googletag.defineOutOfPageSlot(`${adConfig.toplevel}/web_interstitials`, googletag.enums.OutOfPageFormat.INTERSTITIAL);
        anchorad? (anchorad.addService(googletag.pubads()) && googletag.pubads().enableSingleRequest()): "";
        interstital? (interstital.addService(googletag.pubads()) && googletag.pubads().enableSingleRequest()) : ""; 
    });
	function defineAdmanager(id, type) {
		try {
			var page = window.location.pathname;
			page = (page == "/" || page.includes("/page/")) ? "/" : "blog"; 
			window.device = window.innerWidth < 728? "mobile":"desktop";  
			var adUnitName = adConfig[page];
			var adSizes = adConfig[window.device];
			if(adSizes[type] && adSizes){
				var newAdslot; 
				googletag.cmd.push(function() {
					newAdslot = googletag.defineSlot(`${adConfig.toplevel}/${adUnitName}`, adSizes[type], id).addService(googletag.pubads());  
					googletag.pubads().enableSingleRequest();
					googletag.enableServices();  
					googletag.display(id);
				}); 
				return newAdslot;
			}
			console.log(type, adSizes[type], id, adConfig[window.device])
			return; 
		} catch (error) {
			console.info("Adops Items",error);
			return null;
		}
	};  
 
	window.adstyle = {"mobile":"width:90%;min-height:60px;height:min-content;margin:auto;padding:1%;","desktop": "width:100%;min-height:100px;margin:auto;text-align:center;"}; 
	function loadSlots(adslotsDivs) { 
		var page = window.location.pathname;  
		adslotsDivs.forEach((adslot, i) => { 
			var oldID = adslot.getAttribute('id').split('-')[2];  
			var newID = `${oldID}-pos${i + 1}-onpage-${Math.random()}`; 
			adslot.setAttribute("id", newID); 
			adslot.style = window.adstyle[window.innerWidth<728? "mobile":"desktop"]; 
			allAds.push(defineAdmanager(newID, oldID)); 
		});
		if(allAds){
			setInterval(40000, function () {
				googletag.cmd.push(function() {
					 googletag.pubads().refresh();
				});
			})
		}
	}
	window.loadSlots = loadSlots; 
	window.defineAdmanager = defineAdmanager;
	loadSlots(window.adslots ); 
	if(window.location.pathname == "/"){ //g1-collection-items
		var resizeObserver = new ResizeObserver(e => { 
			window.device = window.innerWidth < 728? "mobile":"desktop"; 
		    var newAdSlot = document.querySelectorAll('[id*="adops"]');   
			newAdSlot? loadSlots(newAdSlot ): "";  
		}); 
		resizeObserver.observe(document.querySelector("ul.g1-collection-items"));
	}
	
