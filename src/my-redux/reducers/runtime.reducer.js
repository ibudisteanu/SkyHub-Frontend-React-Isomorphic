import { SET_RUNTIME_VARIABLE } from '../../constants/index';

export default function runtime(state = {}, action) {

  switch (action.type) {
    case SET_RUNTIME_VARIABLE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }

}
