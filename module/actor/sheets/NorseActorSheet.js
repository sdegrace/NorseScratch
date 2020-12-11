export default class NorseActorSheet extends ActorSheet {
    get template() {
        // return "systems/NorseScratch/templates/sheets/organ-sheet.hbs";
        return `systems/NorseScratch/templates/sheets/actor/${this.actor.data.type}-sheet.hbs`;
    }

    getData() {
        const data = super.getData();

        data.config = CONFIG.norse;

        let [objects, injury, organ] = data.items.reduce((arr, item) => {

            if ( item.type === "object" ) arr[0].push(item);
            else if ( item.type === "injury" ) arr[1].push(item);
            else if ( item.type === "organ" ) arr[2].push(item);
            return arr;
        }, [[], [], []]);

        data.inventory = {"objects": objects,
            "injuries": injury,
            "organ": organ
        };

        return data;
    }


    activateListeners(html) {
        super.activateListeners(html);
        console.log("Norse | activate listeners");

        html.find(".item-create").click(this._onItemCreate.bind(this));
        html.find(".item-edit").click(this._onItemEdit.bind(this));
        html.find(".item-delete").click(this._onItemDelete.bind(this));
        html.find(".inline-edit").change(this._onSkillEdit.bind(this));
    }

    _onItemEdit(event) {
        event.preventDefault();
        const li = event.currentTarget;
        const item = this.actor.getOwnedItem(li.dataset.id);
        item.sheet.render(true);
    }

    _onItemDelete(event) {
        event.preventDefault();
        const li = event.currentTarget;
        this.actor.deleteOwnedItem (li.dataset.id);
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