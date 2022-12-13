import { Body, Controller, Get, Logger, ParseIntPipe, Post } from "@nestjs/common";
import { Delete, Param, Put } from "@nestjs/common/decorators";
import { Todo } from "./todo.interface";
import { TodoService } from "./todo.service";

@Controller('todo')

export class TodoController{
    private readonly logger = new Logger(TodoController.name);
    constructor(private readonly todoService: TodoService) { }
    
    @Get()
    findAll(): Todo[]{
        this.logger.log('Handling findAll() request...');
        return this.todoService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Todo {
        this.logger.log('Handling findOne() request...');
        return this.todoService.findOne(+id);
    }
    
    @Post()
    create(@Body() todo: Todo) {
        this.logger.log('Handling create() request...');
        this.todoService.create(todo);
        return { success: true };
    }

    @Put(':id')
    updateItem(@Param('id') id: ParseIntPipe, @Body() todo: Todo) {
        this.logger.log('Handling updateItem() request...');
        this.todoService.updateItem(+id, todo);
        return { success: true };
    }

    @Delete(':id')
    deleteItem(@Param('id') id: ParseIntPipe) {
        this.logger.log('Handling deleteItem() request...');
        this.todoService.remove(+id);
        return { success: true };
    }
}