import { createSlice } from '@reduxjs/toolkit';

//* ACÁ ESTOY HACIENDO LA CONFIGURACIÓN PARA MI MANEJO DEL ESTADO GLOBAL DE LAS ALERTAS

interface AlertState {
  successAlert: {
    isOpen: boolean;
  },
  errorAlert: {
    isOpen: boolean;
  },
};

const initialState: AlertState = {
  successAlert: {
    isOpen: false,
  },
  errorAlert: {
    isOpen: false,
  },
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    openSuccessAlert: (state) => {
      state.successAlert.isOpen = true;
    },
    closeSuccessAlert: (state) => {
      state.successAlert.isOpen = false;
    },
    openErrorAlert: (state) => {
      state.errorAlert.isOpen = true;
    },
    closeErrorAlert: (state) => {
      state.errorAlert.isOpen = false;
    },
  }
});

export const {
  openSuccessAlert,
  closeSuccessAlert,
  openErrorAlert,
  closeErrorAlert
} = alertSlice.actions;

export default alertSlice.reducer;