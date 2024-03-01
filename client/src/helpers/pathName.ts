export const pathName = (pathname: string) => {
  const startIndex = pathname.indexOf("room=") + 5;
  const endIndex = pathname.indexOf("&user=");

  if (startIndex !== -1 && endIndex !== -1) {
    const palavraEntreRoomEUser = pathname.substring(startIndex, endIndex);
    return palavraEntreRoomEUser;
  } else {
    console.log("Não foi possível encontrar 'room=' e/ou '&user=' na string.");
  }
};
