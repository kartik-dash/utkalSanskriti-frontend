
import { createSlice } from '@reduxjs/toolkit';
import { categories } from '../../assets/assets';  // Make sure this is an array or object

const initialState = {
  categories: categories,                 // List of categories loaded from assets
  selectedCategory: JSON.parse(localStorage.getItem(" selectedCategory")) || null,                 // Currently selected category
  selectedProduct: JSON.parse(localStorage.getItem(" selectedProduct")) || null,                   // Currently selected product
  selectedChariKhetra: JSON.parse(localStorage.getItem(" selectedChariKhetra")) || null,  
  selectedShaktiPitha: JSON.parse(localStorage.getItem("selectedShaktiPitha")) || null,           
  selectedUpcomingEvent: JSON.parse(localStorage.getItem(" selectedUpcomingEvent")) || null,             // Currently selected upcoming event
  selectedHeritageSites: JSON.parse(localStorage.getItem(" selectedHeritageSites")) || null,            // Currently selected heritage sites
  selectedEast: JSON.parse(localStorage.getItem(" selectedEast")) || null, 
  selectedWest: JSON.parse(localStorage.getItem(" selectedWest")) || null,   
  selectedNorth: JSON.parse(localStorage.getItem(" selectedNorth")) || null, 
  selectedSouth: JSON.parse(localStorage.getItem(" selectedSouth")) || null,  
  selectedAdiShaktiPitha: JSON.parse(localStorage.getItem(" selectedAdiShaktiPitha")) || null, 
  selectedSaivaKhetra: JSON.parse(localStorage.getItem(" selectedSaivaKhetra")) || null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;  // Set selected category
      state.selectedProduct = null; // Reset selected product when category changes
      localStorage.setItem(" selectedCategory", JSON.stringify(action.payload)); 
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;  // Set selected product
      localStorage.setItem(" selectedProduct", JSON.stringify(action.payload)); 
    },
    setSelectedChariKhetra: (state, action) => {
      state.selectedChariKhetra = action.payload;  // Set selected Chari Khetra
      localStorage.setItem(" selectedChariKhetra", JSON.stringify(action.payload)); 
    },
    setSelectedShaktiPitha: (state, action) => {
      state.selectedShaktiPitha = action.payload;
      localStorage.setItem("selectedShaktiPitha", JSON.stringify(action.payload)); 
    },
    setSelectedUpcomingEvent: (state, action) => {
      state.selectedUpcomingEvent = action.payload;  // Set selected upcoming event
      localStorage.setItem(" selectedUpcomingEvent", JSON.stringify(action.payload)); 
    },
    setSelectedHeritageSites: (state, action) => {
      state.selectedHeritageSites = action.payload;  // Set selected heritage sites
      localStorage.setItem(" selectedHeritageSites", JSON.stringify(action.payload)); 
    },
    setSelectedEast: (state, action) => {
      state.selectedEast = action.payload;   // Set selected East side
      localStorage.setItem(" selectedEast", JSON.stringify(action.payload)); 
    },
    setSelectedWest: (state, action) => {
      state.selectedWest = action.payload;   //set selecetd west side
      localStorage.setItem(" selectedWest", JSON.stringify(action.payload)); 
    },
    setSelectedNorth: (state, action) => {
      state.selectedNorth = action.payload;  //set selected north side
      localStorage.setItem(" selectedNorth", JSON.stringify(action.payload)); 
    },
    setSelectedSouth: (state, action) => {
      state.selectedSouth = action.payload;  //set selected south side
      localStorage.setItem(" selectedSouth", JSON.stringify(action.payload)); 
    },
    setSelectedAdiShaktiPitha: (state, action) => {
      state.selectedAdiShaktiPitha = action.payload;
      localStorage.setItem(" selectedAdiShaktiPitha", JSON.stringify(action.payload)); 
    },
    setSelectedSaivaKhetra: (state, action) => {
      state.selectedSaivaKhetra = action.payload;
      localStorage.setItem(" selectedSaivaKhetra", JSON.stringify(action.payload)); 
    }
    
  },
});

export const { 
  setSelectedCategory, 
  setSelectedProduct, 
  setSelectedChariKhetra, 
  setSelectedShaktiPitha, 
  setSelectedUpcomingEvent, 
  setSelectedHeritageSites, 
  setSelectedEast,
  setSelectedWest,
  setSelectedNorth,
  setSelectedSouth,
  setSelectedAdiShaktiPitha,
  setSelectedSaivaKhetra,
} = categorySlice.actions;

// Selectors to access the Redux state
export const selectCategories = (state) => state.category.categories;
export const selectSelectedCategory = (state) => state.category.selectedCategory;
export const selectSelectedProduct = (state) => state.category.selectedProduct;
export const selectSelectedChariKhetra = (state) => state.category.selectedChariKhetra;
export const selectSelectedShaktiPitha = (state) => state.category.selectedShaktiPitha;
export const selectSelectedUpcomingEvent = (state) => state.category.selectedUpcomingEvent;
export const selectSelectedHeritageSites = (state) => state.category.selectedHeritageSites;
export const selectSelectedEast = (state) => state.category.selectedEast;
export const selectSelectedWest = (state) => state.category.selectedWest;
export const selectSelectedNorth = (state) => state.category.selectedNorth;
export const selectSelectedSouth = (state) => state.category.selectedSouth;
export const selectSelectedAdiShaktiPitha = (state) => state.category.selectedAdiShaktiPitha;
export const selectSelectedSaivaKhetra = (state) => state.category.selectedSaivaKhetra;

export default categorySlice.reducer;