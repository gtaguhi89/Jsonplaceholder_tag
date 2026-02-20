import {test, expect} from '@playwright/test';
import { request } from 'node:http';

const todosId = 1;
const newtodos ={
  userId: 1,
  title: "Taguhi",
  completed: false
}
const updatedData = {
  userId: 1,
  title: "Taguhi",
  completed: false
}
const partialUpdatedDtata = {
   title: "Hasmik"
}

test.describe('JSONPlaceholder API todos', ()=>{
    
   test('POST create a new todos', async({request})=>{
    const response = await request.post('https://jsonplaceholder.typicode.com/todos',{
      data: newtodos
    });
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(201);

      const data = await response.json();

      expect(data).toHaveProperty('id');
      expect(data).toHaveProperty('userId', newtodos.userId);
      expect(data).toHaveProperty('title', newtodos.title);
      expect(data).toHaveProperty('completed', newtodos.completed);
   });
     
    test('GET request for All todos', async({request})=>{
       const response =  await request.get('https://jsonplaceholder.typicode.com/todos');

       expect(response.ok()).toBe(true);
       expect(response.status()).toBe(200);

      const todos =  await response.json();

      expect(todos.length).toBeGreaterThan(0);
      expect(todos.length).toBe(200);

      for(let todo of todos){
        expect(todo).toHaveProperty('userId');
        expect(todo).toHaveProperty('id');
        expect(todo).toHaveProperty('title');
        expect(todo).toHaveProperty('completed');
      }

    });

    test(`GET request for ${todosId} todos`, async({request})=>{
       const response =  await request.get(`https://jsonplaceholder.typicode.com/todos/${todosId}`);

       expect(response.ok()).toBeTruthy();
       expect(response.status()).toBe(200);

       const todos = await response.json();

       expect(todos).toHaveProperty('userId');
       expect(todos).toHaveProperty('id', todosId);
       expect(todos).toHaveProperty('title');
       expect(todos).toHaveProperty('completed', false);
    });

   test(`PUT update todosID ${todosId}`, async({request})=>{
    const response = await request.put(`https://jsonplaceholder.typicode.com/todos/${todosId}`,{
      data: updatedData
    });
     
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const data = await response.json();

    expect(data).toHaveProperty('id', todosId);
    expect(data).toHaveProperty('userId', updatedData.userId);
    expect(data).toHaveProperty('title', updatedData.title);
    expect(data).toHaveProperty('completed', updatedData.completed);
   });
    test(`PATCH partial update todosID${todosId}`, async({request})=>{
      const response = await request.patch(`https://jsonplaceholder.typicode.com/todos/${todosId}`, {
        data: partialUpdatedDtata
      });
       expect(response.ok()).toBeTruthy();
       expect(response.status()).toBe(200);

       const data = await response.json();

       expect(data).toHaveProperty('id', todosId );
       expect(data).toHaveProperty('title', partialUpdatedDtata.title);
    });

    test(`DELETE todos todosID ${todosId}`, async({request})=>{
      const response = await request.delete(`https://jsonplaceholder.typicode.com/todos/${todosId}`);

      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);

      const data = await response.json();

      expect(data).toEqual({});
    });

    test('GET Negative Test', async({request})=>{
      const response = await request.get('https://jsonplaceholder.typicode.com/todos/12345');

      expect(response.ok()).toBe(false);
      expect(response.status()).toBe(404);
    });

});