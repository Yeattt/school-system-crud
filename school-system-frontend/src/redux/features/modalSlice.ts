import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ManageStudentsModal } from '../../components/classes/ManageStudentsModal';


//* ACÁ ESTOY HACIENDO LA CONFIGURACIÓN PARA MI MANEJO DEL ESTADO GLOBAL DE LOS MODALS

interface ModalState {
  createModal: {
    isOpen: boolean;
  };
  createModalSecond: {
    isOpen: boolean;
  };
  updateModal: {
    isOpen: boolean;
    data: any;
  };
  manageStudentsModal: {
    isOpen: boolean;
    data: any;
  },
  viewModal: {
    isOpen: boolean;
    data: any;
  };
};

const initialState: ModalState = {
  createModal: {
    isOpen: false,
  },
  createModalSecond: {
    isOpen: false,
  },
  updateModal: {
    isOpen: false,
    data: null,
  },
  manageStudentsModal: {
    isOpen: false,
    data: null,
  },
  viewModal: {
    isOpen: false,
    data: null,
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openCreateModal: (state) => {
      state.createModal.isOpen = true;
    },
    closeCreateModal: (state) => {
      state.createModal.isOpen = false;
    },
    openCreateModalSecond: (state) => {
      state.createModalSecond.isOpen = true;
    },
    closeCreateModalSecond: (state) => {
      state.createModalSecond.isOpen = false;
    },
    openUpdateModal: (state, action: PayloadAction<any>) => {
      state.updateModal.isOpen = true;
      state.updateModal.data = action.payload;
    },
    closeUpdateModal: (state) => {
      state.updateModal.isOpen = false;
    },
    openManageStudentsModal: (state, action: PayloadAction<any>) => {
      state.manageStudentsModal.isOpen = true;
      state.manageStudentsModal.data = action.payload;
    },
    closeManageStudentsModal: (state) => {
      state.manageStudentsModal.isOpen = false;
    },
    setManageStudentsModalPayload: (state, action: PayloadAction<any>) => {
      state.manageStudentsModal.data = action.payload;
    },
    openViewModal: (state, action: PayloadAction<any>) => {
      state.viewModal.isOpen = true;
      state.viewModal.data = action.payload;
    },
    closeViewModal: (state) => {
      state.viewModal.isOpen = false;
    }
  },
});

export const {
  openCreateModal,
  closeCreateModal,
  openCreateModalSecond,
  closeCreateModalSecond,
  openUpdateModal,
  closeUpdateModal,
  openManageStudentsModal,
  closeManageStudentsModal,
  setManageStudentsModalPayload,
  openViewModal,
  closeViewModal
} = modalSlice.actions;

export default modalSlice.reducer;