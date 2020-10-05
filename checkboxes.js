javascript: (function () { var mod = document.createElement('script'); mod.src = 'https://cdn.jsdelivr.net/gh/Bioniclegenius/NummonCalc/NummonCalc.js'; mod.id = 'modscript_TriggerNotify'; document.head.appendChild(mod); })();
/* globals */

var period = 1 // number of seconds between clicks

var huntbutton = document.getElementById('fastHuntContainerCount');
var observebutton = document.getElementById('observeBtn');
var praisebutton = document.getElementById('fastPraiseContainer').childNodes[0];

/* infrustructure */

function addForm(){
    var form = document.createElement("form")

    form.appendChild(createCheckbox("Autoclick", toggle))
    form.appendChild(createScienceButton())
    form.appendChild(createCheckbox("Manage Basic Resource Caps"))
    form.appendChild(createCheckbox("Hunt"))
    form.appendChild(createCheckbox("Praise"))
    form.appendChild(createCheckbox("Blueprint Chain"))    
    form.appendChild(createCheckbox("parchment", null, true))    
    form.appendChild(createCheckbox("manuscript", null, true))    
    form.appendChild(createCheckbox("compendium", null, true))    
    form.appendChild(createCheckbox("blueprint", null, true)) 
    form.appendChild(createCheckbox("Trade"))
    form.appendChild(createCheckbox("Lizards", null, true))
    form.appendChild(createCheckbox("Sharks", null, true))
    form.appendChild(createCheckbox("Griffins", null, true))  
    form.appendChild(createCheckbox("Nagas", null, true))
    form.appendChild(createCheckbox("Zebras", null, true))
    form.appendChild(createCheckbox("Spiders", null, true))
    form.appendChild(createCheckbox("Leviathans", null, true))
    form.appendChild(createCheckbox("Grow Population"))
    form.appendChild(createCheckbox("Gather Catnip"))
    form.appendChild(createCheckbox("Buy Buildings"))
    form.appendChild(createCheckbox("Grow Titanium"))
    form.appendChild(createCheckbox("Wait for Alicorns"))
    form.appendChild(createCheckbox("QuaOilSte"))
    form.appendChild(createCheckbox("Split Metal"))
    form.appendChild(createCheckbox("Cap Titanium"))
    form.appendChild(document.createTextNode("Buildings"))

    buildings = gamePage.tabs[0].buttons     
    for (var i=0; i<buildings.length; i++){
        building = buildings[i]
        form.appendChild(createBuildingCheckbox(building))
    }

    document.getElementById("leftColumn").appendChild(form);

}

function createCheckbox(id, fn, isSub)
{
    div = document.createElement("div")

    if (isSub != null && isSub){
        text = document.createTextNode("-->")
        div.appendChild(text)
    }

    checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.id = id
    if (fn != null){
        checkbox.onclick = fn
    } else if (isSub == null || !isSub){
        checkbox.onclick = newProtocol
    }
    div.appendChild(checkbox)

    label = document.createElement("label")
    label.innerHTML = id
    label.htmlFor = id
    div.appendChild(label)

    return(div)
}

function createBuildingCheckbox(building){
    buildingName = building.opts.name
    
    div = document.createElement("div")

    checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.id = buildingName
    checkbox.name = "buildings"
    div.appendChild(checkbox)


    label = document.createElement("label")
    label.innerHTML = buildingName
    label.htmlFor = buildingName
    div.appendChild(label)

    return(div)
}

function createScienceButton(){
    div = document.createElement("div")

    var element = document.createElement("input");
    element.type = "button";
    element.value = "Science!";
    element.onclick = science

    div.appendChild(element)

    return(div)
}

function start(){
    intervalId = setInterval(run_through, period * 1000)
}
function end()
{
    clearInterval(intervalId)
}
function toggle(){
    if(document.getElementById("Autoclick").checked){
        start()
    } else {
        end()
    }
}

var fnList = []
function newProtocol(){
    fnList = []
    if (document.getElementById("Wait for Alicorns").checked){
        fnList.push(waitForAlicorns)
    }
    if (document.getElementById("Buy Buildings").checked){
        fnList.push(buyBuildings)
    }
    if (document.getElementById("Blueprint Chain").checked){
        fnList.push(craftBlueprints)
    } 
    if (document.getElementById("Praise").checked){
        fnList.push(praise)
    } 
    if (document.getElementById("Cap Titanium").checked){
        fnList.push(capTitanium)
    }
    if (document.getElementById("Grow Population").checked){
        fnList.push(growPopulation)
    }
    if (document.getElementById("Grow Titanium").checked){
        fnList.push(growTitanium)
    }

    if (document.getElementById("Manage Basic Resource Caps").checked){
        fnList.push(manageBasicResourseCaps)
    }  
    if (document.getElementById("Gather Catnip").checked){
        fnList.push(gatherCatnip)
    } 
    if (document.getElementById("QuaOilSte").checked){
        fnList.push(quaOilSte)
    } 
    if (document.getElementById("Split Metal").checked){
        fnList.push(splitMetal)
    } 
    if (document.getElementById("Trade").checked){
        fnList.push(trade)
    }
    if (document.getElementById("Hunt").checked){
        fnList.push(hunt)
    }
}
function run_through(){
    science()
    for(var i = 0 ; i< fnList.length; i++){
        fnList[i]()
    }

    buildBuildings()
    science()

}

