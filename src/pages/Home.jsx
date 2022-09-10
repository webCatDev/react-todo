import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import Layout from "../components/UI/Layout";

import {MemoryRouter, Route, Routes} from  'react-router-dom'

const Home = () => {
  return (
    <Layout>
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Routes>
          <Route
            path="*"
            element={
              <>
                <TodoForm />
                <TodoList />
              </>
            }
          />
        </Routes>
      </MemoryRouter>
    </Layout>
  );
};

export default Home;
