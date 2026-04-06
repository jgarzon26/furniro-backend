import { v4 as uuidv4 } from 'uuid';

export const generateOrderId = () => {
  return `ORD-${uuidv4().slice(0, 8).toUpperCase()}`;
};
