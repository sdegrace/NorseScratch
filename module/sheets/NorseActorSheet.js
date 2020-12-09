export default class NorseActorSheet extends ActorSheet {
    get template() {
        console.log("norse | template");
        // return "systems/NorseScratch/templates/sheets/organ-sheet.hbs";
        return `systems/NorseScratch/templates/sheets/actor/${this.actor.data.type}-sheet.hbs`;
    }

    // getData() {
    //     debugger;
    //     const data = super.getData();
    //
    //     data.config = CONFIG.norse;
    //     data.test = "testing";
    //
    //     let [objects, injury, organ] = data.items.reduce((arr, item) => {
    //
    //         if ( item.type === "object" ) arr[0].push(item);
    //         else if ( item.type === "injury" ) arr[1].push(item);
    //         else if ( item.type === "organ" ) arr[2].push(item);
    //         return arr;
    //     }, [[], [], []]);
    //
    //     console.log(objects);
    //     console.log(injury);
    //     console.log(organ);
    //
    //     data.inventory = {"objects": objects,
    //         "injuries": injury,
    //         "organ": organ
    //     };
    //
    //     // data.inventory.objects = objects;
    //     // data.inventory.injury = injury;
    //     // data.inventory.organ = organ;
    //     console.log("Norse final data | ");
    //     console.log(data)
    //     return data;
    // }

    getData() {
        const data = super.getData();

        data.config = CONFIG.norse;
        data.test = "testing";
        
        console.log("Norse final data | ");
        console.log(data)
        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);
        console.log("Norse | activate listeners");

        html.find(".item-create").click(this._onItemCreate.bind(this));
        html.find(".inline-edit").change(this._onSkillEdit.bind(this));
    }



    _onItemCreate(event) {
        event.preventDefault();
        let element = event.currentTarget;

        let itemData = {
            name: game.i18n.localize("norse.actorSheet.newItem"),
            type: element.dataset.type
        };

        return this.actor.createOwnedItem(itemData);
    }

    _onSkillEdit(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let field = element.dataset.value;

        return this.actor.update({ [field]: element.value});
    }
}