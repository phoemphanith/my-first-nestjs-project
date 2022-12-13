import { Injectable } from "@nestjs/common";
import { Todo } from "./todo.interface";

@Injectable()

export class TodoService{
    private storage: Todo[] = [
        {
            "label": "Make nestjs project 3",
            "complete": true,
            "id": 1
        },
        {
            "label": "Make nestjs project 1",
            "complete": false,
            "id": 2
        },
        {
            "label": "Make nestjs project 2",
            "complete": false,
            "id": 3
        },
        {
            "label": "Make nestjs project 4",
            "complete": false,
            "id": 4
        }
    ];

    findAll(): Todo[]{
        return this.storage;
    }

    findOne(id: number): Todo{
        return this.storage.find((item: Todo) => item.id == id);
    }

    create(todo: Todo) {
        if (this.storage.length > 0) {
            const contextId = Math.max(...this.storage.map((t: Todo) => t.id));
            todo.id = contextId + 1;                 
        } else {
            todo.id = 1;
        }
        this.storage.push(todo);
    }

    updateItem(id: number, todo: Todo) {
        const updateTodo = this.storage.map((item: Todo) => {
            if (item.id == id) {
                return {...todo, id: id};
            } else {
                return item;
            }
        });
        this.storage = updateTodo;
    }

    remove(id: number) {
        this.storage = this.storage.filter((item: Todo) => item.id != id);
    }
}