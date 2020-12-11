export default class ItemNorse extends Item {
    prepareData() {
        super.prepareData();
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

    prepareEmbeddedEntities() {
        const itemData = this.data;
        const data = itemData.data;
        switch (itemData.type) {
            case "injury":
                break;
            case "organ":
                if ("injuries" in data) {
                    for (let injury of data.injuries) {
                        let iData = game.items.get(injury).data;
                        this._prepareInjuryData(iData, iData.data);
                    }
                }
                break;
            default:
        }
    }

    _prepareInjuryData(itemData, data) {

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