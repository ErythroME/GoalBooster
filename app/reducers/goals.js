const goal = (state, action) => {
  switch (action.type) {
    case 'ADD_GOAL':
      return {
        id: action.id,
        name: action.name,
        createAt: new Date(),
        achievedAt: null,
        achieved: false
      }
    default:
      return state
  }
}

const defaultGoals = [
  { id: 0, name: 'Learn TypeScript', createAt: new Date(), achieved: false },
  { id: 1, name: 'Read React Native docs', createAt: new Date(), achieved: false }
]

const goals = (state = defaultGoals, action) => {
  switch (action.type) {
    case 'ADD_GOAL':
      return [
        ...state,
        goal(undefined, action)
      ]
    default:
      return state
  }
}

export default goals
