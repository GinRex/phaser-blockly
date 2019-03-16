export const TOGGLE_UI = "TOGGLE_UI";
export const BUILD_GAME = "BUILD_GAME";

const initState = {
  showUi: false,
  gameObjects: [],
  gameState: 'STOP',
};

export const toggleUi = () => ({
  type: TOGGLE_UI,
});

export const buildGame = (gameObjects) => ({
  type: BUILD_GAME,
  gameObjects
});

export const gameReducer = (
  state = initState,
  action
) => {
  console.log("Action:", action);
  switch (action.type) {
    case TOGGLE_UI:
      return { ...state, showUi: !state.showUi };
    case BUILD_GAME:
      return { ...state, gameState: 'BUILD', gameObjects: action.gameObjects};
    default:
      return state;
  }
};
