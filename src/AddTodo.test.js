import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const button = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "Duplicate Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(button);

  fireEvent.change(inputTask, { target: { value: "Duplicate Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(button);
  const check = screen.getAllByText(/Duplicate Test/i);

  expect(check.length).toBe(1);
 });

 test('that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const button = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: ""}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(button);

  const check = screen.getByText(/You have no todo's left/i);
  expect(check).toBeInTheDocument();
 });

 test('that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const button = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "Some Task"}});
  fireEvent.change(inputDate, { target: { value: ""}});
  fireEvent.click(button);

  const check = screen.getByText(/You have no todo's left/i);
  expect(check).toBeInTheDocument();
 });



 test('that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const button = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "Some Task"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(button);

  const check = screen.getByText(/Some Task/i);
  const checkBox = screen.getByRole('checkbox');
  fireEvent.click(checkBox);
  expect(check).not.toBeInTheDocument();
 });


 test('that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const aheadDueDate = "05/30/2024";
  fireEvent.change(inputTask, { target: { value: "Ahead Task"}});
  fireEvent.change(inputDate, { target: { value: aheadDueDate}});
  fireEvent.click(element);

  const behindDueDate = "05/30/2020"
  fireEvent.change(inputTask, { target: { value: "Behind Task"}});
  fireEvent.change(inputDate, { target: { value: behindDueDate}});
  fireEvent.click(element);

  const todo1Color = screen.getByTestId(/Ahead Task/i).style.background;
  const todo2Color = screen.getByTestId(/Behind Task/i).style.background;

  expect(todo2Color).not.toBe(todo1Color);
 });
