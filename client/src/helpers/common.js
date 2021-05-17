export const initials = (user) => {
  return user?.firstname.charAt(0).toUpperCase() +
          user?.lastname.charAt(0).toUpperCase();
}

export const userName = (user) => {
  return user?.firstname + ' ' + user?.lastname;
}
