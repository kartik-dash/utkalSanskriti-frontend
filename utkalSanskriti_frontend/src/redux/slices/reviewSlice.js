import { createSlice } from '@reduxjs/toolkit';
import review1 from "../../assets/review-img/delok.jpeg";
import review2 from "../../assets/review-img/kartik.jpeg";
import review3 from "../../assets/review-img/soumya.jpeg";
import review4 from "../../assets/review-img/subrat.jpeg";
import review5 from "../../assets/review-img/d-subrat.jpeg";
import review6 from "../../assets/review-img/rudra.jpeg";
import review7 from "../../assets/review-img/benu.jpeg";
import review8 from "../../assets/review-img/sudipta.jpeg";

const initialState = {
  reviews: [
    { id: 1, 
      name: 'Delok Jena', 
      location: 'Utara',
      destination: 'Bhubaneswar', 
      experience: 'Had an amazing time! Beautiful city with rich history.',
      image:review1 
    },

    { id: 2, 
      name: 'Kartik Dash', 
      location: 'Sameigadia',
      destination: 'Bhubaneswar', 
      experience: 'Loved the energy and the food was great.',
      image:review2 

     },

    { id: 3, 
      name: 'Soumya Panda', 
      location: 'Chakeisihani',
      destination: 'Bhubaneswar', 
      experience: 'A wonderful',
      experience: 'Brilliantly showcases art, heritage, and tradition.',
      image:review3 
    },

    { id: 4, 
      name: 'Subrat Behera', 
      location: 'Saheed nagar',
      destination: 'Bhubaneswar', 
      experience: 'Beautiful beaches and vibrant culture.',
      image:review4 
    },
    { id: 5, 
      name: 'Subrat Sahoo', 
      location: 'Jaydev Vihar',
      destination: 'Bhubaneswar', 
      experience: 'A must-visit platform for lovers of tradition and art.',
      image:review5 
    },
    { id: 6, 
      name: 'Rudra Pradhan', 
      location: 'Vanivihar',
      destination: 'Bhubaneswar', 
      experience: 'Utkal Sanskriti brings culture to life with elegance.',
      image:review6
    },
    { id: 7, 
      name: 'Benu Khamari', 
      location: 'Laxmi sagar',
      destination: 'Bhubaneswar', 
      experience: 'Feels like stepping into the soul of Odisha.',
      image:review7
    },
    { id: 8, 
      name: 'Sudipta Nayak', 
      location: 'Rasulgarh',
      destination: 'Bhubaneswar', 
      experience: 'An inspiring platform that honors the spirit of Odisha.',
      image:review8
    }
  ]
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview: (state, action) => {
      state.reviews.push(action.payload);
    }
  }
});

export const { addReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;
