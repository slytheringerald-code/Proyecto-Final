export const errorMiddleware = (err, req, res, next) => {
    console.error('Error no manejado:', err.stack);

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
          return res.status(400).json({ error: 'La solicitud contiene un JSON malformado.' });
    }

    res.status(err.status || 500).json({
          error: err.message || 'Error interno del servidor.'
    });
};
