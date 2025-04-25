export const TOGGLE_FAVORITE_ROOM = `
  mutation ToggleFavorite($roomId: ID!) {
    toggleFavorite(roomId: $roomId) {
      success
      message
      isFavoriteNow
      id
    }
  }
`;