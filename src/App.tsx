import { useState, useEffect } from "react";
import Darkmode from "./components/Darkmode/Darkmode";
import myImageDay from "./images/lightMode.png";
import myImageNight from "./images/darkMode.png";
import useDarkMode from "./components/hooks/useDarkMode";
import MyNavbar from "./components/Navbar/Navbar";
import Form from "./components/Form/Form";
import { CanceledError } from "./services/api-client";
import userService, { User } from "./services/user-service";
import { v4 as uuidv4 } from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const { darkMode, handleMode } = useDarkMode();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // get ->await promise -> response object / error
    const { request, cancel } = userService.getAllUsers();
    request
      .then((res) => setUsers(res.data))
      .catch((err) => {
        if (err instanceof CanceledError) {
          return;
        } else {
          setError(err.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    return () => cancel();
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));

    userService.deleteUser(user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = (data: { name: string; age: number }) => {
    const originalUsers = [...users];
    const newUser = { id: parseInt(uuidv4()), name: data.name, age: data.age };
    setUsers([newUser, ...users]);

    userService
      .createUser(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    userService.createUser(updatedUser).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  return (
    <>
      <MyNavbar>
        <Darkmode
          onClick={handleMode}
          src={darkMode ? myImageNight : myImageDay}
          alt={darkMode ? "Light Mode" : "Dark Mode"}
        />
      </MyNavbar>

      <div
        className={
          darkMode
            ? "dark-mode px-3 m-3 d-flex justify-content-between"
            : "light-mode px-3 m-3 d-flex justify-content-between"
        }
      >
        <div>
          <Form onSubmit={addUser} />
          {error && <p className="text-danger">{error}</p>}
          {isLoading && <div className="spinner-border"></div>}
        </div>

        <div className="flex-grow-1">
          <ul className="list-group">
            {users.map((user) => (
              <li
                key={user.id}
                className="list-group-item d-flex justify-content-between"
              >
                {user.name}
                <div>
                  <button
                    className="btn btn-outline-secondary mx-2 custom-button"
                    onClick={() => updateUser(user)}
                  >
                    {" "}
                    Update{" "}
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteUser(user)}
                  >
                    {" "}
                    Delete{" "}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
