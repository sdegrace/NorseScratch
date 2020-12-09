import {norse} from "./module/config.js";
import NorseItemSheet from "./module/sheets/NorseItemSheet.js";
import NorseActorSheet from "./module/sheets/NorseActorSheet.js"
import NorseActor from "./module/CustomClasses/NorseActor.js";

console.log("norse | First line")
Hooks.once("init",

    function () {
        console.log("norse | initializing Norse System");

        CONFIG.norse = norse;
        CONFIG.Actor.entityClass = NorseActor;
        Items.unregisterSheet("core", ItemSheet);
        Items.registerSheet("NorseScratch", NorseItemSheet, {makeDefault: true});

        Actors.unregisterSheet("core", ActorSheet);
        Actors.registerSheet("NorseScratch", NorseActorSheet);


        Handlebars.registerHelper("log", function(something) {
                    console.log(something);
            });
    }
);
