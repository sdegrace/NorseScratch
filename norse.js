import {norse} from "./module/config.js";
import BaseItemSheetNorse from "./module/item/sheets/BaseItemSheetNorse.js";
import OrganSheet from "./module/item/sheets/OrganSheet.js";
import InjurySheet from "./module/item/sheets/InjurySheet.js";
// import MaterialSheet from "./module/item/sheets/MaterialSheet.js";
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
        Items.unregisterSheet("core", ItemSheet);
        Items.registerSheet("NorseScratch", BaseItemSheetNorse, {
            types: ["material"],
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

        // Items.registerSheet("NorseScratch", MaterialSheet, {
        //     types: ["material"],
        //     makeDefault: true,
        //     label: "Norse.SheetClassMaterial"
        // });

        Actors.unregisterSheet("core", NorseActorSheet);
        Actors.registerSheet("NorseScratch", NorseActorSheet);


        Handlebars.registerHelper("log", function(something) {
                    console.log(something);
            });
        Handlebars.registerHelper("concat", function(arg1, arg2) {
            // console.log(positional);
            return [arg1, arg2].join("");
            // return positional
            //     .value()
            //     .map(normalizeTextValue)
            //     .join('');
        });
    }
);

Hooks.once("ready",
    function () {
        console.log("Norse | Initialization done");
        for (let key of game.items.keys()) {
            let item = game.items.get(key)
            item.prepareEmbeddedEntities();
        }
        for (let key of game.items.keys()) {
            let item = game.items.get(key)
            item.prepareData();
        }
    }
);
