import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { config } from '../config';

describe('Posts E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });


  it('should create a post and return it', async () => {
    const createPostDto = { content: 'New Post' };
    const mockPost = { id: 'mockId', ...createPostDto };

    jest.spyOn(app.get('PostsService'), 'create').mockResolvedValue(mockPost);

    const result = await request(app.getHttpServer())
      .post('/posts')
      .set('Authorization', `Bearer ${config.bearerToken}`)
      .send(createPostDto)
      .expect(201);

    expect(result.body).toEqual(mockPost);
  });

  it('should find all posts', async () => {
    const mockPosts = [{ id: 'mockId1', content: 'Post 1' }, { id: 'mockId2', content: 'Post 2' }];

    jest.spyOn(app.get('PostsService'), 'findAll').mockResolvedValue(mockPosts);

    const result = await request(app.getHttpServer())
      .get('/posts')
      .set('Authorization', `Bearer ${config.bearerToken}`)
      .expect(200);

    expect(result.body).toEqual(mockPosts);
  });

  it('should find one post by ID', async () => {
    const mockPost = { id: 'mockId', content: 'Single Post' };

    jest.spyOn(app.get('PostsService'), 'findOne').mockResolvedValue(mockPost);

    const result = await request(app.getHttpServer())
      .get('/posts/mockId')
      .set('Authorization', `Bearer ${config.bearerToken}`)
      .expect(200);

    expect(result.body).toEqual(mockPost);
  });

  it('should remove a post by ID', async () => {
    jest.spyOn(app.get('PostsService'), 'remove').mockResolvedValue({ deleted: true });

    const result = await request(app.getHttpServer())
      .delete('/posts/mockId')
      .set('Authorization', `Bearer ${config.bearerToken}`)
      .expect(200);

    expect(result.body).toEqual({ deleted: true });
  });

  it('should like a post', async () => {
    const mockPost = { id: 'mockId', likes: 1 };

    jest.spyOn(app.get('PostsService'), 'likePost').mockResolvedValue(mockPost);

    const result = await request(app.getHttpServer())
      .patch('/posts/mockId/like')
      .set('Authorization', `Bearer ${config.bearerToken}`)
      .expect(200);

    expect(result.body).toEqual(mockPost);
  });

  it('should unlike a post', async () => {
    const mockPost = { id: 'mockId', likes: 0 };

    jest.spyOn(app.get('PostsService'), 'unlikePost').mockResolvedValue(mockPost);

    const result = await request(app.getHttpServer())
      .patch('/posts/mockId/unlike')
      .set('Authorization', `Bearer ${config.bearerToken}`)
      .expect(200);

    expect(result.body).toEqual(mockPost);
  });

  it('should add a comment to a post', async () => {
    const commentDto = { comment: 'Nice Post!' };
    const mockPost = { id: 'mockId', comments: [{ user: 'mockUser', comment: 'Nice Post!' }] };

    jest.spyOn(app.get('PostsService'), 'addComment').mockResolvedValue(mockPost);

    const result = await request(app.getHttpServer())
      .patch('/posts/mockId/comment')
      .set('Authorization', `Bearer ${config.bearerToken}`)
      .send(commentDto)
      .expect(200);

    expect(result.body).toEqual(mockPost);
  });

  // Negative test cases

  it('should handle errors when creating a post', async () => {
    jest.spyOn(app.get('PostsService'), 'create').mockRejectedValue(new Error('Failed to create post'));

    const result = await request(app.getHttpServer())
      .post('/posts')
      .set('Authorization', `Bearer ${config.bearerToken}`)
      .send({ content: 'New Post' })
      .expect(500);

    expect(result.body.message).toEqual('Failed to create post');
  });

  it('should handle errors when finding all posts', async () => {
    jest.spyOn(app.get('PostsService'), 'findAll').mockRejectedValue(new Error('Failed to fetch posts'));

    const result = await request(app.getHttpServer())
      .get('/posts')
      .set('Authorization', `Bearer ${config.bearerToken}`)
      .expect(500);

    expect(result.body.message).toEqual('Failed to fetch posts');
  });

  it('should handle errors when finding a post by ID', async () => {
    jest.spyOn(app.get('PostsService'), 'findOne').mockRejectedValue(new Error('Post not found'));

    const result = await request(app.getHttpServer())
      .get('/posts/mockId')
      .set('Authorization', `Bearer ${config.bearerToken}`)
      .expect(500);

    expect(result.body.message).toEqual('Post not found');
  });

  it('should handle errors when removing a post', async () => {
    jest.spyOn(app.get('PostsService'), 'remove').mockRejectedValue(new Error('Failed to remove post'));

    const result = await request(app.getHttpServer())
      .delete('/posts/mockId')
      .set('Authorization', `Bearer ${config.bearerToken}`)
      .expect(500);

    expect(result.body.message).toEqual('Failed to remove post');
  });

  it('should handle errors when liking a post', async () => {
    jest.spyOn(app.get('PostsService'), 'likePost').mockRejectedValue(new Error('Failed to like post'));

    const result = await request(app.getHttpServer())
      .patch('/posts/mockId/like')
      .set('Authorization', `Bearer ${config.bearerToken}`)
      .expect(500);

    expect(result.body.message).toEqual('Failed to like post');
  });

  it('should handle errors when unliking a post', async () => {
    jest.spyOn(app.get('PostsService'), 'unlikePost').mockRejectedValue(new Error('Failed to unlike post'));

    const result = await request(app.getHttpServer())
      .patch('/posts/mockId/unlike')
      .set('Authorization', `Bearer ${config.bearerToken}`)
      .expect(500);

    expect(result.body.message).toEqual('Failed to unlike post');
  });

  it('should handle errors when adding a comment', async () => {
    jest.spyOn(app.get('PostsService'), 'addComment').mockRejectedValue(new Error('Failed to add comment'));

    const result = await request(app.getHttpServer())
      .patch('/posts/mockId/comment')
      .set('Authorization', `Bearer ${config.bearerToken}`)
      .send({ comment: 'Nice Post!' })
      .expect(500);

    expect(result.body.message).toEqual('Failed to add comment');
  });
});
