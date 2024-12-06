/**
 * Determina el cuadrante de la matriz de Eisenhower basado en varios factores.
 * @param {string} fechaFin - Fecha de fin de la actividad (ISO 8601).
 * @param {string} importancia - Nivel de importancia ("Alta", "Media", "Baja").
 * @param {string} urgencia - Nivel de urgencia ("Alta", "Media", "Baja").
 * @param {number} dificultad - Nivel de dificultad (1-5).
 * @returns {string} Cuadrante correspondiente ("I", "II", "III", "IV").
 */
export const determinarCuadrante = (fechaFin, importancia, urgencia, dificultad) => {
    const ahora = new Date();
    const fechaLimite = new Date(fechaFin);

    // Calcular diferencia en horas entre ahora y la fecha de fin
    const diferenciaHoras = (fechaLimite - ahora) / (1000 * 60 * 60);

    // Determinar urgencia
    const esUrgente = diferenciaHoras <= 48 || urgencia === "Alta";

    // Determinar importancia
    const esImportante = importancia === "Alta";

    // Modificar lógica según dificultad
    if (dificultad >= 4) {
        // Alta dificultad: priorizar Cuadrantes I y II
        if (esImportante && esUrgente) {
            return "I"; // Importante y Urgente
        } else if (esImportante && !esUrgente) {
            return "II"; // Importante, pero No Urgente
        }
    } else if (dificultad <= 2) {
        // Baja dificultad: considerar Cuadrantes III y IV
        if (!esImportante && esUrgente) {
            return "III"; // No Importante, pero Urgente
        } else if (!esImportante && !esUrgente) {
            return "IV"; // No Importante y No Urgente
        }
    }

    // Caso por defecto si no se prioriza por dificultad
    if (esImportante && esUrgente) {
        return "I";
    } else if (esImportante && !esUrgente) {
        return "II";
    } else if (!esImportante && esUrgente) {
        return "III";
    } else {
        return "IV";
    }
};
