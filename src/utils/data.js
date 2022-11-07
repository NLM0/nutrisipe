// how to fet queries
// categories

import dairy from '../assets/categories/dairy.jpg';
import fats from '../assets/categories/Fats.jpg';
import fish from '../assets/categories/fish.jpg';
import fruits from '../assets/categories/Fruits.jpg';
import meat from '../assets/categories/meat.jpg';
import protein from '../assets/categories/Protein.jpg';
import veg from '../assets/categories/veg.jpg';

export const metrics = [
  {
    name: 'Tbsp',
    
  },
  {
    name: 'Kg',
   
  },
  {
    name: 'Grams',
    
  },
  {
    name: 'Protein',
    
  },
  {
    name: 'Fruits',
  
  },
  {
    name: 'Fish and Seafoods',
    
  },
  
];

export const categories = [
  {
    name: 'Vegetables',
    image: veg,

  },
  {
    name: 'Dairy Foods',
    image: dairy,
  },
  {
    name: 'Fats',
    image: fats,
  },
  {
    name: 'Protein',
    image: protein,
  },
  {
    name: 'Fruits',
    image: fruits,
  },
  {
    name: 'Fish and Seafoods',
    image: fish,
  },
  {
    name: 'Meat and Poultry',
    image: meat,
  },
  {
    name: 'others',
    image: 'https://i.pinimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg',
  },
];


const fakeDataIng = [
  {
    ingAdminName: "Chicken",
    baseSize: [
      {
        baseSizeNum: "kg",
        calories: "100",
        calcium: "105"
      },
      {
        baseSizeNum: "g",
        calories: "20",
        calcium: "25"
      }
    ]
  },
  {
    ingAdminName: "Butter",
    baseSize: [
      {
        baseSizeNum: "kg",
        calories: "500",
        calcium: "505"
      },
      {
        baseSizeNum: "g",
        calories: "300",
        calcium: "305"
      }
    ]
  }
]


export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
  image{
    asset->{
      url
    }
  },
      _id,
      procedure[],
      ingredient[],
      ingredientVal[],
      metric[],
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    } `;


    export const allUser = `*[_type == 'user']
    {
      _id,
      image,
      userName
    }`;

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    ingredientListPost,
    nutritionPost,
    procedure[],
    category,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    procedure[],
    ingredientListPost,
    nutritionPost,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*' || ingredient match '${searchTerm}*' || postedBy->userName match '${searchTerm}*' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    procedure[],
    ingredientListPost,
    nutritionPost,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};

export const userSearch = (searchTerm) => {
  const query = `*[_type == "user" && userName match "${searchTerm}*"]{
    _id,
    image,
    userName
  }`;
  return query;
};
 


export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    procedure[],
    ingredientListPost,
    nutritionPost,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    procedure[],
    ingredientListPost,
    nutritionPost,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

// export const userFollowingPost = (userId) => {
//   const query = `*[ _type == "user" && id == '${userId}'] | order(_createdAt desc)
//   {
//   'pin': *[_type == 'pin' && references(^._id)]
//    {
//     image{
//       asset->{
//         url
//       }
//     },
//     _id,
//     title, 
//     about,
//     ingredientListPost,
//     nutritionPost,
//     procedure[],
//     category,
//     postedBy->{
//       _id,
//       userName,
//       image
//     },
//    save[]{
//       postedBy->{
//         _id,
//         userName,
//         image
//       },
//     },
//     comments[]{
//       comment,
//       _key,
//       postedBy->{
//         _id,
//         userName,
//         image
//       },
//     }
//   }
//    } `;
//   return query;
// };

// export const userfollowers = (userId) => {
//   const query = `*[_type == 'user' && _id == '${userId}'] | order(_createdAt desc) {
//     follow[]{
//       postedBy->{
//         _id,
//         userName,
//         image
//       },
//     },
//   }`;
//   return query;
// };

export const ingredientBaseValue = (pinDetail) => {
  const query = `*[ingAdminName == '${pinDetail.ingredient}'].baseSize[baseSizeNum == '${pinDetail.metric}']
  {
    calcium,
    calories,
    cholesterol,
    dietaryFiber,
    iron,
    protein,
    saturatedfat,
    sodium,
    sugar,
    totalcarb,
    totalfat,
    transfat,
    vitaminA,
    vitaminC,
  }`;
  return query;
};
  export const fetchIngredientValue = (pinDetail) => {
    const query = `*[ingAdminName == '${pinDetail?.ingredient}'].baseSize[]
    {
      calcium,
      calories,
      cholesterol,
      dietaryFiber,
      iron,
      protein,
      saturatedfat,
      sodium,
      sugar,
      totalcarb,
      totalfat,
      transfat,
      vitaminA,
      vitaminC,
    }`;
    return query;
};


// export const userfollowing = `*[_type == "user"] | order(_createdAt desc) {
//   image,
//   _id,
//   _type,
//   userName,
//   follow[]{
//         _key,
//         postedBy->{
//           _id,
//           userName,
//           image
//         },
//       },
// } `;

export const ingval = `*[IngredientAdmin == "ChokoNyoks"]`;

export const image = '*[_type == "user"]';

export const allIngredientsQuery = `*[_type == 'ingredientAdmin']{
  ingAdminName,
  baseSize[]{
    baseSizeNum,
  calcium,
  calories,
  cholesterol,
  dietaryFiber,
  iron,
  protein,
  saturatedfat,
  sodium,
  sugar,
  totalfat,
  transfat,
  vitaminA,
  vitaminC,
  totalcarb,
  _key
  },
  _key
}`;



export const searchIngredientQuery = (searchIngredientTerm) => {
  const query = `*[_type == 'ingredientAdmin'  && ingAdminName match '${searchIngredientTerm}*' ]{
    ingAdminName,
    baseSize[]{
      baseSizeNum,
    calcium,
    calories,
    cholesterol,
    dietaryFiber,
    iron,
    protein,
    saturatedfat,
    sodium,
    sugar,
    totalfat,
    transfat,
    vitaminA,
    vitaminC,
    totalcarb,
    _key
    },
    _key
  }`;
  return query;
};


export const searchChosenIngredientQuery = (chosenIngredient) => {
  const query = `*[_type == 'ingredientAdmin'  && ingAdminName match '${chosenIngredient}*' ]{
    ingAdminName,
    baseSize[]{
      baseSizeNum,
    calcium,
    calories,
    cholesterol,
    dietaryFiber,
    iron,
    protein,
    saturatedfat,
    sodium,
    sugar,
    totalfat,
    transfat,
    vitaminA,
    vitaminC,
    totalcarb,
    _key
    },
    _key
  }`;
  return query;
};