
const schemaEnv = {
    type: 'object',
    required: ['PORT', 'HOST', 'MONGO_URI', 'SECRET_JWT'],
    properties: {
        PORT: {
            type: 'number'
        },

        HOST: {
            type: 'string'
        },

        MONGO_URI: {
            type: 'string'
        },

        SECRET_JWT: {
            type: 'string'
        }
    }
};

export const optionsEnv = {
    schema: schemaEnv,
    dotenv: true
};