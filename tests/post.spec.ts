import { test, expect } from '@playwright/test';

const postId = 1;

test.describe('JSONPlaceholder API Posts', ()=>{

  test('GET request for posts', async({request})=>{ 

    const response = await request.get('https://jsonplaceholder.typicode.com/posts');

    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(200);

    const posts = await response.json();
    
     expect(posts.length).toBeGreaterThan(0);
     expect(posts.length).toBe(100);    

    for( let post of posts){
       expect(post).toHaveProperty('userId');
       expect(post).toHaveProperty('id');
       expect(post).toHaveProperty('title');
       expect(post).toHaveProperty('body');
    
    }

  });

  test(`GET request post for id ${postId}`, async({request})=>{
    const response = await request.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);

    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(200);

    const post = await response.json();

    expect(post).toHaveProperty('userId');
    expect(post).toHaveProperty('id', postId );
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');

  });

  test(`GET request comments for postId ${postId} - with path params`, async({request})=>{
    const response =  await request.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const comments = await response.json();

    for(let comment of comments){
      expect(comment).toHaveProperty('postId',  postId);
      expect(comment).toHaveProperty('id');
      expect(comment).toHaveProperty('name');
      expect(comment).toHaveProperty('email');
      expect(comment).toHaveProperty('body');
    }

  });

  test(`GET request comments for postID ${postId} - with query params`, async({request})=>{
    const response = await request.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const comments = await response.json();

    for(let comment of comments){
      expect(comment).toHaveProperty('postId', postId);
      expect(comment).toHaveProperty('id');
      expect(comment).toHaveProperty('name');
      expect(comment).toHaveProperty('email');
      expect(comment).toHaveProperty('body');
    }

  });

});



