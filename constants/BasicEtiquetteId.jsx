const ObjectId = {
    '04b1b1f2021390': 'One1',
    '041eb1f2021391': 'One2',
    '045abcf2021390': 'One3',
    '0427b1f2021391': 'One4',
    '04aab2f2021390': 'Two1',
    '042fb1f2021391': 'Two2',
    '040db2f2021391': 'Two3',
    '0426b2f2021391': 'Two4',
    '0417b0f2021391': 'Three1',
    '040fb0f2021391': 'Three2',
    '0415b2f2021391': 'Three3',
    '041eb2f2021391': 'Three4',
};

export const getKeyById = (id) => {
    for (const key in ObjectId) {
        // console.log(key);
        if (key === id) {
            // console.log(ObjectId[key]);
            return ObjectId[key];
        }
    }
    return null;
};