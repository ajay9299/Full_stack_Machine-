// This function group the objects based on their category 
export function dataManipulation(data) {
    const groupedData = {};
    const resultArray = []

    data.map((productInfo) => {
        const { title, price, category, thumbnail } = productInfo;
        if (groupedData[category]) {
            groupedData[category].push({ title, price, thumbnail })
        } else {
            groupedData[category] = [{ title, price, thumbnail }]
        }
    })

    for (let key in groupedData) {
        resultArray.push({ keyName: key, data: groupedData[key] })
    }
    console.log(resultArray)
    return resultArray;

}