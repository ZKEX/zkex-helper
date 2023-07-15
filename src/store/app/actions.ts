import { createAction } from '@reduxjs/toolkit';
import { ModalState } from './types';

export const updateModal = createAction<{ modal: keyof ModalState; open: boolean }>(
  'app/updateModal'
)