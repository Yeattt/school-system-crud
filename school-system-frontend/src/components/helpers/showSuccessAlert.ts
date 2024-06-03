import { openSuccessAlert, closeSuccessAlert } from '../../redux';

export const showSuccessAlert = (dispatch: any) => {
  dispatch(openSuccessAlert());

  setTimeout(() => {
    dispatch(closeSuccessAlert());
  }, 3000);
}