//-------------------------------------------------------------------------------------------
async function obtenerCategorias() {
    try {
      const result = await pool.query("SELECT id_categoria, nombre FROM categorias");
      return result.rows;
    } catch (error) {
      throw error;
    }
  }