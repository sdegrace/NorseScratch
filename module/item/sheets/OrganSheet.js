import BaseItemSheetNorse from "./BaseItemSheetNorse.js";


export default class OrganSheet extends BaseItemSheetNorse {

    activateListeners(html) {
        super.activateListeners(html);

        html.find(".item-create").click(this._onItemCreate.bind(this));
        html.find(".item-edit").click(this._onItemEdit.bind(this));
        html.find(".item-delete").click(this._onItemDelete.bind(this));
    }

    getData(options) {
        const data =  super.getData(options);

        data.injuries = this.item.data.data.injuries.map(function (id) {
            return game.items.get(id);
        });
        return data;
    }

    _onDrop(event) {
        let dropped_id = JSON.parse(event.dataTransfer?.getData('text/plain')).id;
        const organ = this.item;
        // let inner = push(dropped_id);
        let dropped_item = game.items.get(dropped_id);
        if (dropped_item.type == "injury" && !organ.data.data.injuries.includes(dropped_id)) {
            dropped_item.update({["data.parent"]: organ._id});
            return organ.update({["data.injuries"]: [...organ.data.data.injuries, dropped_id]});
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
        const organ = this.item;
        const li = event.currentTarget;
        delete game.items.get(li.dataset.id).data.data.parent;
        return organ.update({["data.injuries"]: organ.data.data.injuries.filter(
                function (el, i) {
                    return el != li.dataset.id;
                }
            )});
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