import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllUsers, getDetailsUser } from "../redux/actions/userActions";

function Home() {
  // This variable is to dispatch the actions
  const dispatch = useDispatch();

  // If you use redux, you want to read some data you have use useSelector
  const { token, users } = useSelector((state) => state.user);

  // No redux (imagine this is reducers)
  // If no redux we can just call the users
  // const [users, setUsers] = useState([]);

  useEffect(() => {
    // Dispatch the getAllUsers actions
    dispatch(getAllUsers());
    dispatch(getDetailsUser(1));
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        token: {JSON.stringify(token)}
        <hr />
        users: {JSON.stringify(users)}
      </header>
    </div>
  );
}

export default Home;