addForm()

/* click functions */

function buyBuildings(){
    click_bonfire_building("Temple")
    click_bonfire_building("Amphitheatre")
    click_bonfire_building("Mine")
    click_bonfire_building("Lumber Mill")
    //click_bonfire_building("Harbour")
    click_bonfire_building("Workshop")

    wood = gamePage.resPool.resourceMap["wood"]
    minerals = gamePage.resPool.resourceMap["minerals"]
    if (wood.perTickCached > 2 && minerals.perTickCached > 2){
            click_bonfire_building("Smelter")
    }
}

function manageBasicResourseCaps(){
    var resources = [
        ["wood",     "beam" , 175],
        ["minerals", "slab" , 250],
        ["coal",     "steel", 100],
        ["iron",     "plate", 12.5], // putting thr ratio lower so we buy more plates
        ["oil",      "kerosene", 7500],
        ["catnip",   "wood",  100],
        ["uranium",   "thorium", 250],
        ["unobtainium", "eludium", 1000]
    ];
    
    for (var i = 0; i < resources.length; i++) {
        buy_one_at_limit(resources[i][0], resources[i][1], resources[i][2])
    }
}

function craftBlueprints(){
    if (document.getElementById("blueprint").checked){
        gamePage.craftAll("blueprint")
    }
    if (document.getElementById("compendium").checked){
        gamePage.craftAll("compedium")
    }    
    if (document.getElementById("manuscript").checked){
        gamePage.craftAll("manuscript")
    }    
    if (document.getElementById("parchment").checked){
        gamePage.craftAll("parchment")
    }    

}

function science(){
  if (observebutton == null){
      observebutton = document.getElementById('observeBtn');
  }
  if (observebutton != null){
      for (var i=0; i<1000; i++)
        observebutton.click()
    }
}

function hunt(){
    gamePage.village.huntAll()
}

function praise(){
    gamePage.religion.praise()
}

function trade(){
    var species = [
        "Lizards", "Sharks", "Griffins", "Nagas", "Zebras", "Spiders", "Leviathans"
    ];
    
    for (var i = 0; i < species.length; i++) {

        if (document.getElementById(species[i]).checked){ 
            if (species[i] == "Sharks"){
                gamePage.craftAll("beam")
                gamePage.craftAll("wood")
            }
            trade_all_with(species[i])
            if (species[i] == "Sharks"){
                gamePage.craftAll("wood")
                gamePage.craftAll("beam")
            }
        }
    }
}

function growPopulation(){
    gamePage.village.assignJob(get_job("woodcutter"),100)


    waitingRatio = 0.95

    wood = gamePage.resPool.resourceMap["wood"]
    minerals = gamePage.resPool.resourceMap["minerals"]
    
    hut = get_bulding("Hut")
    if (hut.model.prices[0].val < wood.maxValue ){
        if (hut.model.prices[0].val < wood.value){
            click_bonfire_building("Hut")
            return
        }
        if (hut.model.prices[0].val < wood.maxValue * waitingRatio){
            // wait for it to be affordable
            return
        }       
    }

    logHouse = get_bulding("Log House")
    houseWood = logHouse.model.prices[0].val
    houseMinerals = logHouse.model.prices[1].val

    if (houseWood < wood.maxValue && houseMinerals < minerals.maxValue){
        if (houseWood < wood.value && houseMinerals < minerals.value){
            click_bonfire_building("Log House")
            return
        }
        if (houseWood < wood.maxValue * waitingRatio && houseMinerals < minerals.maxValue * waitingRatio){
            // wait for it to be affordable
            return
        }       
    }    
    
    harbor = get_bulding("Harbour")
    if (harbor != null){
        prices = harbor.model.prices
        for (var i =0; i< prices.length; i++){
            price =prices[i]
            //if (price['name'] == 'slab' || price['name'] == 'scaffold'){
                console.log(price)
                console.log(price['val'])
                console.log(gamePage.resPool.resourceMap[price['name']].value)
                if (price['val'] > gamePage.resPool.resourceMap[price['name']].value){
                    gamePage.craft(price['name'], 10)
                    console.log("craft 10 "+ price['name'])

                }
            //}
        }
        click_bonfire_building("Harbour")
        return
    }
    warehouse = get_bulding("Warehouse")
    if (warehouse != null){
        prices = warehouse.model.prices
        for (var i =0; i< prices.length; i++){
            price =prices[i]            
            if (price['name'] == 'slab' || price['name'] == 'beam'){
                if (price['val'] > gamePage.resPool.resourceMap[price['name']].value){
                    gamePage.craft(price['name'], 100)
                }
            }
        }
        click_bonfire_building("Warehouse")
        return
    }
    click_bonfire_building("Mine")

}

