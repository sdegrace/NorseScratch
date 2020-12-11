import {norse} from "./module/config.js";
import BaseItemSheet from "./module/item/sheets/BaseItemSheet.js";
import OrganSheet from "./module/item/sheets/OrganSheet.js";
import InjurySheet from "./module/item/sheets/InjurySheet.js";
import NorseActorSheet from "./module/actor/sheets/NorseActorSheet.js"
import ActorNorse from "./module/actor/entity.js";
import ItemNorse from "./module/item/entity.js";

console.log("norse | First line")
Hooks.once("init",

    function () {
        console.log("norse | initializing Norse System");

        CONFIG.norse = norse;
        CONFIG.Actor.entityClass = ActorNorse;
        CONFIG.Item.entityClass = ItemNorse;
        Items.unregisterSheet("core", BaseItemSheet);
        Items.registerSheet("NorseScratch", BaseItemSheet, {
            types: ["object"],
            makeDefault: true,
            label: "Norse.SheetClassObject"
        });
        Items.registerSheet("NorseScratch", OrganSheet, {
            types: ["organ"],
            makeDefault: true,
            label: "Norse.SheetClassOrgan"
        });
        Items.registerSheet("NorseScratch", InjurySheet, {
            types: ["injury"],
            makeDefault: true,
            label: "Norse.SheetClassInjury"
        });

        Actors.unregisterSheet("core", NorseActorSheet);
        Actors.registerSheet("NorseScratch", NorseActorSheet);


        Handlebars.registerHelper("log", function(something) {
                    console.log(something);
            });
    }
);
