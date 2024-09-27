
import { createSlice } from '@reduxjs/toolkit';

const recentActivitiesSlice = createSlice({
  name: 'recentActivities',
  initialState: {
    activities: [], // Store all activities as an array of objects
  },
  reducers: {
    addActivity: (state, action) => {
      state.activities.push({
        title: action.payload.title,
        description: action.payload.description,
        date: action.payload.date,
        images: action.payload.images, // base64 encoded images
        videos: action.payload.videos, // base64 encoded videos
      });
    },
    removeActivity: (state, action) => {
      state.activities = state.activities.filter((_, index) => index !== action.payload);
    },
    updateActivity: (state, action) => {
      const { index, activity } = action.payload;
      state.activities[index] = activity;
    },
    resetActivities: (state) => {
      state.activities = []; 
    },
  },
});

export const { addActivity,removeActivity, resetActivities,updateActivity } = recentActivitiesSlice.actions;
export default recentActivitiesSlice.reducer;
