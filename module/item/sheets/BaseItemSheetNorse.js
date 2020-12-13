export default class BaseItemSheetNorse extends ItemSheet {
    get template() {
        // return "systems/NorseScratch/templates/sheets/organ-sheet.hbs";
        console.log(`systems/NorseScratch/templates/sheets/items/${this.item.data.type}-sheet.hbs`)
        return `systems/NorseScratch/templates/sheets/items/${this.item.data.type}-sheet.hbs`;
    }

    getData(options) {
        const data = super.getData();

        data.config = CONFIG.norse;

        return data;
    }

    activateListeners(html)  {
        super.activateListeners(html);
        html.on('drop', (e) => this._onDrop(e.originalEvent));
    }

    _onDrop(event) {
        console.error("You can't drop items onto this sheet.");
    }


}