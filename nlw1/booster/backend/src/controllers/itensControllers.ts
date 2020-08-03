import knex from '../data/connection';
import express from 'express';

class ItensControllers {
    async index(req: express.Request, res: express.Response) {
        const itens = await knex('itens').select('*');
        const serializedItens = itens.map(item => {
            return {
                id: item.id,
                name: item.title,
                image_url: `http://localhost:3333/uploads/${item.image}`,
            }
        });
        return res.json(serializedItens);
    }
}

export default ItensControllers;