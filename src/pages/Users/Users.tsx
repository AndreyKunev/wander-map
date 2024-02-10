import UsersList from "../../components/UsersList/UsersList";

const Users = () => {
  // dummy data
  const USERS = [
    {
      id: "u1",
      name: "John Doe",
      image:
        "https://images.pexels.com/photos/2167039/pexels-photo-2167039.jpeg",
      placeCount: 1,
    },
  ];

  return <UsersList userArr={USERS} />;
};

export default Users;