function growTitanium(){
    click_bonfire_building("Workshop")
    gamePage.craftAll("steel")
    gamePage.craftAll("plate")

    scaffold = gamePage.resPool.resourceMap["scaffold"]
    if (scaffold.value < 1000) { //enough to craft ships 10 times
        gamePage.craft("scaffold", 20)
    }
    //gamePage.craftAll("scaffold")
    gamePage.craftAll("ship")
    click_bonfire_building("Calciner")
}

function waitForAlicorns(){
    console.log("waiting")
    click_bonfire_building("Hut")
    click_bonfire_building("Log House")
    click_bonfire_building("Quarry")
    click_bonfire_building("Workshop")
    click_bonfire_building("Temple")
    click_bonfire_building("Tradepost")
    click_bonfire_building("Chapel")
    click_bonfire_building("Magneto")
    click_bonfire_building("Reactor")
    gamePage.craftAll("steel")
    gamePage.craftAll("plate")
    gamePage.craftAll("alloy")    

}

function gatherCatnip(amt){
    if (amt == null){
        amt = 300
    }
    for (var i=0; i<amt; i++){
        click_bonfire_building("Gather catnip")
    }
}


function quaOilSte(){
    gamePage.craftAll("steel")
    gamePage.craftAll("plate")
    click_bonfire_building("Quarry")
    click_bonfire_building("Oil Well")
    click_bonfire_building("Steamworks")

}

function splitMetal(){
    gamePage.craftAll("steel")
    steel = gamePage.resPool.resourceMap["steel"]
    alloy = gamePage.resPool.resourceMap["alloy"]
    concrete = gamePage.resPool.resourceMap["concrate"]
    gear = gamePage.resPool.resourceMap["gear"]
    titanium = gamePage.resPool.resourceMap["titanium"]
    minvalue = Math.min(steel.value, alloy.value*3, concrete.value*20, gear.value*3)

    spare_steel = steel.value - minvalue

    if (alloy.value*3 == minvalue){
        times_to_craft_by_steel = Math.floor(spare_steel/75)
        times_to_craft_by_titanium = Math.floor(titanium.value/10)
        times_to_craft = Math.min(times_to_craft_by_steel, times_to_craft_by_titanium)
        gamePage.craft("alloy", times_to_craft)
    } else if (concrete.value*10 == minvalue){
        gamePage.craft("concrate", spare_steel/25)
    } else if (gear.value*3 == minvalue){
        gamePage.craft("gear", spare_steel/15)
    }

    iron = gamePage.resPool.resourceMap["iron"]
    /*if (iron.value > iron.maxValue/2){
        amount_to_craft = (iron.value - iron.maxValue/2) / 125
        gamePage.craft("plate", amount_to_craft)

    }*/
    gamePage.craftAll("plate")

}

function capTitanium(){
    titanium = gamePage.resPool.resourceMap["titanium"]
    if (titanium.maxValue > titanium.value){
        console.log("need to trade")
        titanium_per_trade = gamePage.resPool.get("ship").value / 100 * 1.5 * 2 + 1.5
        times_to_trade = (titanium.maxValue - titanium.value) / titanium_per_trade
        times_to_trade = Math.ceil(times_to_trade)
        zebras = get_race("Zebras")
        console.log(zebras)

        gamePage.diplomacy.tradeMultiple(zebras, times_to_trade)
    }
}

function buildBuildings(){
    name=buildings
}


/* helpers */
function trade_all_with(speciesTitle){
    races = gamePage.diplomacy.races
    for (var i = 0; i < races.length; i++){
        race = races[i]
        if (race.title == speciesTitle){
            gamePage.diplomacy.tradeAll(race)        
        }
    }
}

function get_job(jobName)
{
    jobs = gamePage.village.jobs
    for (var i = 0; i < jobs.length; i++)
        if (jobs[i].name == jobName)
            return jobs[i]
}

function click_bonfire_building(buildingName)
{
    building = get_bulding(buildingName)
    building.domNode.click()
}

function get_bulding(buildingName){
    buildings = gamePage.tabs[0].buttons
    for (i in buildings){
        button = buildings[i]
        if (button.opts.name == buildingName){
            return(button)
        }
    }
    console.log("could not find "+ buildingName)
}

function buy_one_at_limit(raw, crafted, cost){
    var curRes = gamePage.resPool.get(raw);
        // if we will fill up in the next 2 periods, buy 3 periods worth
        if (curRes.value + 2 * 5 * period * curRes.perTickCached +.01>= curRes.maxValue) {
            amount_to_spend = 3 * 5 * period * curRes.perTickCached
            if (amount_to_spend <= curRes.maxValue){
                gamePage.craft(crafted, amount_to_spend/cost)
            } else {
                gamePage.craftAll(crafted)
            }
        }
}

function get_race(speciesTitle){
    races = gamePage.diplomacy.races
    for (var i = 0; i < races.length; i++){
        race = races[i]
        if (race.title == speciesTitle){
            return race        
        }
    }
}
