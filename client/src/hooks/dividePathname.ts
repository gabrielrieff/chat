const useDevidePathname = (str: string) => {
  const startIndexRoom = str.indexOf("room=") + 5;
  const startIndexUser = str.indexOf("&user=") + 6;
  const startIndexId = str.indexOf("&id=") + 4;

  const room = str.substring(startIndexRoom, str.indexOf("&", startIndexRoom));
  const user = str.substring(startIndexUser, str.indexOf("&", startIndexUser));
  const userID = str.substring(startIndexId);

  return { room, user, userID };
};

export default useDevidePathname;
