import request from 'supertest';
import { app } from "@/app";
import { prisma } from "@/database/prisma";
import e from 'express';
import exp from 'constants';

describe("SessionsController", () => {
    let user_id: string;

    afterAll(async () => {
        await prisma.user.delete({ where: { id: user_id } });
    })
    
    it("should authenticate and get access token", async () => {
        const user = await request(app).post("/users").send({
            name: "Auth User",
            email: "authuser@example.com",
            password: "password123",
        })
        user_id = user.body.id;


        const sessionResponse = await request(app).post("/sessions").send({
            email: "authuser@example.com",
            password: "password123",
        })


        expect(sessionResponse.status).toBe(200);
        expect(sessionResponse.body.token).toEqual(expect.any(String));
    })


})