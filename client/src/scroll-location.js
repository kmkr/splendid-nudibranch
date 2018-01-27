export const setPosition = () => {
  try {
    window.sessionStorage.setItem('scrollPos', window.scrollY)
  } catch (e) {}
}

export const getPosition = () => {
  try {
    return window.sessionStorage.getItem('scrollPos')
  } catch (e) {}
}
