export default class ItemNorse extends Item {
    prepareData() {
        super.prepareData();
        if (game.ready) {
            const itemData = this.data;
            const data = itemData.data;

            switch (itemData.type) {
                case "injury":
                    this._prepareInjuryData(itemData, data)
                    break;
                case "organ":
                    break;
                default:
            }
        }

    }

    prepareEmbeddedEntities() {
        const itemData = this.data;
        const data = itemData.data;
        if (game.ready) {
            switch (itemData.type) {
                case "injury":
                    break;
                case "organ":
                    if ("injuries" in data) {
                        for (let injury of data.injuries) {
                            let item = game.items.get(injury);
                            let itemData = item.data;
                            this._prepareInjuryData(itemData, itemData.data);
                            item.sheet.render(false);
                        }
                    }
                    break;
                default:
            }
        }
    }

    removeOwnedItem(id) {
        if (this.data.data.baseMaterial === id) {
            this.update({["data.baseMaterial"]: [""]});
        } else if (this.data.data.functions.includes(id)) {
            this.update({["data.functions"]: this.data.data.functions.filter(
                    function (el, i) {
                        return el != id;
                    }
                )});
        }
    }

    _prepareInjuryData(itemData, data) {
        if ("parent" in data) {
            let owner = game.items?.get(data.parent).data.data;
            data.value = owner?.tempDamageAmount + owner?.permanentDamageAmount;

            if (data.value >= data.maxAt) {
                data.severity = data.maxSeverity;
            } else if (data.value <= data.onsetAt) {
                data.severity = 0.0;
            } else {
                data.severity = (data.value - data.onsetAt) / (data.maxAt - data.onsetAt);
            }
        }
    }
}