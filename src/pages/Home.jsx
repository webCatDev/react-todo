import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import MainNavigation from "../components/MainNavigation";

const Home = () => {

  return (
    <>
      <TodoForm />
      <TodoList />
      <MainNavigation />
    </>
  );
};

export default Home;
