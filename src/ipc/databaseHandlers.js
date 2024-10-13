// src/ipc/databaseHandlers.js
import db from '../database/index.js';

export const databaseHandlers = {
    'db:query': async (event, sql, params) => {
        try {
            const result = await db.raw(sql, params);
            return result;
        } catch (error) {
            console.error('Database query error:', error);
            throw error;
        }
    },

    'db:insert': async (event, table, data) => {
        try {
            const result = await db(table).insert(data);
            return result;
        } catch (error) {
            console.error('Database insert error:', error);
            throw error;
        }
    },

    'db:update': async (event, table, data, where) => {
        try {
            const result = await db(table).where(where).update(data);
            return result;
        } catch (error) {
            console.error('Database update error:', error);
            throw error;
        }
    },

    'db:delete': async (event, table, where) => {
        try {
            const result = await db(table).where(where).del();
            return result;
        } catch (error) {
            console.error('Database delete error:', error);
            throw error;
        }
    },

    'db:fetch-presets': async () => {
        try {
            const presets = await db('presets').select('*');
            return presets;
        } catch (error) {
            console.error('Error fetching presets:', error);
            throw error;
        }
    },

  'db:save-presets': async (event, presets) => {
        try {
            await db.transaction(async (trx) => {
                await trx('presets').del(); // Delete all existing presets
                await trx('presets').insert(presets); // Insert new presets
            });
            return { success: true };
        } catch (error) {
            console.error('Error saving presets:', error);
            throw error;
        }
  }
};