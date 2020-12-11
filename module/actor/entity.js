export default class ActorNorse extends Actor {

    prepareBaseData() {
        super.prepareBaseData();
        console.log("Norse | prepareBaseData");
    }
    prepareData() {
        console.log("Norse | prepareData")
        super.prepareData();

        const actorData = this.data;
        const data = actorData.data;

        data.healthAttributes.BMI = data.characterAttributes.weight / Math.pow(data.characterAttributes.height, 2);
        console.log("BMI: " + data.healthAttributes.BMI);
        data.healthAttributes.maxHeartRate = 220 - data.characterAttributes.age;
        console.log("maxHeartRate: " + data.healthAttributes.maxHeartRate);
        data.healthAttributes.VO2max = (
            57.402 -
            0.372 * data.characterAttributes.age +
            8.596 * (data.characterAttributes.isMale ? 1 : 0) +
            1.396 * data.favor.thor.value -
            0.603 * data.healthAttributes.BMI
        );
        console.log("VO2max: " + data.healthAttributes.VO2max);
        data.healthAttributes.currentHeartRate =
            data.healthAttributes.maxHeartRate *
            (0.6463 * data.healthAttributes.VO2max + 37.182);
        console.log("currentHeartRate: " + data.healthAttributes.currentHeartRate);
    }
    prepareDerivedData(){
        super.prepareDerivedData();
        console.log("Norse | prepareDerivedData")
    }
}