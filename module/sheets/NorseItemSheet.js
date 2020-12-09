export default class NorseItemSheet extends ItemSheet {
    get template() {
        console.log("norse | template");
        // return "systems/NorseScratch/templates/sheets/organ-sheet.hbs";
        return `systems/NorseScratch/templates/sheets/items/${this.item.data.type}-sheet.hbs`;
    }

    getData(options) {
        const data = super.getData();

        data.config = CONFIG.norse;

        return data;
    }
}