"use client"

import {store, useAppDispatch} from "@/redux/store";
import {useEffect, useState} from "react";
import {setTodos, updateTodos} from "@/redux/slices/todoSlice";
import classNames from "classnames";

export default function TodoPage() {
    const dispatch = useAppDispatch();

    const [todoName, setTodoName] = useState("");
    const [todoNameError, setTodoNameError] = useState("");
    const [todoDescription, setTodoDescription] = useState("");
    const [todoDescriptionError, setTodoDescriptionError] = useState("");
    const [todoList, setTodoList] = useState<Array<Todo>>([]);

    useEffect(() => {
        setTodoList(store.getState().todo.todos);
    }, []);

    function uuidv4() {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
            (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
        );
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();

        if (todoName.length < 3) {
            setTodoNameError("Todo name must have a minimum of 3 characters.");
        } else {
            setTodoNameError("");
        }

        if (todoDescription.length < 3) {
            setTodoDescriptionError("Todo description must have a minimum of 3 characters.");
        } else {
            setTodoDescriptionError("");
        }

        if (todoDescriptionError.length === 0 && todoNameError.length === 0) {
            let newTodo: Todo = {
                id: uuidv4(),
                title: todoName,
                description: todoDescription,
                isDone: false,
                createdAt: new Date().toISOString(),
            };

            let tempTodos = todoList.map((todo: Todo) => todo);
            tempTodos.push(newTodo);

            setTodoList(tempTodos);
            dispatch(setTodos(tempTodos));

            setTodoNameError("");
        }
    };

    const setTodoDone = (id: string) => {
        const todoIndex = todoList.findIndex((todo: Todo) => todo.id === id);

        let tempTodos = structuredClone(todoList)
        tempTodos[todoIndex].isDone = true;

        setTodoList(tempTodos);
        dispatch(updateTodos(tempTodos));
    }

    const deleteTodo = (id: string) => {
        let tempTodos = structuredClone(todoList)
        tempTodos = tempTodos.filter((todo: Todo) => todo.id !== id);

        setTodoList(tempTodos);
        dispatch(updateTodos(tempTodos));
    }

    const deleteAllTodos = () => {
        setTodoList([]);
        dispatch(setTodos([]));
    }


    return <div className={"px-10 py-10"}>
        <div className="todos-header">
            <h1 className={"font-extrabold text-4xl"}>Todos</h1>
            <p className={"font-thin text-gray-300"}>Minimal Todo Application with Redux</p>
        </div>

        <div className="todos-body pt-10 grid grid-cols-4 grid-flow-col gap-4">
            <div className="todo-add col-span-1 border-r border-gray-600">
                <h1 className={"font-extrabold text-2xl"}>Add Todo</h1>

                <div className={"bg-zinc-900 rounded-lg mr-6 border border-zinc-700 mt-6"}>
                    <div className="flex flex-col p-4">
                        <p>Todo Details</p>

                        <form className={"todo-form"} onSubmit={handleSubmit}>
                            <div className="pt-2">
                                <label htmlFor="todoName"
                                       className="block text-sm font-medium leading-6 text-gray-400">Todo Name</label>
                                <div className="mt-0.5">
                                    <input
                                        type="text"
                                        name="todoName"
                                        id="todoName"
                                        value={todoName}
                                        autoComplete="todoName"
                                        className="border border-zinc-700 bg-black rounded-lg text-white placeholder:text-gray-400 w-full pl-4 py-3 focus:border-blue-700 hover:border-blue-700 focus:outline-0 transition-all focus:transition-all hover:transition-all"
                                        placeholder="Todo Name"
                                        onChange={(e) => setTodoName(e.target.value)}
                                    />
                                    {todoNameError.length > 0 && <p className={"text-red-400 text-sm pt-1 pl-0.5"}>{todoNameError}</p>}
                                </div>
                            </div>

                            <div className={"pt-2"}>
                                <label htmlFor="todoDescription"
                                       className="block text-sm font-medium leading-6 text-gray-400">Description</label>
                                <div className="mt-2">
                                    <textarea
                                        id="todoDescription"
                                        name="todoDescription"
                                        rows={3}
                                        value={todoDescription}
                                        placeholder="Description..."
                                        className="border border-zinc-700 bg-black rounded-lg text-white placeholder:text-gray-400 w-full pl-4 py-3 focus:border-blue-700 hover:border-blue-700 focus:outline-0 transition-all focus:transition-all hover:transition-all"
                                        onChange={(e) => setTodoDescription(e.target.value)}
                                    ></textarea>
                                    {todoDescriptionError.length > 0 && <p className={"text-red-400 text-sm pt-1 pl-0.5"}>{todoDescriptionError}</p>}
                                </div>
                            </div>

                            <div className="pt-2 flex justify-end">
                                <button type="submit"
                                        className="rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 focus:transition-all hover:transition-all transition-all">Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="todo-list col-span-3 pl-8  w-2/5">
                <div className="flex flex-row justify-between items-center align-items-center pb-6">
                    <h1 className={"font-extrabold text-2xl"}>Todos</h1>
                    {todoList.length > 0 && <button
                        onClick={() => deleteAllTodos()}
                        className="rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 focus:transition-all hover:transition-all transition-all">
                        Delete All
                    </button>}
                </div>
                {todoList.length === 0 ? <>
                    <p className={"text-gray-400"}>Todos not found...</p>
                </> : <>
                    {todoList.map((todo: Todo) => (
                        <div key={todo.id} className={"pb-4"}>
                            <div className={classNames(
                                'flex flex-row justify-between align-middle items-center todo-item border rounded-lg',
                                {'border-zinc-700 bg-zinc-900': !todo.isDone },
                                { 'border-green-700 bg-green-800': todo.isDone },
                            )}>
                                <div className={"todo-item-details"}>
                                    <h1 className={"px-4 pt-4 font-extrabold text-xl"}>{todo.title}</h1>
                                    <p className={"px-4 pb-2 text-gray-400"}>{todo.description}</p>
                                    <p className={"px-4 pb-4 text-gray-100"}>Created At: {todo.createdAt}</p>
                                </div>
                                <div className={"todo-item-actions pr-4 flex flex-col"}>
                                    {!todo.isDone && (<button
                                        onClick={() => setTodoDone(todo.id)}
                                        className="rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 focus:transition-all hover:transition-all transition-all">
                                        Done
                                    </button>)}
                                    <button
                                        onClick={() => deleteTodo(todo.id)}
                                        className="mt-3 rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 focus:transition-all hover:transition-all transition-all">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </>}
            </div>
        </div>
    </div>
}


