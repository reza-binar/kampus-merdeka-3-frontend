import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";

// Import Todo component that we will use for testing its component
import Todo from "../todo";

// Every test, it will clean the testing data
afterEach(() => {
  cleanup();
});

test("should render non-completed todo", () => {
  // We will make mock of todo data
  const todo = { id: 1, title: "take a bath", completed: false };
  // We will render the todo by mock data
  render(<Todo todo={todo} />);
  // We will get todo with id = 1
  const todoElement = screen.getByTestId("todo-1");
  // Expect that "todo-1" is render in html
  expect(todoElement).toBeInTheDocument();
  // Expect that todo-1 is have text content "take a bath"
  expect(todoElement).toHaveTextContent("take");
  // Expect that todo-1 not contain <strike>
  expect(todoElement).not.toContainHTML("strike");
});

test("should render completed todo", () => {
  // We will make mock of todo data
  const todo = { id: 11, title: "wash car", completed: true };
  // We will render the todo by mock data
  render(<Todo todo={todo} />);
  // We will get todo with id = 11
  const todoElement = screen.getByTestId("todo-11");
  // Expect that "todo-11" is render in html
  expect(todoElement).toBeInTheDocument();
  // Expect that todo-11 is have text content "wash car"
  expect(todoElement).toHaveTextContent("wash car");
  // Expect that todo-11 contain <strike>
  expect(todoElement).toContainHTML("strike");
});

test("matches snapshot", () => {
  const todo = { id: 1, title: "wash dishes", completed: false };
  const tree = renderer.create(<Todo todo={todo} />).toJSON();
  expect(tree).toMatchSnapshot();
});
