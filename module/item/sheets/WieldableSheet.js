import BaseItemSheetNorse from "./BaseItemSheetNorse.js";


export default class WieldableSheet extends BaseItemSheetNorse {

    activateListeners(html) {
        super.activateListeners(html);

        html.find(".item-create").click(this._onItemCreate.bind(this));
        html.find(".item-edit").click(this._onItemEdit.bind(this));
        html.find(".item-delete").click(this._onItemDelete.bind(this));
    }

    getData(options) {
        const data =  super.getData(options);
        data.data.baseMaterial = game.items.get(data.data.baseMaterial);
        return data;
    }

    _onDrop(event) {
        let dropped_id = JSON.parse(event.dataTransfer?.getData('text/plain')).id;
        const item = this.item;
        // let inner = push(dropped_id);
        let dropped_item = game.items.get(dropped_id);
        const droppedOn = event.target;
        if (dropped_item.type == "material" && droppedOn.classList.contains("material-droppable")) {
            return item.update({["data.baseMaterial"]: dropped_id});
        }
    }

    _onItemEdit(event) {
        event.preventDefault();
        const li = event.currentTarget;
        const item = game.items.get(li.dataset.id);
        item.sheet.render(true);
    }

    _onItemDelete(event) {
        event.preventDefault();
        const wieldable = this.item;
        const li = event.currentTarget;
        let target = game.items.get(li.dataset.id);
        delete target.data.data.parent;
        switch (target.data.type) {
            case "material":
                return wieldable.update({["data.baseMaterial"]: ""});
                break;
        }

    }

    _onItemCreate(event) {
        event.preventDefault();
        // let element = event.currentTarget;
        //
        // let itemData = {
        //     name: game.i18n.localize("norse.actorSheet.newItem"),
        //     type: element.dataset.type
        // };
        //
        // return this.item.createOwnedItem(itemData);
    }
}