import knex from '../data/connection';
import express from 'express';

class PointsControllers {
    async index(req: express.Request, res: express.Response) {
        const { city, uf, itens } = req.query;

        const parsedItens = String(itens)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_itens', 'points.id', '=', 'point_itens.points_id')
            .whereIn('point_itens.itens_id', parsedItens)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        return res.json( points );
    };
    async create(req: express.Request, res: express.Response) {
        const {
            name,
            email,
            whatsapp,
            latitude, 
            longitude,
            city,
            uf,
            itens
        } = req.body;
        const point = {
            image: 'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };
        const trx = await knex.transaction();
        const insertedIds = await trx('points').insert(point);
        const points_id = insertedIds[0];
        const pointItens = itens.map( (itens_id: Number) => {
            return {
                itens_id,
                points_id,
            }
        });
        
        await trx('point_itens').insert( pointItens );
        await trx.commit();

        return res.json({
            id: points_id,
           ... point
         });
    };
    async show(req: express.Request, res: express.Response) {
        const { id } = req.params;
        const point = await knex('points').where('id', id).first();
        if (!point) {
            return res.status(400).json({ error: 'Point Not Found' })
        }
        const itens = await knex('itens')
            .join('point_itens', 'itens.id', '=', 'point_itens.itens_id')
            .where('point_itens.points_id', id)
            .select('itens.title');
        return res.json({ point, itens });
    };
}

export default PointsControllers;