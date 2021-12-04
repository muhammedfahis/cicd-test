const app = require("./app")
const chai = require('chai')
const request = require('supertest');



describe('Test Api End Points', () => {
    it('should login user', (done) => {
        request(app)
        .post('/user/login')
        .send({
            email: 'tutor@gmail.com',
            password: '123'
        })
        .expect(200)
        .then(res => done())
    })

    it('add list', (done) => {
        request(app)
            .post('/task/addlist')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjMiLCJpYXQiOjE2Mzg2MTgzNTJ9.-YPZrwwxHAkD7PiN_0LG4v3uwGUlgdyzNGC_ND2FUeI')

            .send({
                "name": "Task-1",
                "status": 'Pending',
            })
            .expect(201)
            .then(res => done())
    });

    it('Delete list', (done) => {
        request(app)
            .delete('/task/(id here)')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjMiLCJpYXQiOjE2Mzg2MTgzNTJ9.-YPZrwwxHAkD7PiN_0LG4v3uwGUlgdyzNGC_ND2FUeI')    
            
            .then(res => done())
    });
});