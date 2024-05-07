const ObjectId = {
    '04fbb2f2021390': 'train',
    '04e9b1f2021390': 'watermelon',
    '0452bcf2021390': 'tiger',
    '0405aff2021391': 'ship',
    '04f3b2f2021390': 'rat',
    '0416b1f2021391': 'rabbit',
    '04cab1f2021390': 'potato',
    '04d9b1f2021390': 'pigeon',
    '04e1b1f2021390': 'penguin',
    '0403b1f2021391': 'cow',
    '04dfb0f2021390': 'pencil',
    '04b8b0f2021390': 'peacock',
    '04e1aff2021390': 'parrot',
    '04e9aff2021390': 'owl',
    '049eb6f2021390': 'lion',
    '046abcf2021390': 'key',
    '0471bbf2021390': 'horse',
    '04f3b0f2021390': 'helicopter',
    '0487b9f2021390': 'hen',
    '04fbb0f2021390': 'fish',
    '0462bcf2021390': 'dog',
    '041fb0f2021391': 'deer',
    '04d9aff2021390': 'duck',
    '0498b9f2021390': 'elephant',
    '048fb9f2021390': 'cat',
    '04a2b2f2021390': 'carrot',
    '04e7b0f2021390': 'car',
    '04d1aff2021390': 'cabbage',
    '0480baf2021390': 'cherry',
    // '0407b0f2021391': 'banana',
    '040eb1f2021391': 'apple',
    '04f6b1f2021390': 'airplane',
    '0478baf2021390': 'bus',
    '04efb0f2021390': 'pineapple',
    '04d5b0f2021390': 'eagle',
    '04c2b1f2021390': 'orange',
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