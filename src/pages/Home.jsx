import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import Layout from "../components/Layout";

const Home = () => {
  return (
    <Layout>
      <TodoForm />
      <TodoList />
    </Layout>
  );
};

export default Home;
