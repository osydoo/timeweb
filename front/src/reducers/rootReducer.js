export const initialState = {
  letter: {
      title: '',
      body: '',
      img: [],
  }, 
  list: [{
    name: '',
  }],
  menual: {
    name: ''
  },
  openpage: {
    letter: true,
    list: false,
    menual: false
  }

};
    export default (state = initialState, action) => {
      switch (action.type) {
        case 'ADD_LETTER':
          return { ...state, letter: action.letter };
        case 'OPEN_PAGE':
          return { ...state, openpage: action.openpage };
        default:
          return state;
      }
    };
    