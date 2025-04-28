
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default class ClanPraiseModel {

    static async addClanPraise(data) {
        return await prisma.post.create({
            data: {
                title: data.clanName,
                tribe: data.tribe,
                body: data.clanPraise,
                user: {connect: { id: data.UserID }},
              },
        });
    }
}
 //module.exports = ClanPraiseModel;
