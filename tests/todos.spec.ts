import {test, expect} from '@playwright/test';

const todosId = 1;

test.describe('JSONPlaceholder API todos', ()=>{
     
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
});