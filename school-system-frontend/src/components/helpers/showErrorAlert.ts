import { openErrorAlert, closeErrorAlert } from '../../redux';

export const showErrorAlert = (dispatch: any) => {
  dispatch(openErrorAlert());

  setTimeout(() => {
    dispatch(closeErrorAlert());
  }, 3000);
}