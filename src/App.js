import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './routes/Main';
import ManageUsers from './routes/ManageUsers';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="manage-users">
            <Route path=":uid" element={<ManageUsers />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
