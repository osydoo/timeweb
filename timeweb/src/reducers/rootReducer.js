export const initialState = {
    letter: {
        title: '',
        body: ''
    }
};
    export default (state = initialState, action) => {
      switch (action.type) {
        case 'ADD_LETTER':
          return { ...state, letter: action.letter };
        default:
          return state;
      }
    };
    